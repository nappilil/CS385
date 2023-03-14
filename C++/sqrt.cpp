/*******************************************************************************
 * Filename: sqrt.cpp
 * Author  : Lilli Nappi
 * Description: Computes Square Root of a Double using Newton's Method.
 ******************************************************************************/
#include <limits>
#include <iostream>
#include <sstream>
#include <iomanip>
using namespace std;

double sqrt(double num, double epsilon) {
	double last_guess = num;
	// last guess is number you want to compute square root of initially
	double next_guess;
	
	// Return numeric_limits<double>::quiet_NaN(), if the num < 0
	if (num < 0) {
		return numeric_limits<double>::quiet_NaN();
	}

	// Return num, if num is 0 or 1
	if (num == 0 || num == 1) {
		return num;
	}
	// Repeat next_guess = (last_guess + num/last_guess) / 2 until abs(last_guess - next_guess) <= epsilon
	while (true) {
		next_guess = (last_guess + num / last_guess) / 2;
		if ((abs(last_guess - next_guess)) <= epsilon)
			break;
			else {
				last_guess = next_guess;
				// last guess updates after every next guess
			}
	}
	return next_guess;
}

int main(int argc, char* argv[]) {
	double num, epsilon;

	istringstream iss;
	
	if (argc == 2) {
		iss.str(argv[1]);
		if(!(iss >> num)) {
			cerr << "Error: Value argument must be a double." << endl;
			return 1;
		}
		cout << fixed << setprecision(8) << sqrt(num, epsilon = 1e-7) << endl;
		return 0;
	} 
	
	iss.clear();

	if (argc == 3) {
		iss.str(argv[2]);
		if ((!(iss >> epsilon )) || epsilon <= 0) {
			cerr << "Error: Epsilon argument must be a positive double." << endl;
			return 1;
			}
	}
	
	iss.clear();

	if (argc == 3) {
		iss.str(argv[1]);
		if (!(iss >> num)) {
			cerr << "Error: Value argument must be a double." << endl;
			return 1;
			}
	}

	if (!(argc == 3)) {
		cerr << "Usage: ./sqrt <value> [epsilon]" << endl;
		return 1;
	}


	cout << fixed << setprecision(8) << sqrt(num, epsilon) << endl;

	return 0;
}
