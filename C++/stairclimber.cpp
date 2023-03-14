/*******************************************************************************
 * Name        : stairclimber.cpp
 * Author      : Lilli Nappi
 * Date        : 10/8/22
 * Description : Lists the number of ways to climb n stairs.
 ******************************************************************************/
#include <iostream>
#include <vector>
#include <algorithm>
#include <sstream>
#include <iomanip>

using namespace std;

vector< vector<int> > get_ways(int num_stairs) {
    // Return a vector of vectors of ints representing
    // the different combinations of ways to climb num_stairs
    // stairs, moving up either 1, 2, or 3 stairs at a time.

    // Initializes vector of vectors of ints called ways
    vector < vector<int> >  ways;

    // If there are no stairs; return empty vector
    if (num_stairs <= 0) {
        ways.push_back(vector<int>());
    }

    // Iterate through vector and prepend i to all solutions in result
    for (int i = 1; i < 4; i++) {
        if (num_stairs >= i) {
            vector < vector<int> > result = get_ways(num_stairs - i);
            for (unsigned int j = 0; j < result.size(); j++) {
                // Inserts i to position j in result
                result.at(j).push_back(i);
            }
            // Insert all the elements from result to ways
            ways.insert(ways.cend(), result.cbegin(), result.cend());
        }
    }
    return ways;
}

void display_ways(const vector< vector<int> > &ways) {
    // Display the ways to climb stairs by iterating over
    // the vector of vectors and printing each combination.

    for (unsigned int i = 0; i < ways.size(); i++) {
        // Make labels right-aligned to width of highest label
        if (ways.size() >= 10 && i < 9) {
            cout << " " << i + 1 << ". [";
        } else {
            cout << i + 1 << ". [";
        }
        // Add comma between num of stairs starting from end of vector
        for (int j = (ways[i].size()-1); j > 0; j--) {
            cout << ways[i][j] << ", ";
        }
        cout << ways[i][0] << "]" << endl;
    }
}



int main(int argc, char * const argv[]) {

    int num_stairs;
    
    istringstream iss;

    // Case 1: No input arguments
    if (argc == 0 || argc == 1) {
		cerr << "Usage: ./stairclimber <number of stairs>" << endl;
		return 1;
	}

    // Case 2: Too many input arguments
    if (argc > 2) {
		cerr << "Usage: ./stairclimber <number of stairs>" << endl;
		return 1;
	}

    // Case 3: Bad input (not an integer) && Case 4: Bad input (not a positive integer)
	if (argc == 2) {
		iss.str(argv[1]);
		if ((!(iss >> num_stairs )) || num_stairs <= 0) {
			cerr << "Error: Number of stairs must be a positive integer." << endl;
			return 1;
			}
	}

    iss.clear();
    
    // Case 5: Valid && Case 6: Valid (up to any number)
    if (num_stairs == 1) {
        cout << "1 way to climb 1 stair." << endl;
    } else {
        cout << get_ways(num_stairs).size() << " ways to climb " << num_stairs << " stairs." << endl;
    }
    
    display_ways(get_ways(num_stairs));
    return 0;

}
