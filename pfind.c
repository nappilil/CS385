#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <string.h>
#include <dirent.h>
#include <sys/types.h>
#include <unistd.h>

/*

Lilli Nappi
I pledge my honor that I have abided by the Stevens Honors System.

*/

/* Creates a string representing permissions of a file using bitwise & */
char *target_pstring(struct stat fileinfo) {
    char *pstring = malloc(9 * sizeof(char)); // allocate space of 9

    if ((fileinfo.st_mode & S_IRUSR) != 0) { // user read
        pstring[0] = 'r';
    } else {
        pstring[0] = '-';
    }
    if ((fileinfo.st_mode & S_IWUSR) != 0) { // user write
        pstring[1] = 'w';
    } else {
        pstring[1] = '-';
    }
    if ((fileinfo.st_mode & S_IXUSR) != 0) { // user execute
        pstring[2] = 'x';
    } else {
        pstring[2] = '-';
    }
    if ((fileinfo.st_mode & S_IRGRP) != 0) { // group read
        pstring[3] = 'r';
    } else {
        pstring[3] = '-';
    }
    if ((fileinfo.st_mode & S_IWGRP) != 0) { // group write
        pstring[4] = 'w';
    } else {
        pstring[4] = '-';
    }
    if ((fileinfo.st_mode & S_IXGRP) != 0) { // group execute
        pstring[5] = 'x';
    } else {
        pstring[5] = '-';
    }
    if ((fileinfo.st_mode & S_IROTH) != 0) { // other read
        pstring[6] = 'r';
    } else {
        pstring[6] = '-';
    }
    if ((fileinfo.st_mode & S_IWOTH) != 0) { // other write
        pstring[7] = 'w';
    } else {
        pstring[7] = '-';
    }
    if ((fileinfo.st_mode & S_IXOTH) != 0) { // other execute
        pstring[8] = 'x';
    } else {
        pstring[8] = '-';
    }
    
    /* Return pstring to be compared */
    return pstring;
}

void navigate(char *directory, char* pstring, char* cwd) {
    DIR *dp; /* directory pointer */
    struct dirent *dirp; /* dirent struct */
    
    dp = opendir(directory); // open directory
    if (dp == NULL) { 
        /* print out to standard error */
        fprintf(stderr, "Error: Cannot open directory '%s'. Permission denied.\n", directory);
        exit(EXIT_FAILURE);
    }

    /* maximum path length in LINUX 4096 */
    char path[4096]; // path of directory tree
    if ((getcwd(path,4096)) == NULL) {
        perror("getcwd");
        exit(EXIT_FAILURE);
    }   
    
    /* Use readdir in a loop until it returns NULL */
    while ((dirp = readdir(dp)) != NULL) { // read directory 
        
        struct stat fileinfo; /* stat struct to check file permissions */

        /* Concatenates directory and name of file/directory in given directory */
        sprintf(path, "%s/%s", directory, dirp->d_name); // stored into path

        /* Check if you can stat file */
        if (stat(path, &fileinfo) != 0) {
            perror("stat");
            exit(EXIT_FAILURE);
        } 

        /* Check if parent directory or current working directory */
        if ((S_ISDIR(fileinfo.st_mode) == 1)) {
                if (strcmp(dirp->d_name, "..") == 0 || strcmp(dirp->d_name, ".") == 0) {
                    continue;
                }    
            navigate(path, pstring, cwd); // recursively navigate tree
        }
        /* If not a directory check file */
        if ((S_ISREG(fileinfo.st_mode) == 1)) {
            /* Check if file permissions is a match */
            char* match = target_pstrin
            g(fileinfo);
            if (strcmp(pstring, match) == 0) {
                printf("%s/%s\n", cwd, path); // concantenate current working directory with path
                free(match); // must free pointer
            }
        }
    }
    closedir(dp); // close directory
}

int main(int argc,char* argv[]) {

    /* Check if permission is correct length */
    if (strlen(argv[2]) != 9) {
        fprintf(stderr, "Error: Permissions string '%s' is invalid.\n", argv[2]);
        exit(EXIT_FAILURE);
    }
    /* Check for valid permission and print out to standard error*/
    for (int i = 0; i < 9; i+=3) {
        if (argv[2][i] != 'r' && argv[2][i] != '-') {
            fprintf(stderr, "Error: Permissions string '%s' is invalid.\n", argv[2]);
            exit(EXIT_FAILURE);
        }
        if (argv[2][i+1] != 'w' && argv[2][i+1] != '-') {
            fprintf(stderr, "Error: Permissions string '%s' is invalid.\n", argv[2]);
            exit(EXIT_FAILURE);
        }
        if (argv[2][i+2] != 'x' && argv[2][i+2] != '-') {
            fprintf(stderr, "Error: Permissions string '%s' is invalid.\n", argv[2]);
            exit(EXIT_FAILURE);
        } 
    }

    char* path; // current working directory
    if ((path=getcwd(NULL,0)) == NULL) {
        perror("getcwd");
        exit(EXIT_FAILURE);
    }      
    
    /* ./pfind <directory> <pstring> */

    /* traverse (directory, pstring, cwd)*/
    navigate(argv[1], argv[2], path);

    free(path);

    exit(EXIT_SUCCESS);

}

