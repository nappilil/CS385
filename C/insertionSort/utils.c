#include "utils.h"
#include <stdlib.h>
#include <string.h>

/* 
Lilli Nappi
I pledge my honor that I have abided by the Stevens Honors System.
*/

/*
	You are free to use any data type you like in this file.
    However, other than the five functions declared in "utils.h",
    DO NOT create any other functions.
	
*/

int cmpr_int(void* pa, void* pb) {
	int a = *((int*)pa);
    int b = *((int*)pb);
	if ((a-b) == 0) {
		return 0;
	}
	else if ((a-b) < 0) {
		return -1;
	}
	else return 1;
}

int cmpr_float(void* pa,void* pb) {
	float a = *((float*)pa);
    float b = *((float*)pb);
	if ((a-b) == 0) {
		return 0;
	}
	else if ((a-b) < 0) {
		return -1;
	}
	else return 1;
}

void print_int(void* arr) {
    int i = 0;
    int x = ((int *)arr)[i];
    printf("%d\n", x);
}

void print_float(void* arr) {
	int i = 0;
    float x = ((float *)arr)[i];
    printf("%f\n", x);
}


void* read_array(char* filename, char* format, size_t* len) {
	FILE* fp;
    size_t length = 0;
    char* line = NULL;
    ssize_t read = 0;

	fp = fopen(filename, "r");
	if (fp == NULL) {
		fprintf(stderr, "File failed to open.\n");
		exit(1);
	}

    size_t count = 0;
    while ((read = getline(&line, &length, fp)) != -1) {
        (*len)++;
    }

    rewind(fp);

    if (format == NULL ) {
        exit(1);
    }

    else if (strcmp(format, "%d") == 0 ) {
        int *arr = (int*)malloc(sizeof(int)*(*len));    
        for(int i = 0; i<(*len); i++) {
            fscanf(fp, "%d", &arr[i]);
        }
        free(line);
        fclose(fp);
        return arr;
    }

    if (strcmp(format, "%f") == 0 ) {
        float *arr = (float*)malloc(sizeof(float)*(*len));    
        for(int i = 0; i<(*len); i++) {
            fscanf(fp, "%f", &arr[i]);
        }
        free(line);
        fclose(fp);
        return arr;
    }
    free(line);
    fclose(fp);
    exit(0);

}
