/*******************************************************************************
 * Name        : inversioncounter.cpp
 * Author      : Lilli Nappi
 * Version     : 1.0
 * Date        : 10/28/22
 * Description : Counts the number of inversions in an array.
 ******************************************************************************/
#include <iostream>
#include <algorithm>
#include <sstream>
#include <vector>
#include <cstdio>
#include <cctype>
#include <cstring>
using namespace std;
// Function prototype.
static long mergesort(int array[], int scratch[], int low, int high);
/**
 * Counts the number of inversions in an array in Theta(n^2) time.
 */
long count_inversions_slow(int array[], int length) {
    long inversions = 0;
    for (int i = 0; i < length-1; i++) {
        for (int j = i+1; j < length; j++) {
            if (array[i] > array[j]) {
                inversions = inversions + 1;
            }
        }
    }
    return inversions;
}
/**
 * Counts the number of inversions in an array in Theta(n lg n) time.
 */
long count_inversions_fast(int array[], int length) {
    // TODO
    // Hint: Use mergesort!
    int *scratch = new int[length];
    long inversions = mergesort(array, scratch, 0, length-1);
    delete [] scratch;
    return inversions;
}

long mergesort(int array[], int scratch[], int low, int mid, int high) {
	// initialize inversion counter
    long inversions = 0;

	int i = low;
    // i is index of scratch
	int i1 = low;
    // i1 is index of array[low..mid]
    int i2 = mid+1;
    // i2 is index of array[mid+1...high]
    
	while ((i1 <= mid) && (i2 <= high)) {
        // compare i1 and i2
		if (array[i1] <= array[i2]) {
            // if i1(left) < i2(right) put array[i1] into scratch[i] and increment i1 and i
			scratch[i] = array[i1];
            i++;
            i1++;
		} else {
            // put array[i2] into scratch[i] and increment i2 and i
			scratch[i] = array[i2];
			inversions = inversions + ((mid+1) - i1);
            // count inversion
            i++;
            i2++;
		}
	}
    // move any remaining elements in array[low...mid] 
	while (i1 <= mid){
		scratch[i] = array[i1];
        i++;
        i1++;
	}
    // move any remaining elements in array[mid+1...high] 
	while (i2 <= high){
		scratch[i] = array[i2];
        i++;
        i2++;
	}
    // merge arrays
	for (i = low; i <= high; i++){
		array[i] = scratch[i];
	}
	return inversions;
}
    

static long mergesort(int array[], int scratch[], int low, int high) {
    long inversions = 0;
    if (low < high) {
        int mid = (high + low) / 2;
        // divide the array into equal sizes
        inversions = mergesort(array, scratch, low, mid); // mergesort array[low...mid]
        inversions = inversions + mergesort(array, scratch, mid+1, high); // mergesort array[mid+1...high] 
        inversions = inversions + mergesort(array, scratch, low, mid, high);  // merge arrays
     }
     return inversions;
}

int main(int argc, char *argv[]) {
    // TODO: parse command-line argument
    if (argc > 2) {
        cerr << "Usage: ./inversioncounter [slow]" << endl;
        return 1;
    }
    
    if ((argv[1] != NULL) && (strcmp(argv[1], "slow") != 0)) {
        cerr << "Error: Unrecognized option '" << argv[1] << "'." << endl;
        return 1;
    }

    cout << "Enter sequence of integers, each followed by a space: " << flush;
    istringstream iss;
    int value, index = 0;
    vector<int> values;
    string str;
    str.reserve(11);
    char c;
    while (true) {
        c = getchar();
        const bool eoln = c == '\r' || c == '\n';
        if (isspace(c) || eoln) {
            if (str.length() > 0) {
                iss.str(str);
                if (iss >> value) {
                    values.push_back(value);
                } else {
                    cerr << "Error: Non-integer value '" << str
                         << "' received at index " << index << "." << endl;
                    return 1;
                }
                iss.clear();
                ++index;
            }
            if (eoln) {
                break;
            }
            str.clear();
        } else {
            str += c;
        }
    }
    // TODO: produce output
    if (values.empty()) {
        cerr << "Error: Sequence of integers not received." << endl;
        return 1;
    }
    if (argc == 2) {
        cout << "Number of inversions: " << count_inversions_slow(&values[0], values.size()) << endl;
        return 0;
    } else {
        cout << "Number of inversions: " << count_inversions_fast(&values[0], values.size()) << endl;
        return 0;
    }
    return 0;
}
