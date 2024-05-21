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
const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
const setsOfThree = combinations(cards, 3);
console.log(setsOfThree);