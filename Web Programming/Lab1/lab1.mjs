export const questionOne = (index) => {
  // Implement question 1 here
  if (index < 1) { // if less than 1 then fibonacci is 0
    return 0;   //return result
  }
  else if (index == 1) { // if 1 then fibonacci is 1
    return 1;   //return result
  } else { // otherwise fibonacci is sum of previous two fibonacci numbers
    return questionOne(index-1) + questionOne(index-2);   //return result
  } 
};

export const questionTwo = (arr) => {
  // Implement question 2 here
  let primes = {}; // initialize primes object
  if (Array.isArray(arr) == false || arr.length == 0) { // if user inputs empty array or no array return empty object
    return primes;
  }
  for (let i = 0; i<=arr.length-1; i++) { // iterate through array
    if (arr[i] <= 1) { // anything less or equal to 1 is not prime
      primes[arr[i]] = false;
    }
    else if (arr[i] == 2 || arr[i] == 3) { // 2 and 3 are prime
      primes[arr[i]] = true;
    } else {
      let j = 2;
      while (j <= arr[i]/2) { // check if numbers have more than 2 factors
        if (arr[i] % j == 0) { // if more than 2 factors then not prime
          primes[arr[i]] = false;
          break;
        } else { // otherwise it is prime only factor is 1 and itself
          primes[arr[i]] = true;
          j++;
        }
      }
    }
  }
  return primes; //return result
};

export const questionThree = (str) => {
  // Implement question 3 here
  // make array for all consonants, vowels, spaces, 
  const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z', 
                      'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'],
        vowels = ['a', 'e', 'i', 'o', 'u', 
                  'A', 'E', 'I', 'O', 'U'],
        numbers = ['0','1','2','3','4','5','6','7','8','9'],
        spaces = [' '],
        punctuation = ['.', ',', ';', ':', '!', '?', "'", '"', '(', ')', '[', ']', '{', '}', '-', '—'],
        special = ['#,', '~', '`', '$', '%', '^', '&', '*', '_', '+', '=', '|', '<', '>', '/'];
  let numConsonants = 0,
      numVowels = 0,
      numNumbers = 0,
      numSpaces = 0,
      numPunctuation = 0, 
      numSpecial = 0;
  let obj = {"consonants" : numConsonants, 
            "vowels" : numVowels, 
            "numbers" : numNumbers, 
            "spaces" : numSpaces, 
            "punctuation" : numPunctuation, 
            "specialCharacters" : numSpecial};
  if (str == "") {
    //console.log("specialCharacters:" + numSpecial)
    return obj; // return result
  } else { // check if string is in any of the arrays and add count
    for (let i = 0; i <= str.length-1; i++) {
      if (consonants.includes(str[i])) {
        obj["consonants"] = numConsonants+=1;
      }
      if (vowels.includes(str[i])) {
        obj["vowels"] = numVowels+=1;
      } 
      if (numbers.includes(str[i])) {
        obj["numbers"] = numNumbers+=1;
      }
      if (spaces.includes(str[i])) {
        obj["spaces"] = numSpaces+=1;
      }
      if (punctuation.includes(str[i])) {
        obj["punctuation"] = numPunctuation+=1;
      }
      if (special.includes(str[i])) {
        obj["specialCharacters"] = numSpecial+=1;
      }
    }
  }
  //console.log("specialCharacters:" + numSpecial)
  return obj; //return result
};

export const questionFour = (arr) => {
  // Implement question 4 here
  let noDuplicates = []; // initialize new array
  for (let i = 0; i<=arr.length-1; i++) // iterate through array
    if (!noDuplicates.includes(arr[i])) { // if not already in new array then add it
      noDuplicates.push(arr[i]);
    }
  return noDuplicates; //return result
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
  firstName: 'Lilli',
  lastName: 'Nappi',
  studentId: '20006502'
};
