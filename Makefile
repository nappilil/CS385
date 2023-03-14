CC = gcc
CFLAGS = -c -g -Wall -Werror -pedantic-errors

all: pfind.o
	$(CC) pfind.o -o pfind

pfind.o: pfind.c
	$(CC) $(CFLAGS) pfind.c 
	
clean:
	rm -rf *.o pfind
