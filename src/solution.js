/**
# Problem Statement
You're given a directed graph with N nodes (labeled from 0 to N - 1) and M edges. 
Each edge is represented as a triplet [from, to, weight], where:
- from and to are integers indicating the source and destination nodes, and
- weight is an integer cost, which may be negative, zero, or positive.
The graph does not contain negative weight cycles.
Write a function that computes the minimum total cost to travel from a given start node to a given end node. 
If no path exists between start and end, return null.
 */

/**
 * @param {number} N - number of nodes
 * @param {[number, number, number][]} edges - list of [from, to, weight]
 * @param {number} start - starting node
 * @param {number} end - destination node
 * @returns {number|null} - minimum cost or null if unreachable
 */
export function minCostPath(N, edges, start, end) {
  const dist = new Array(N).fill(Infinity);
  dist[start] = 0;

  // Relax edges N - 1 times
  for (let i = 0; i < N - 1; i++) {
    let changed = false;
    for (const [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        changed = true;
      }
    }
    if (!changed) break;
  }
  return dist[end] === Infinity ? null : dist[end];
}
