CC = gcc
CFLAGS = -c -g -Wall -Werror -pedantic-errors

# Lilli Nappi
# I pledge my honor that I have abided by the Stevens Honors System

all: main.o utils.o insertion.o
	$(CC) main.o utils.o insertion.o -o a.out

main.o: main.c
	$(CC) $(CFLAGS) main.c 

utils.o: utils.c
	$(CC) $(CFLAGS) utils.c

insertion.o: insertion.c
	$(CC) $(CFLAGS) insertion.c

clean:
	rm -rf *.o a.out
