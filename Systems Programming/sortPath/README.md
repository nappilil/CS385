# Assignment: Sorting with Pipes
## Objective
The objective of this assignment is to utilize the Linux utility `sort` to sort the output of a program called "Permission Find". Instead of creating a new sorting utility, we'll leverage `sort` along with `fork()`, `exec*()`, and `pipe()` to achieve this.

## Task
- Create two child processes: one for the `pfind` executable and one for `sort`.
- Connect the standard output of `pfind` to the standard input of `sort` using one pipe.
- Connect a second pipe to the standard output of `sort`, which the parent process will read from.
- Read from the read-end of the `sort` pipe until reaching end-of-file, print out all received text, and report the number of lines returned.

## Sample Run
```sh
$ ./spfind
Usage: ./spfind <directory> <permissions string>

$ ./spfind ~ rwxr-xr-q
Error: Permissions string 'rwxr-xr-q' is invalid.

$ ./spfind ~ rwxr-xr-x
Error: Cannot open directory '/home/user/danger_dir'. Permission denied.
/home/user/canned_dir
/home/user/canned_dir/level1dir1
/home/user/canned_dir/level1dir1/somedirectory
/home/user/canned_dir/level1dir1/someotherdirectory
/home/user/canned_dir/level1dir2
/home/user/canned_dir/level1dir2/alice
/home/user/canned_dir/level1dir2/charles
/home/user/Documents
/home/user/Downloads
/home/user/Music
/home/user/Pictures
/home/user/Public
/home/user/Templates
/home/user/test.sh
/home/user/Videos
Total matches: 15
```