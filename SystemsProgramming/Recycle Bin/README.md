Simple Bash Script for Recycle Bin Functionality

## Overview

This Bash script, named `junk.sh`, provides basic functionality for a recycle bin on a Linux system. It acts as a substitute for the `rm` command, allowing users to move files into a recycle bin directory (`~/.junk`), list the files in the recycle bin, and purge the recycle bin by permanently deleting its contents.

## Usage
When the script is executed, it first parses the command line arguments. The usage message
is shown below.
```linux
$ ./junk.sh
Usage: junk.sh [-hlp] [list of files]
 -h: Display help.
 -l: List junked files.
 -p: Purge all files.
 [list of files] with no other arguments to junk those files.
```


## Sample Run Time Scenario
```linux
 $ pwd
 /home/user/test
 $ touch junk0.txt
 $ mkdir -p dir1
 $ mkdir -p dir2/dir3
 $ mkdir .hideme
 $ touch dir1/junk1.txt
 $ touch dir2/junk2.txt
 $ touch dir2/dir3/junk3.txt
 $ tree
 .
 ├── dir1
 │ └── junk1.txt
 ├── dir2
 │ ├── dir3
 │ │ └── junk3.txt
 │ └── junk2.txt
 ├── junk0.txt
 └── junk.sh

 3 directories, 5 files

 $ ./junk.sh junk0.txt

 $ ./junk.sh -l
 total 0
 -rw-rw-r-- 1 user user 0 Feb 3 17:50 junk0.txt

 $ ./junk.sh dir1/junk1.txt

 $ ./junk.sh -l
 total 0
 -rw-rw-r-- 1 user user 0 Feb 3 17:50 junk0.txt
 -rw-rw-r-- 1 user user 0 Feb 3 17:50 junk1.txt

 $ ./junk.sh dir2/dir3/junk3.txt

 $ ./junk.sh .hideme

 $ ./junk.sh -l
 total 4
 drwxrwxr-x 2 user user 4096 Feb 3 17:50 .hideme/
 -rw-rw-r-- 1 user user 0 Feb 3 17:50 junk0.txt
 -rw-rw-r-- 1 user user 0 Feb 3 17:50 junk1.txt
 -rw-rw-r-- 1 user user 0 Feb 3 17:50 junk3.txt

 $ tree
 .
 ├── dir1
 ├── dir2
 │ ├── dir3
 │ └── junk2.txt
 └── junk.sh

 3 directories, 2 files

 $ tree -a ~/.junk
 /home/user/.junk
 ├── .hideme
 ├── junk0.txt
 ├── junk1.txt
 └── junk3.txt

 1 directory, 3 files


 $ ./junk.sh -p
 $ ./junk.sh -l
 total 0

 $ tree -a ~/.junk
 /home/user/.junk

 0 directories, 0 files

