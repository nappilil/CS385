# Custom MiniShell

This is a basic shell program in C with a few built-in commands and no memory leaks.

## Overview

The main loop of this program will print the current working directory in blue, then wait for user input. When the user input has been entered, the program should act accordingly. The program will be called from the command line and will take no arguments.

## Commands

- `cd`: implemented change directory command.
- `exit`: implemented exit command.
- `ls`: implemented list command, displays files and directories in green.
- `find`: implemented find command.
        - find <directory> <filename>
        - lists path of file found in specified directory, 
        - if no path is printed then file does not exist and was not found. 
- All other commands are executed using the `exec()` function.

## Error Handling

Errors for system and function calls are handled by printing error messages to `stderr`.

## Signals

The program captures the `SIGINT` signal and returns the user to the prompt.

## Usage

To compile and run the MiniShell, use the following command:

```bash
make
./mini_shell
```

## Outputs
The Output of the first file should look like this:
```bash
[/home/shudonghao/hw5/sol]> cd
[/home/shudonghao]> cd /tmp
[/tmp]> cd ..
[/]> cd ~
[/home/shudonghao]> cd hello
Error: Cannot change directory to 'hello'. No such file or directory.
[/home/shudonghao]> cd /bin/doesntexist
Error: Cannot change directory to '/bin/doesntexist'. No such file or directory.
[/home/shudonghao]> cd ../nonuser
Error: Cannot change directory to '../nonuser'. No such file or directory.
[/home/shudonghao]> cd too many args
Error: Too many arguments to cd.
[/home/shudonghao]> pwd
/home/shudonghao
[/home/shudonghao]> cd /
[/]> ls
bin
boot
cdrom
dev
etc
home
lib
lost+found
media
mnt
opt
proc
root
run
sbin
snap
srv
swap.img
sys
tmp
usr
var
[/]> cd
[/home/shudonghao]> touch newfile
[/home/shudonghao]> ls -l newfile
-rw-rw-r-- 1 shudonghao shudonghao 0 Mar 28 19:40 newfile
[/home/shudonghao]> rm newfile
[/home/shudonghao]> ls -l newfile
ls: cannot access 'newfile': No such file or directory
[/home/shudonghao]> echo Hello
Hello
[/home/shudonghao]> echo what up
what up
[/home/shudonghao]> heyzombie
Error: exec() failed. No such file or directory.
[/home/shudonghao]> gonna collect zombies
Error: exec() failed. No such file or directory.
[/home/shudonghao]> quit
Error: exec() failed. No such file or directory.
[/home/shudonghao]> exitt
Error: exec() failed. No such file or directory.
[/home/shudonghao]> exit
```


