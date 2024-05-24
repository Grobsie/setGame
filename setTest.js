function combinations(cards, k) {
    const results = [];
    
    function combine(startIndex, combination) {
        if (combination.length === k) {
            results.push([...combination]);
            return;
        }
        
        for (let i = startIndex; i < cards.length; i++) {
            combination.push(cards[i]);
            combine(i + 1, combination);
            combination.pop();
        }
    }
    
    combine(0, []);
    return results;
}

// Example usage:
const cards = [1, 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
console.log(cards[0]);
cards[0] = [1,2,3,5];
console.log(cards[0]);