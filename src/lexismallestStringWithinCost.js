export function lexismallestStringWithinCost(s, costs, k) {
    /**
     * Remove characters to get lexicographically smallest string within cost budget.
     * Uses brute force approach to handle negative costs correctly.
     * 
     * @param {string} s - Input string
     * @param {number[]} costs - Cost to remove each character (can be negative)
     * @param {number} k - Maximum total cost allowed
     * @returns {string} Lexicographically smallest string within budget
     */
    const n = s.length;
    let bestResult = s;
    
    for (let mask = 0; mask < (1 << n); mask++) {
        let totalCost = 0;
        let resultString = '';
        let removed = [];
        
        for (let i = 0; i < n; i++) {
            if ((mask >> i) & 1) {
                // Bit i is set: remove character i
                totalCost += costs[i];
                removed.push(i);
            } else {
                // Bit i is not set: keep character i
                resultString += s[i];
            }
        }

        if (totalCost <= k && resultString < bestResult) {
            bestResult = resultString;
        }
    }
    return bestResult;
}