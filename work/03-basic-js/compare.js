"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */
  let count = 0;
  word = word.toUpperCase();
  guess = guess.toUpperCase();
  console.log("print word:"+ word)
  for (let i = 0; i < word.length; i++) {
    if (guess.includes(word[i])) {
      count++;
    }
  }
  return count; // this line is wrong
}
