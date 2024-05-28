import * as lab1 from './lab1.mjs';

//TODO: Write and call each function in lab1.js 5 times each, passing in different input

// make 5 calls to questionOne passing in different inputs
console.log(lab1.questionOne(-10)); // 0
console.log(lab1.questionOne(7)); // 13
console.log(lab1.questionOne(0)); // 0
console.log(lab1.questionOne(1)); // 1
console.log(lab1.questionOne(11)); // 89

// make 5 calls to questionTwo passing in different inputs
console.log(lab1.questionTwo([5,3,10])); // {5:true, 3: true, 10: false} 
console.log(lab1.questionTwo()); // {} 
console.log(lab1.questionTwo([2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83])); // all should be true
console.log(lab1.questionTwo([-10,1,4,6,8,9,10,12,14,15,16,18,20,21,22,24,25,26,27,28,30])); // all should be false
console.log(lab1.questionTwo([])); // {}

// make 5 calls to questionThree
console.log(lab1.questionThree("The quick brown fox jumps over the lazy dog.")); 
// returns and then outputs: {consonants: 24, vowels: 11, numbers: 0, spaces: 8, punctuation: 1, specialCharacters: 0}
console.log(lab1.questionThree("I hope I did this correctly!"));
// returns and then outputs: {consonants: 14, vowels: 8, numbers: 0, spaces: 5, punctuation: 1, specialCharacters: 0}
console.log(lab1.questionThree("I have $0 in my bank account right now. This is so sad!"));
// returns and then outputs: {consonants: 25, vowels: 14, numbers: 1, spaces: 12, punctuation: 2, specialCharacters: 1}
console.log(lab1.questionThree("CS 546 kinda fun, hopefully JavaScript isn't actually that bad." )); 
// returns and then outputs: {consonants: 33, vowels: 15, numbers: 3, spaces: 9, punctuation: 3, specialCharacters: 0
console.log(lab1.questionThree("")); 
// returns and then outputs: {consonants: 0, vowels: 0, numbers:0, spaces: 0, punctuation: 0, specialCharacters: 0}

// make 5 calls to questionFour
console.log(lab1.questionFour([-1, -1, -1, -1, -1, -1])); 
//returns and then outputs: [-1]
console.log(lab1.questionFour([2, '1', 1, '1', 2])); 
// returns and then outputs: [2, '1', 1] 
console.log(lab1.questionFour(['hello', 5, 'hello', 5, '5'])); 
// returns and then outputs: ['hello, 5, '5']
console.log(lab1.questionFour([])); 
//returns and then outputs: []
console.log(lab1.questionFour([10,10,10,'10',10,10,10,10,10,10])); 
//returns and then outputs: [10, '10']