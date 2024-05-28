#Lilli Nappi
#I pledge my honor that I have abided by the Stevens Honors System. 

CC = gcc
CFLAGS = -c -g -Wall -Werror -pedantic-errors

all: minishell.o
	$(CC) minishell.o -o minishell

minishell.o: minishell.c
	$(CC) $(CFLAGS) minishell.c 
	
clean:
	rm -rf *.o minishell
