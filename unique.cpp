/*******************************************************************************
 * Name        : unique.cpp
 * Author      : Lilli Nappi
 * Date        : 9/26/22
 * Description : Determining uniqueness of chars with int as bit vector.
 ******************************************************************************/
#include <iostream>
#include <cctype>
#include <cstring>

using namespace std;

bool is_all_lowercase(const string &s) {
    // returns true if all characters in string are lowercase letters in the English alphabet; false otherwise. 

    // iterates through a string
    for (unsigned int i = 0; i < s.length(); i++) {
        // islower returns non zero if letter is lowercase
        if (islower(s[i]) == 0) {
            return false;
        }
    }
    return true;
}

bool all_unique_letters(const string &s) {
    // returns true if all letters in string are unique, that is no duplicates are found; false otherwise.
    if (is_all_lowercase(s) == true) {
      unsigned int storage = 0;
      for (unsigned int i = 0; i < s.length(); i++) {
        // Sets the index for a char
        int index = s[i] - 'a';

        // Checks if bit is in storage i.e. there is a duplicate
        if ((1 & (storage >> index)) == 1) {
          return false;
        }

        // Sets bit in storage
        storage |= (1 << index);
      }

      // else no duplicates
      return true;
    }
    return false;
}

int main(int argc, char * const argv[]) {
    // reads and parses command line arguments.
    // Calls other functions to produce correct output.
    const string s; 
    
    // Case 1: No input arguments
    if (argc == 0 || argc == 1) {
		cerr << "Usage: ./unique <string>" << endl;
		return 1;
	}

    // Case 2: Too many input arguments
    if (argc > 2) {
		cerr << "Usage: ./unique <string>" << endl;
		return 1;
	}

    // Case 3: Contains Uppercase letters
    if (is_all_lowercase(argv[1]) == false) {
		cerr << "Error: String must contain only lowercase letters." << endl;
		return 1;
	}

    // Case 4: Contains numbers
    if (is_all_lowercase(argv[1]) == false) {
		cerr << "Error: String must contain only lowercase letters." << endl;
		return 1;
	}

    // Case 5: All letters are unique
    if ((all_unique_letters(argv[1]) == true) && (is_all_lowercase(argv[1]) == true)) {
		cout << "All letters are unique." << endl;
		return 0;
	}

    // Case 6: Duplicate letters
    if (all_unique_letters(argv[1]) == false) {
		cout << "Duplicate letters found." << endl;
		return 1;
	}

}
