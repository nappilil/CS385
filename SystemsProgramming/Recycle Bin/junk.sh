#!/bin/bash

# Lilli Nappi
# I pledge my honor that I have abided by the Stevens Honors System.

# use read only to declare .junk folder directory
 readonly junkDirectory=~/.junk 
if [[ ! -d "$junkDirectory" ]]; then 
    mkdir -p $junkDirectory # if directory does not exist then one is created
fi

# initialize flags to be 0
h=0
l=0
p=0
function usage_message { #heredoc
cat << EOF
Usage: $(basename $0) [-hlp] [list of files]
   -h: Display help.
   -l: List junked files.
   -p: Purge all files.
   [list of files] with no other arguments to junk those files.
EOF
}
count=0
# getopts: look at one flag at a time 
while getopts ":hlp" option; do # variable option will be equal to a letter
    case ${option} in 
    h) 
       h=1 # change the variable value
       ;;  # each case you must break
    l) l=1;;
    p) p=1;;
    *) # if user inputs an invalid flag display error
        echo "Error: Unknown option '$OPTARG'." >&2
        usage_message
        exit 1
    esac # close case
    ((count++)) # counts number of time while loop occurs
done

flags=$(( $h + $l + $p )) # counts number of flags used
files=0
for argument in $*; do
    files=$((files+1)) # counts number of files/directories
done
files=$((files-count)) # subtracts from amount of times there is a flag

# if user inputs more than one argument/flag display error
if [[ $flags -gt 1 ]]; then
    echo "Error: Too many options enabled." >&2 # redirect standard out to standard error
    usage_message
    exit 1

elif [[ $flags -eq 1 ]] && [[ $files -gt 0 ]]; then 
    echo "Error: Too many options enabled." >&2 # redirect standard out to standard error
    usage_message
    exit 1
fi

exit=0
if [[ $h -eq 0 ]] && [[ $l -eq 0 ]] && [[ $p -eq 0 ]] && [[ $# -ne 0 ]]; then
    for file in $*; do # if file not found display error
        if [[ -f "$file" ]]; then 
            mv $file $junkDirectory;
        elif [[ -d "$file" ]]; then
            mv $file $junkDirectory;
        else
            echo "Warning: '$file' not found." >&2
            ((exit++))
        fi
    done
fi

# if warning was thrown exit 1 otherwise exit 0
if [[ $exit -ne 0 ]]; then
    exit 1
fi

# if user inputs -h or no arguments display usage message using heredoc
if [[ $h -eq 1 ]] || [[ $# -eq 0 ]]; then 
    # usage message
    usage_message

# list junked files in recycle bin
elif [[ $l -eq 1 ]]; then
    ls -lAF $junkDirectory # list files in recycling bin

# purge all files in bin
elif [[ $p -eq 1 ]]; then
    rm -rf ~/.junk/* ~/.junk/.??* # purge purge purge purge
fi

exit 0
