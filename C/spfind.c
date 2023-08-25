#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/wait.h>
#include <errno.h>

/*
Lilli Nappi
I pledge my honor that I have abided by the Stevens Honors System.  
*/

/* Connect standard output of pfind to standard input of sort */
int main(char argc, char* argv[]) {
    /* Create two pipes */
    int pfind[2], spfind[2]; 
    
    /* Error handling */
    if (pipe(pfind) == -1) {
        /* close unused fd*/
        close(pfind[0]);
        close(pfind[1]);
        close(spfind[0]);
        close(spfind[1]);
        char* error = "Error: pfind failed.\n";
        write(2, error, strlen(error));
        return EXIT_FAILURE;
    }

    if (pipe(spfind) == -1) {
        /* close unused fd*/
        close(pfind[0]);
        close(pfind[1]);
        close(spfind[0]);
        close(spfind[1]);
        char* error = "Error: pfind failed.\n";
        write(2, error, strlen(error));
        return EXIT_FAILURE;
    }

    /* Create first child process */
    pid_t pid1;
    pid1 = fork();
    /* Error Handling */
    if (pid1 == -1) {
        /* close unused fd*/
        close(pfind[0]);
        close(pfind[1]);
        close(spfind[0]);
        close(spfind[1]);
        char* error = "Error: fork() failed.\n";
        write(2, error, strlen(error));  
        return EXIT_FAILURE;
    }
    /* pfind process */
    else if (pid1 == 0) {
        close(pfind[0]); // close read end of pfind
        dup2(pfind[1], STDOUT_FILENO); // redirect stdout to write end of pfind
        close(pfind[1]); // close write end of pfind
        /* close unused fds */
        close(spfind[0]); 
        close(spfind[1]); 
        /* execute pfind using exec() */
        if ((execv("./pfind", argv)) == -1) {
            char* error = "Error: pfind failed.\n";
            write(2, error, strlen(error));
            return EXIT_FAILURE;
        }
    }
    /* Create second child process */
    pid_t pid2;
    pid2 = fork();
    /* Error Handling */
    if (pid2 == -1) {
        /* close unused fd*/
        close(pfind[0]);
        close(pfind[1]);
        close(spfind[0]);
        close(spfind[1]);
        char* error = "Error: fork() failed.\n";
        write(2, error, strlen(error)); 
        return EXIT_FAILURE; 
    }
    /* sort process */
    else if (pid2 == 0) {
        close(pfind[1]); // close write end of pfind
        dup2(pfind[0], STDIN_FILENO); // redirect stdin to read end of pfind
        close(pfind[0]); // close read end of pfind
        close(spfind[0]); // close read end of spfind
        dup2(spfind[1], STDOUT_FILENO); // redirect stdout to write end of sort
        close(spfind[1]); // close write end of spfind
        /* execute binary sort using exec() */
        if ((execlp("sort", "sort", NULL)) == -1) {
            char* error = "Error: sort failed.\n";
            write(2, error, strlen(error));
            return EXIT_FAILURE;
        }
    /* Parent process */
    } else {
    
        /* close unused fd*/
        close(pfind[0]); 
        close(pfind[1]); 
        close(spfind[1]);
        
        /* Write output of sort to stdout */
        char buff[4096];
        int matches = 0;
        ssize_t read_line;
        
        while ((read_line = read(spfind[0], buff, sizeof(buff))) > 0) {
            /* Error Handling */
            if (write(STDOUT_FILENO, buff, read_line) == -1) {
                char* error = "Error: write failed.\n";
                write(2, error, strlen(error));
                return EXIT_FAILURE;
            }
            /* Count number of matches */
            for (int i=0; i<read_line; i++) {
                if (buff[i] == '\n' || buff[i] == '\0') {
                    matches++;
                }
            }

            /* Error Handling */
            if (read_line == -1) {
                char* error = "Error: read failed.\n";
                write(2, error, strlen(error));
                return EXIT_FAILURE;
            }
        }
        
        close(spfind[0]); // close read end of spfind

        /* Check for valid permission */
        int err = 0;

        /* From HW3 pfind Error handling */
        if (strlen(argv[2]) != 9) {
            err = 1;
        }
        for (int i = 0; i < 9; i+=3) {
            if (argv[2][i] != 'r' && argv[2][i] != '-') {
                err = 1;
            }
            if (argv[2][i+1] != 'w' && argv[2][i+1] != '-') {
                err = 1;
            }
            if (argv[2][i+2] != 'x' && argv[2][i+2] != '-') {
                err = 1;
            } 
        }

        /* Print matches */
        if ((argc == 3) && (err == 0)) { 
            printf("Total matches: %d\n", matches); 
        }

        /* Error handling */
        int status1, status2; 
        waitpid(pid1, &status1, 0); 
        waitpid(pid2, &status2, 0);
        /* WIFEXITED returns true if terminated normally */
        if (WIFEXITED(status1) != 1) {
            char* error = "Error: pfind failed.\n";
            write(2, error, strlen(error));
            return EXIT_FAILURE;
        }
        if (WIFEXITED(status2) != 1) {
            char* error = "Error: sort failed.\n";
            write(2, error, strlen(error));
            return EXIT_FAILURE;
        }
    }
    /* close unused fd*/
    close(pfind[0]);
    close(pfind[1]);
    close(spfind[0]);
    close(spfind[1]);
    return EXIT_SUCCESS;
}