# Custom MiniShell

This is a basic shell program in C with a few built-in commands and no memory leaks.

## Overview

The main loop of this program will print the current working directory in blue, then wait for user input. When the user input has been entered, the program should act accordingly. The program will be called from the command line and will take no arguments.

## Commands

- `cd`: Manually implemented change directory command.
- `exit`: Manually implemented exit command.
- All other commands are executed using the `exec()` function.

## Error Handling

Errors for system and function calls are handled by printing error messages to `stderr`.

## Signals

The program captures the `SIGINT` signal and returns the user to the prompt.

## Usage

To compile and run the MiniShell, use the following commands:

```bash
gcc mini_shell.c -o mini_shell
./mini_shell

