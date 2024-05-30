
exports.getRiskRating = (claimHistory) => {
    const keywords = ["collide", "crash", "scratch", "bump", "smash"];
    let riskRating = 0;

    if (typeof claimHistory !== 'string' || claimHistory.trim() === '') {
        throw new Error("Invalid input: claim history is required and must be a non-empty string.");
    }

    const claimInput = claimHistory.toLowerCase().split(/\W+/);

    for (let word of claimInput) {
        for (let keyword of keywords) {
            if (word.startsWith(keyword) && 
                (word.length === keyword.length || 
                 word.endsWith('ed') || 
                 word.endsWith('ing') || 
                 word.endsWith('er') ||
                 word.endsWith('s'))) {
                riskRating++;
                break;
            }
        }
    }

    //returns a max value of 5 if keywords exceed and 1 if no keywords found
    return Math.min(riskRating, 5) || 1; 
};
