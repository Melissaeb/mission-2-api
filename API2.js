

function getRiskRating(input) {

    const keywords = ["collide", "crash", "scratch", "bump", "smash"];

    //immediately checks for null/invalid inputs
    if (typeof input.claim_history !== 'string' || input.claim_history.trim() === '') {
        return { error: "there is an error" };
    }

    //lowest risk rating is 1
    let riskRating = 0;

    //converts input into an array of words/strings and converts all letters to lowercase
    const claim_input = input.claim_history.toLowerCase().split(/\W+/);

    //nested for loops, first one iterates over the input array
    for(let i = 0; i < claim_input.length; i++) {

        //compares each element of the input array to each word in the keywords array and increments riskRating if found. 
        for (let j = 0; j < keywords.length; j++) {
            const word = claim_input[i];
            const keyword = keywords[j];
      
            // Check if the word starts with the keyword and is followed by an optional suffix
            if (word.startsWith(keyword) && 
               (word.length === keyword.length || 
                word.endsWith('ed') || 
                word.endsWith('ing') || 
                word.endsWith('s'))) {
              riskRating++;

              if (riskRating > 5) {

                return {risk_rating: 5};

              }

              break;
            }
        }
    }

    //minimun risk rating is 1 and max is 5
    if (riskRating == 0) {

        riskRating = 1;
    }

    return { risk_rating: riskRating}
}

module.exports = { getRiskRating };