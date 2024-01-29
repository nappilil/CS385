# Junk.sh - Simple Bash Script for Recycle Bin Functionality

## Overview

This Bash script, named `junk.sh`, provides basic functionality for a recycle bin on a Linux system. It acts as a substitute for the `rm` command, allowing users to move files into a recycle bin directory (`~/.junk`), list the files in the recycle bin, and purge the recycle bin by permanently deleting its contents.

## Usage
When the script is executed, it first parses the command line arguments. The usage message
is shown below to help you determine what features you need to implement.
1 $ ./junk.sh
2 Usage: junk.sh [-hlp] [list of files]
3 -h: Display help.
4 -l: List junked files.
5 -p: Purge all files.
6 [list of files] with no other arguments to junk those files.



Sample Run Time Scenario
1 $ pwd
2 /home/user/test
3 $ touch junk0.txt
4 $ mkdir -p dir1
5 $ mkdir -p dir2/dir3
6 $ mkdir .hideme
7 $ touch dir1/junk1.txt
8 $ touch dir2/junk2.txt
9 $ touch dir2/dir3/junk3.txt
10 $ tree
11 .
12 ├── dir1
13 │ └── junk1.txt
14 ├── dir2
15 │ ├── dir3
16 │ │ └── junk3.txt
17 │ └── junk2.txt
18 ├── junk0.txt
19 └── junk.sh
20
21 3 directories, 5 files
22
23 $ ./junk.sh junk0.txt
24
25 $ ./junk.sh -l
26 total 0
27 -rw-rw-r-- 1 user user 0 Feb 3 17:50 junk0.txt
28
29 $ ./junk.sh dir1/junk1.txt
30
31 $ ./junk.sh -l
32 total 0
33 -rw-rw-r-- 1 user user 0 Feb 3 17:50 junk0.txt
34 -rw-rw-r-- 1 user user 0 Feb 3 17:50 junk1.txt
35
36 $ ./junk.sh dir2/dir3/junk3.txt
37
38 $ ./junk.sh .hideme
39
40 $ ./junk.sh -l
41 total 4
42 drwxrwxr-x 2 user user 4096 Feb 3 17:50 .hideme/
43 -rw-rw-r-- 1 user user 0 Feb 3 17:50 junk0.txt
44 -rw-rw-r-- 1 user user 0 Feb 3 17:50 junk1.txt
45 -rw-rw-r-- 1 user user 0 Feb 3 17:50 junk3.txt
46
47 $ tree
48 .
49 ├── dir1
50 ├── dir2
51 │ ├── dir3
52 │ └── junk2.txt
53 └── junk.sh
54
55 3 directories, 2 files
56
57 $ tree -a ~/.junk
58 /home/user/.junk
59 ├── .hideme
60 ├── junk0.txt
61 ├── junk1.txt
62 └── junk3.txt
63
64 1 directory, 3 files
65
66
67 $ ./junk.sh -p
68 $ ./junk.sh -l
69 total 0
70
71 $ tree -a ~/.junk
72 /home/user/.junk
73
74 0 directories, 0 files

