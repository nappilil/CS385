/*
Using JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:

Get the value of the input text element.  
You will take in the text input , convert it to all lowercase and generate some text statistics based on the input.
You will calculate the following statistics based on the text:
Original Input: you will just show the input that the user entered (see below)
Total Number Letters: total number of letter characters in the text ,
Total Number of Non-Letters: total number of non-letters in the text (including spaces),
Total Number of Vowels: total number of vowels in the text (not counting y),
Total Number of Consonants: total number of consonants in the text (counting y),
Total Number of Words: total number of words in the text; a word is defined as any sequence of letters broken by any not-letter. For example, the phrase to-do is two words; a word does not start until a letter appears,
Total Number of Unique Words: total number of unique words that appear in the lowercased text,
Total Number of Long Words: number of words in the text that are 6 or more letters long; this is a total count of individual words, not unique words,
Total Number of Short Words: number of words in the text that are 3 or less letters long; this is a total count of individual words, not unique words
This lab is easy to over-complicate by attempting to be too clever. I am giving two important pieces of advice:

You will generate the following HTML every time the application processes the text and append it to the text_output div.  
You will be using a data list element (dl), inside the dl, you will have a data title (dt) that has the title of the stat and then a data description (dd) which has the value. (see expected output below)

If the user does not have a value for the input when they submit, you should not continue processing and instead should inform them of the error on the page. If the user enters bad data, you should not continue processing and instead inform them of the error on the page.

The form should reset itself every time after an input has been processed.
*/
(function () {
  const analyzerMethods = {
    original(text) {
      // show input user entered
      if (text.trim().length === 0 || text === undefined) throw `Error: Must suppy text to analyze`;
      return text;
    },
    totalLetters(text) {
      // show total number of letters in text
      if (text.trim().length === 0 || text === undefined) throw `Error: Must suppy text to analyze`;
      let result = 0;
      const letters = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z', 
      'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z',
      'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
      for (let i = 0; i <= text.length-1; i++) {
        if (letters.includes(text[i])) {
          result++;
        }
      }
      return result;
    },
    totalNonLetters(text) {
      // show total number of non-letters in text (including spaces)
      if (text.trim().length === 0 || text === undefined) throw `Error: Must suppy text to analyze`;
      let result = 0;
      const letters = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z', 
      'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z',
      'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
      for (let i = 0; i <= text.length-1; i++) {
        if (!letters.includes(text[i])) {
          result++;
        }
      }
      return result;
    },
    totalVowels(text) {
      // show total number of vowels in text (not including y)
      if (text.trim().length === 0 || text === undefined) throw `Error: Must suppy text to analyze`;
      let result = 0;
      const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
      for (let i = 0; i <= text.length-1; i++) {
        if (vowels.includes(text[i])) {
          result++;
        }
      }
      return result;
    },
    totalConsonants(text) {
      // show total number of consonants in text (counting y)
      if (text.trim().length === 0 || text === undefined) throw `Error: Must suppy text to analyze`;
      let result = 0;
      const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z', 
      'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z',];
      for (let i = 0; i <= text.length-1; i++) {
        if (consonants.includes(text[i])) {
          result++;
        }
      }
      return result;
    },
    totalWords(text) {
      // total number of words in the text(defined as any sequence of letters broken by any not-letter)
      if (text.trim().length === 0 || text === undefined) throw `Error: Must suppy text to analyze`;
      let result = 0;
      text.split(/[^A-Za-z]/).forEach((word) => {
        // check it is lowercase
        if (word.length !== 0) {
          result++;
        }
      });
      return result; //return result
    },
    totalUniqueWords(text) {
      // total number of unique words that appear in lowercase text
      if (text.trim().length === 0 || text === undefined) throw `Error: Must suppy text to analyze`;
      // took this from my lab 1
      let result = 0;
      let noDuplicates = []; // initialize new array
      // https://stackoverflow.com/questions/9842506/split-string-by-non-alphabetic-characters
      text.split(/[^A-Za-z]/).forEach((word) => {
        // check it is lowercase
        if (!noDuplicates.includes(word) && word.length !== 0) { // if not already in new array then add it
          noDuplicates.push(word);
          result++;
        }
      });
      return result; //return result
    },
    totalLongWords(text) {
      // number of words that are 6 letters or more
      if (text.trim().length === 0 || text === undefined) throw `Error: Must suppy text to analyze`;
      result = 0;
      text.split(/[^A-Za-z]/).forEach((word) => {
        // check it is a word
        if (word.length >= 6) {
          result++;
        }
      });
      return result;
    },
    totalShortWords(text) {
      // number of words that are 3 letters or less
      if (text.trim().length === 0 || text === undefined) throw `Error: Must suppy text to analyze`;
      result = 0;
      text.split(/[^A-Za-z]/).forEach((word) => {
        // check it is a word
        if (word.length <= 3 && word.length !== 0) {
          result++;
        }
      });
      return result;
    }
  };
  const myForm = document.getElementById('myForm');
  const resultTextElement = document.getElementById('text_output');      
  const errorTextElement = document.getElementById('error_output');

  if (myForm) {
    myForm.addEventListener('submit', event => {
      event.preventDefault();
      let text = document.getElementById("text_to_analyze").value;
      
      try {
        const result1 = analyzerMethods.original(text);
        
        text = text.toLowerCase() // convert to lowercase

        const result2 = analyzerMethods.totalLetters(text);
        const result3 = analyzerMethods.totalNonLetters(text);
        const result4 = analyzerMethods.totalVowels(text);
        const result5 = analyzerMethods.totalConsonants(text);
        const result6 = analyzerMethods.totalWords(text);
        const result7 = analyzerMethods.totalUniqueWords(text);
        const result8 = analyzerMethods.totalLongWords(text);
        const result9 = analyzerMethods.totalShortWords(text);

        const dlElement = document.createElement('dl');

        const dtElement1 = document.createElement('dt');
        dtElement1.textContent = "Original Input:";
        dlElement.appendChild(dtElement1);
        const ddElement1 = document.createElement('dd');
        ddElement1.textContent = result1;
        dlElement.appendChild(ddElement1);

        const dtElement2 = document.createElement('dt');
        dtElement2.textContent = "Total Number of Letters";
        const ddElement2 = document.createElement('dd');
        dlElement.appendChild(dtElement2);
        ddElement2.textContent = result2;
        dlElement.appendChild(ddElement2);

        const dtElement3 = document.createElement('dt');
        dtElement3.textContent = "Total Number of Non-Letters";
        const ddElement3 = document.createElement('dd');
        dlElement.appendChild(dtElement3);
        ddElement3.textContent = result3;
        dlElement.appendChild(ddElement3);

        const dtElement4 = document.createElement('dt');
        dtElement4.textContent = "Total Number of Vowels";
        const ddElement4 = document.createElement('dd');
        dlElement.appendChild(dtElement4);
        ddElement4.textContent = result4;
        dlElement.appendChild(ddElement4);

        const dtElement5 = document.createElement('dt');
        dtElement5.textContent = "Total Number of Consonants";
        const ddElement5 = document.createElement('dd');
        dlElement.appendChild(dtElement5);
        ddElement5.textContent = result5;
        dlElement.appendChild(ddElement5);

        const dtElement6 = document.createElement('dt');
        dtElement6.textContent = "Total Number of Words";
        const ddElement6 = document.createElement('dd');
        dlElement.appendChild(dtElement6);
        ddElement6.textContent = result6;
        dlElement.appendChild(ddElement6);

        const dtElement7 = document.createElement('dt');
        dtElement7.textContent = "Total Number of Unique Words";
        const ddElement7 = document.createElement('dd');
        dlElement.appendChild(dtElement7);
        ddElement7.textContent = result7;
        dlElement.appendChild(ddElement7);

        const dtElement8 = document.createElement('dt');
        dtElement8.textContent = "Total Number of Long Words";
        const ddElement8 = document.createElement('dd');
        dlElement.appendChild(dtElement8);
        ddElement8.textContent = result8;
        dlElement.appendChild(ddElement8);

        const dtElement9 = document.createElement('dt');
        dtElement9.textContent = "Total Number of Short Words";
        const ddElement9 = document.createElement('dd');
        dlElement.appendChild(dtElement9);
        ddElement9.textContent = result9;
        dlElement.appendChild(ddElement9);
                                      
        resultTextElement.appendChild(dlElement);
        errorTextElement.classList.add('hidden');
        resultTextElement.classList.remove('hidden');

      } catch (e) {
        errorTextElement.textContent = e;
        resultTextElement.classList.add('hidden');
        errorTextElement.classList.remove('hidden');
      }
      myForm.reset();
    });
  }
})();
