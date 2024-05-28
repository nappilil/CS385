# Permission Finder

## Objective
The objective of this assignment is to create a program that recursively searches for files under a specific directory whose permissions match a user-specified permissions string.

## Implementation Specifics
### Step 1: Validate Input
- The program is invoked as follows: `./pfind <directory> <pstring>`.
- No need to check `argc`; assume input format is always correct.
- `directory` will always be an existing directory.
- Only need to validate `pstring`.

### Step 2: Verify and Resolve Permissions String
- Ensure the permissions string is in proper format (9 characters: `-` or `rwx`).
- Examples of valid and invalid strings provided.

### Step 3: Recursively Navigate Directory Tree
- Use `opendir()`, `readdir()`, and `closedir()` to navigate directory tree.
- Call `stat()` on each file to read permissions and filename.
- Match permissions against the target permissions.

### Step 4: Put It All Together
- Initialize program by checking validity of permissions string.
- Get target permissions from the permissions string.
- Recurse through directories, printing files where permissions match target.

## Example Executions
### Sample Run
```sh
$ ./pfind test_dir badpermis
Error: Permissions string 'badpermis' is invalid.

$ ./pfind test_dir rw-r--r--
/home/user/test_dir/subdir1/file2
/home/user/test_dir/subdir2/file2
/home/user/test_dir/subdir2/file1

$ ./pfind test_dir --x--x--x
<no output>
```