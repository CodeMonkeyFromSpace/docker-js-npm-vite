/**
 * A Min Heap implementation for storing task objects,
 * comparing them based on their penalty.
 */
class MinHeap {
  constructor() {
    // The heap is stored in an array. Index 0 is unused for easier math.
    this.heap = [null];
  }

  // Inserts a new task into the heap
  insert(task) {
    this.heap.push(task);
    if (this.heap.length > 2) {
      let idx = this.heap.length - 1;
      // Bubble up: while the new node's penalty is smaller than its parent's
      while (idx > 1 && this.heap[Math.floor(idx / 2)].penalty > this.heap[idx].penalty) {
        // Swap with parent
        [this.heap[Math.floor(idx / 2)], this.heap[idx]] = [this.heap[idx], this.heap[Math.floor(idx / 2)]];
        idx = Math.floor(idx / 2);
      }
    }
  }

  // Removes and returns the task with the minimum penalty
  extractMin() {
    if (this.heap.length <= 1) return null;

    const min = this.heap[1]; // The root is the minimum
    
    // Move the last element to the root to start the heapify process
    if (this.heap.length > 2) {
      this.heap[1] = this.heap.pop();
      let idx = 1;
      // Bubble down: swap with the smaller child until the heap property is restored
      while (this.heap[idx * 2]) { // while a left child exists
        let leftChildIdx = idx * 2;
        let rightChildIdx = idx * 2 + 1;
        let smallerChildIdx = leftChildIdx;

        // If a right child exists and its penalty is smaller, it's the one to compare
        if (this.heap[rightChildIdx] && this.heap[rightChildIdx].penalty < this.heap[leftChildIdx].penalty) {
          smallerChildIdx = rightChildIdx;
        }

        // If the current node's penalty is greater than its smaller child's, swap them
        if (this.heap[idx].penalty > this.heap[smallerChildIdx].penalty) {
          [this.heap[idx], this.heap[smallerChildIdx]] = [this.heap[smallerChildIdx], this.heap[idx]];
          idx = smallerChildIdx;
        } else {
          // The node is in the correct place
          break;
        }
      }
    } else {
      // Only one element was in the heap
      this.heap.pop();
    }
    return min;
  }
}

/**
 * @typedef {object} Task
 * @property {number} deadline - The day by which the task must be finished.
 * @property {number} duration - The number of days the task takes to complete.
 * @property {number} penalty - The cost incurred if the task is not completed by its deadline.
 */

/**
 * Determines the minimum total penalty incurred by optimally scheduling tasks.
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

  let currentTime = 0;
  // The heap stores tasks we have CHOSEN to do, ordered by their penalty (min first).
  const chosenTasksHeap = new MinHeap();
  
  // 2. Iterate through the sorted tasks
  for (const task of sortedTasks) {
    // 3. Tentatively add the current task to our schedule.
    chosenTasksHeap.insert(task);
    currentTime += task.duration;

    // 4. Check for a conflict: if the total time exceeds the current task's deadline.
    if (currentTime > task.deadline) {
      // We must reject a task. To minimize penalty, we reject the one with the
      // lowest penalty from our currently chosen set.
      const taskToReject = chosenTasksHeap.extractMin();
      
      // Update the schedule's time by removing the rejected task's duration.
      currentTime -= taskToReject.duration;
    }
  }

  // 5. Calculate the final penalty.
  // The tasks remaining in the heap are the ones we completed on time.
  // The total penalty is the sum of ALL initial penalties minus the sum of penalties
  // for the tasks we successfully completed.
  
  let totalPossiblePenalty = 0;
  for (const task of tasks) {
    totalPossiblePenalty += task.penalty;
  }

  let savedPenalty = 0;
  // The heap array is [null, task1, task2, ...], so we start loop at 1.
  for (let i = 1; i < chosenTasksHeap.heap.length; i++) {
    savedPenalty += chosenTasksHeap.heap[i].penalty;
  }

  return totalPossiblePenalty - savedPenalty;
}