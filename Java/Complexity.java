// Lilli Nappi
// I pledge my honor that I have abided by the Stevens Honors System. 


public class Complexity {
	
	public static void method0(int n) {
		int counter = 0;
		for (int i = 0; i<n; i++) {
			System.out.println("Operation "+ counter);
			counter++;
		}
	}
	
	//1. a method that has time complexity O(n^2) using two nested for loops
	public static void method1(int n) {
		int counter = 0;
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < n; j ++) {
				System.out.println("Operation " + counter);
				counter++;
			}
		}
	}
	
	//2. a method that has time complexity O(n^3) using three nested for loops
	public static void method2(int n) {
		int counter = 0;
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < n; j ++) {
				for (int k = 0; k < n; k ++) {
					System.out.println("Operation " + counter);
					counter++;
				}
			}
		}
	}
	
	//3. a method that has time complexity O(logn) using one for loop with *= 2
	public static void method3(int n) {
		int counter = 0;
		for(int i = 1; i < n; i *= 2) {
			System.out.println("Operation " + counter);
			counter++;
		}
	}
	
	//4.
	public static boolean bSearch(int[] a, int x) {
		int end = a.length - 1;
		int start = 0;
		while (start <= end) {
			int mid = (end - start) / 2 + start;
			if (a[mid] == x) return true;
			else if (a[mid] > x) end = mid - 1;
			else start = mid + 1;
		}
		return false;
	}

	/*	iteration | start | end
	 *  ----------|-------|--------
	 *  1		  |   0   |  31
	 *  2		  |   16  |  31
	 *  3		  |   24  |  31
	 *  4		  |   28  |  31
	 *  5 		  |   30  |  31
	 *  6 		  |   31  |  31
	 * 
	 * 
	 * iteration  | start | end
	 * -----------|-------|---------
	 * 1		  |   0   |  63
	 * 2          |   32  |  63
	 * 3          |   48  |  63
	 * 4          |   56  |  63
	 * 5          |   60  |  63
	 * 6          |   62  |  63
	 * 7          |   63  |  63
	 * 
	 * 
	 */
	
	// 5. the relation between the size n of a and the number of iterations
	// is log(n,2) + 1
	
	// 6. time complexity of bSearch is O(log n)
	
	// 7. a method that has time complexity O(n log n) using two for loops one with *= 2
	// and another for loop
	public void method4(int n) {
		int counter = 0;
		for (int i = 1; i < n; i *= 2) {
			for(int j = 0; j < n; j ++) {
					System.out.println("Operation " + counter);
					counter++;
			}
		}
	}
	
	// 8. a method that has time complexity O(log log n) with ^2 log
	public void method5(int n) {
		int counter = 0;
		for (int i = 2; i < n; i = (int)Math.pow(i, 2))
				{
			System.out.println("Operation " + counter);
			counter++;
		}
	}

}
