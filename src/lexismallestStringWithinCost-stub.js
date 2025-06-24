/*
We have a string of length S and an array of integers of length S, and an integer C.
The goal is to remove characters from S to make it be as soon in a dictionary as possible. The soonest possible is the empty string. Obviously, that would be the answer every time if we could just remove all the chars we want. But the catch is that every time we remove a character from the string, it "costs" the value of the integer at the corresponding index of the input array. The total cost cannot be more than the input integer C. So we have to find the alphabetically smallest string by removing characters from S, but not exceeding cost C.

Assume that the string can only contain zero or more chars in the range a-z.
*/

export function lexismallestStringWithinCost(s, costs, k) {
    let best = s;
    // paste implementation here.
    return best;
}