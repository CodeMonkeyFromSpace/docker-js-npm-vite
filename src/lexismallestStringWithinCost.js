export function lexismallestStringWithinCost(s, costs, k) {
    const n = s.length;
    let bestResult = s;
    
    for (let mask = 0; mask < (1 << n); mask++) {
        let totalCost = 0;
        let resultString = '';
        
        for (let i = 0; i < n; i++) {
            if ((mask >> i) & 1) {
                totalCost += costs[i];
            } else {
                resultString += s[i];
            }
        }
        
        if (totalCost <= k && resultString < bestResult) {
            bestResult = resultString;
        }
    }
    return bestResult;
}