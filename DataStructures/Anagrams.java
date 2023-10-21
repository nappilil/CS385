import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

// Lilli Nappi
// 5/10/22

public class Anagrams {
	final Integer[] primes = {2, 3, 5, 7, 11, 13, 17, 19, 
			23, 29, 31, 37, 41, 43, 47, 53, 59, 
			61, 67, 71, 73, 79, 83, 89, 97, 101};
	final Character[] letters = {'a','b','c','d','e','f','g',
			'h','i','j','k','l','m','n','o','p','q','r','s','t',
			'u','v','w','x','y','z'};
	Map<Character, Integer> letterTable = new HashMap<Character, Integer>();
	Map<Long, ArrayList<String>> anagramTable = new HashMap<Long, ArrayList<String>>();

	// Constructor
	public Anagrams() {
		buildLetterTable();
	}
	
	// Methods
	
	/** Builds hash table letterTable by pairing every letter in the alphabet to a prime number */
	public void buildLetterTable() {
		for(int i = 0; i < 26; i++) {
			letterTable.put(letters[i], primes[i]);
		}
	}
	
	/** Computes hash code of s and adds it to anagramsTable
	 * @param s Given word */
	public void addWord(String s) {
		// If anagramTable contains a HashTable with s
		if(anagramTable.containsKey(myHashCode(s))) {
			// If s is a duplicate, throw error
			if((anagramTable.get(myHashCode(s))).contains(s)) {
				throw new IllegalArgumentException("addWord: duplicate value");
			}
			// Adds s to HashTable otherwise
			ArrayList<String> temp = anagramTable.get(myHashCode(s));
			temp.add(s);
			anagramTable.replace(myHashCode(s), temp);
		} else {
			// Create new HashTable if s is not in anagramTable
			ArrayList<String> temp = new ArrayList<String>();
			temp.add(s);
			anagramTable.put(myHashCode(s), temp);
		}
	}
	
	/** Compute hash code of s so that all anagrams of a word receive the same hash code
	 * @param s String
	 * @return hash code */
	public long myHashCode(String s) {
		// Empty string, throw illegal argument
		if(s.equals("")) {
			throw new IllegalArgumentException("myHashCode: empty string");
		}
		// Fundamental Theorem of Arithmetic
		int i = 0;
		long code = 1;
		while (i < s.length()) {
			Character letter = s.charAt(i);
			code *= letterTable.get(letter);
			i++;
		}
		return code;
	}
	
	/** Builds the HashTable Anagrams
	 * @param s Name of text file containing words
	 * @throws IOException */
	public void processFile(String s) throws IOException {
		FileInputStream fstream = new FileInputStream(s);
		BufferedReader br = new BufferedReader(new InputStreamReader(fstream));
		String strLine;
		while ((strLine = br.readLine()) != null)   {
		  this.addWord(strLine);
		}
		br.close();
	}
	
	/** Finds entry in anagramTable that has the largest number of anagrams
	 * @return max entry */
	public ArrayList<Map.Entry<Long, ArrayList<String>>> getMaxEntries() {
		ArrayList<Map.Entry<Long,ArrayList<String>>> temp = new ArrayList<Map.Entry<Long,ArrayList<String>>>();
		//Current max size of HashTable
		int max = 0;
		for (Map.Entry<Long,ArrayList<String>> entry: anagramTable.entrySet()) {
			// Current entry is greater than current max
			if (entry.getValue().size() > max) {
				// update max
				max = entry.getValue().size();
				// cleared and entry is added
				temp.clear();
				temp.add(entry);
			// Current entry equals current max, entry is added
			} else if (entry.getValue().size() == max) {
					temp.add(entry);
				}
			}
		return temp;
	}
	
	/** Reads all the strings in a file and places them in anagramTable
	 * Iterates over the hash table printing the words with the largest number of anagrams
	 * @param args */
	public static void main(String[] args) {
		Anagrams a = new Anagrams();
		
		final long startTime = System.nanoTime();
		try {
			a.processFile("words_alpha.txt");
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		ArrayList<Map.Entry<Long, ArrayList<String>>> maxEntries = a.getMaxEntries();
		final long estimatedTime = System.nanoTime() - startTime;
		final double seconds = ((double) estimatedTime/1000000000);
		System.out.println("Time " + seconds);
		System.out.println("List of max anagrams: " + maxEntries);
	}
}
