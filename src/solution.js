/**
 * @typedef {object} Task
 * @property {number} deadline - The day by which the task must be finished.
 * @property {number} duration - The number of days the task takes to complete.
 * @property {number} penalty - The cost incurred if the task is not completed by its deadline.
 */

/**
 * Determines the minimum total penalty incurred by optimally scheduling tasks
 * using a Dynamic Programming approach.
 *
 * @param {Task[]} tasks - An array of task objects.
 * @returns {number} The minimum total penalty.
 */
export function minTotalPenalty(tasks) {
  if (!tasks || tasks.length === 0) {
    return 0;
  }

  // 1. Sort tasks by their deadline in ascending order.
  const sortedTasks = [...tasks].sort((a, b) => a.deadline - b.deadline);

  // 2. Find the maximum possible deadline to determine the size of our DP table.
  let maxDeadline = 0;
  for (const task of sortedTasks) {
    if (task.deadline > maxDeadline) {
      maxDeadline = task.deadline;
    }
  }

  // 3. Initialize the DP table.
  // dp[t] will store the maximum penalty that can be AVOIDED by time t.
  const dp = new Array(maxDeadline + 1).fill(0);

  // 4. Iterate through each task to build up the DP table.
  for (const task of sortedTasks) {
    // 5. For each task, update the DP table for all possible completion times.
    // We iterate backwards to ensure we use the result from the *previous* state (0/1 knapsack style).
    for (let t = task.deadline; t >= task.duration; t--) {
      // At time t, we can either:
      // a) Not do the current task (value is the existing dp[t])
      // b) Do the current task. The value would be its penalty plus the max value
      //    we could get from previous tasks in the remaining time (t - task.duration).
      const valueIfIncluded = dp[t - task.duration] + task.penalty;
      dp[t] = Math.max(dp[t], valueIfIncluded);
    }
    
    // After processing a task, we need to propagate the results. If we can achieve
    // a certain value by time t-1, we can also achieve it by time t.
    // This handles cases where a time slot might be empty.
    // Note: This propagation can be done at the end for efficiency, but doing it
    // here makes the dp state consistent after each task.
    for (let t = 1; t <= maxDeadline; t++) {
        dp[t] = Math.max(dp[t], dp[t-1]);
    }
  }

  // 6. Calculate the final result.
  const totalPossiblePenalty = tasks.reduce((sum, task) => sum + task.penalty, 0);
  const maxSavedPenalty = dp[maxDeadline];

  return totalPossiblePenalty - maxSavedPenalty;
}
