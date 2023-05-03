"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */
    if(!word){
        return "";
    }
    let count = 0;
    const array1= word.toLowerCase().split('');
    const array2 = guess.toLowerCase().split('');
    for(let i = 0;i < array1.length;i++){
        for(let j = 0;j < array2.length;j++){
            if(array1[i] == array2[j]){
                count++;
                array2.splice(j,1);
            }
        }
    }
    return count;
}
