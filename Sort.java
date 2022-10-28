import java.util.HashSet;
import java.util.Set;


// Lilli Nappi
// 4/16/22

// Main Class
public class Sort {
	
	// Inner Class
	private static class Interval {
		// Data Fields
		private int lower;
		private int upper;
		
		// Constructors
		/** Initializes the Interval w/ lower and upper bounds
		 @param lower Bound
		 @param upper Bound */
		public Interval (int lower, int upper) {
			this.lower = lower;
			this.upper = upper;
		}
		
		// Methods
		/** Returns the lower bound
		 @return lower */
		public int getLower () {
			return lower;
		}
		
		/** Returns the lower bound
		 @return upper */
		public int getUpper () {
			return upper;
		}
		
		/** Checks if this interval and the given interval have the same lower & upper bounds
		 @return true if bounds are equal, otherwise false */
		public boolean equals (Object o) {
			if (((Sort.Interval)o).getLower() == this.getLower() && ((Sort.Interval)o).getUpper() == this.getUpper()) {
				return true;
			} else {
				return false;
			}
		}
		
		
		/** Computes Hashcode for Interval
		 @return lower * lower + upper */
		public int hashCode () {
			return lower * lower + upper;
		}
	}
	
	/** Sorts the elements in given array in increasing order and in-place
	 @param <T> the generic type
	 @param array takes in an array of T[] */
	public static <T extends Comparable<T>> void sort (T[] array) {
		Set<Interval> set = new HashSet<Interval>(); 
		set.add(new Interval(0, array.length-1));

		while (set.isEmpty()==false) {
			Interval i = set.iterator().next();
			set.remove(i);
			if (i.getUpper() - i.getLower() < 3) {
				bubble(array);
			} else {
				partition(array,set,i);
			}
		}
	}
	
	
	
	/**Creates a partition
	 @param <T>, generic type
	 @param table, given array
	 @param set, given set
	 @param i, given Interval */
	private static<T extends Comparable <T>> void partition(T[] table, Set<Interval> set, Interval i) {
		int f = i.getLower();
		int m = (i.getUpper()+1)/2;
		int l = i.getUpper();		
		
		// Finds middle value in an array
		T first = table[f];
		T mid = table[m];
		T last = table[l];
		
		if(first.compareTo(mid)>0) {
			swap(table,f,m);
		}
		if(first.compareTo(last)>0) {
			swap(table,f,l);
		}
		if(mid.compareTo(last)>0) {
			swap(table,m,l);
		}
		swap(table,f,m);
		
		// Partitioning
		T pivot = table[f];
		int up = f;
		int down = l;
			do {
				while ((up<l) && (pivot.compareTo(table[up])>=0)) {
					up++; }
				while (pivot.compareTo(table[down]) < 0) {
					down--;
					}
				if (up < down) { // if up is to the left of down
					swap(table, up, down);
					}
				} while (up < down); // Repeat while up is left of down
			set.add(new Interval(0, f-1));
			set.add(new Interval(f+1, l));
			set.remove(i);
	}
	
	/** Swaps two elements in an array
	 @param <T>, generic type
	 @param table, given array
	 @param one, index one
	 @param two, index two */
	public static <T extends Comparable <T>> void swap(T[] table, int one, int two) {
		T temp = table[one];
		table[one] = table[two];
		table[two] = temp;
	}
	
	/** Bubble Sort
	 @param <T>, generic type
	 @param table, given array */
	public static <T extends Comparable<T>> void bubble(T[] table) {
		int pass = 1;
		boolean exchanges = false;
		do {
			// Invariant: Elements after table.length-pass+1 are in place
			exchanges = false;
			// Compare each pair of adjacent elements
			for (int i = 0; i < table.length - pass; i++) {
				if (table[i].compareTo(table[i + 1]) > 0) {
					// exchange pair
					T temp = table[i];
					table[i] = table[i + 1];
					table[i + 1] = temp;
					exchanges = true;
				}
			} pass++;
		} while (exchanges);
	}

		
	public static void main(String[] args) {
        Integer[] a = {3,2,1};
        //Integer[] a = {9,2,5,6,7,4,3,8,1};
        //Integer[] a = {10,9,8,7,6,5,4,3,2,1};
        //Integer[] a = {2,5,3,0,2,3,0,3};
        //Integer[] a = {3,4,7,1,8,5,2,9,0,6};
        //Integer[] a  = {3,4,7,1,5,8,2,9,0,6};
        //Integer[] a = {5,4,7,1,8,3,2,9,0,6};
        
        System.out.println("Original: ");
        for (int i=0; i<a.length; i++) {
            System.out.print(a[i] + " ");
        }        
        sort(a);
        System.out.println("\nSorted: ");
        for (int i=0; i<a.length; i++) {
            System.out.print(a[i] + " ");
        }
    }
	
}
