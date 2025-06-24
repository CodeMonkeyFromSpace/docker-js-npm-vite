/*
We have a string of length S and an array of integers of length S, and an integer C.
The goal is to remove characters from S to make it be as soon in a dictionary as possible. The soonest possible is the empty string. Obviously, that would be the answer every time if we could just remove all the chars we want. But the catch is that every time we remove a character from the string, it "costs" the value of the integer at the corresponding index of the input array. The total cost cannot be more than the input integer C. So we have to find the alphabetically smallest string by removing characters from S, but not exceeding cost C.

Assume that the string can only contain zero or more chars in the range a-z.
*/
// src/lexismallestStringWithinCost-stub.js
export function lexismallestStringWithinCost(s, costs, k) {
    const n = s.length;
    let result = [];
    let remainingCost = k;
    
    for (let i = 0; i < n; i++) {
        // While we have characters in result and can afford to remove the last one
        // and the current character is smaller than the last one in result
        while (result.length > 0 && 
               remainingCost >= costs[result[result.length - 1]] &&
               s[i] < s[result[result.length - 1]]) {
            // Remove the last character and add its cost back
            const removedIndex = result.pop();
            remainingCost += costs[removedIndex];
        }
        
        // Add current character to result
        result.push(i);
    }
    
    // Now we have the best possible arrangement, but we might still be able to
    // remove some characters from the end to reduce the string further
    while (result.length > 0 && remainingCost >= costs[result[result.length - 1]]) {
        const removedIndex = result.pop();
        remainingCost += costs[removedIndex];
    }
    
    // Build the final string from the remaining indices
    return result.map(index => s[index]).join('');
}