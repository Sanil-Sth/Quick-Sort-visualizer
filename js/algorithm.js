/* ── ALGORITHM MODULE ── */
// recordQuickSort() and helpers — zero DOM access, pure computation only

// Determine the display color for a bar based on step context (priority order)
const getBarColor = (index, step) => {
  if (step.sortedIndices.includes(index))                              return 'var(--bar-sorted)';
  if (step.type === 'swap'    && step.indices.includes(index))         return 'var(--bar-swapping)';
  if (step.type === 'compare' && step.indices.includes(index))         return 'var(--bar-comparing)';
  if (index === step.pivotIndex)                                       return 'var(--bar-pivot)';
  if (index >= step.activeWindow[0] && index <= step.activeWindow[1]) return 'var(--bar-active)';
  return 'var(--bar-idle)';
};

// Create a deep snapshot of the call stack frames
const snapshotCallStack = (callStack) =>
  callStack.map(frame => ({ ...frame }));

// Build a single step object capturing full algorithm state
const makeStep = (type, indices, pivotIndex, description, callStack, arr, sortedIndices, activeWindow) => ({
  type,
  indices,
  pivotIndex,
  description,
  callStack: snapshotCallStack(callStack),
  arraySnapshot: [...arr],
  sortedIndices: [...sortedIndices],
  activeWindow: [...activeWindow],
});

// Swap two elements in an array in place
const swapInArray = (arr, i, j) => {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
};

// Lomuto partition scheme — records all compare/swap/pivot steps
function partition(arr, low, high, steps, callStack, sortedIndices) {
  const pivot = arr[high];
  let i = low - 1;

  steps.push(makeStep(
    'pivot_set', [high], high,
    `Pivot selected: value ${pivot} at index ${high}`,
    callStack, arr, sortedIndices, [low, high]
  ));

  for (let j = low; j < high; j++) {
    steps.push(makeStep(
      'compare', [i + 1, j], high,
      `Compare arr[${j}]=${arr[j]} with pivot ${pivot}`,
      callStack, arr, sortedIndices, [low, high]
    ));

    if (arr[j] <= pivot) {
      i++;
      if (i !== j) {
        swapInArray(arr, i, j);
        steps.push(makeStep(
          'swap', [i, j], high,
          `Swap arr[${i}]=${arr[i]} and arr[${j}]=${arr[j]}`,
          callStack, arr, sortedIndices, [low, high]
        ));
      }
    }
  }

  swapInArray(arr, i + 1, high);
  const pivotFinal = i + 1;
  sortedIndices.push(pivotFinal);

  steps.push(makeStep(
    'swap', [pivotFinal, high], pivotFinal,
    `Place pivot ${pivot} at final position ${pivotFinal}`,
    callStack, arr, [...sortedIndices], [low, high]
  ));

  return pivotFinal;
}

// Recursive quicksort that records steps for playback
function quickSortRecursive(arr, low, high, steps, callStack, sortedIndices) {
  if (low >= high) {
    if (low === high) sortedIndices.push(low);
    return;
  }

  callStack.push({ low, high, depth: callStack.length });

  steps.push(makeStep(
    'partition_start', [low, high], -1,
    `Partition subarray [${low}..${high}]`,
    callStack, arr, sortedIndices, [low, high]
  ));

  const pivotIdx = partition(arr, low, high, steps, callStack, sortedIndices);

  callStack.pop();

  steps.push(makeStep(
    'partition_end', [pivotIdx], pivotIdx,
    `Partition complete — pivot ${arr[pivotIdx]} locked at ${pivotIdx}`,
    callStack, arr, sortedIndices, [low, high]
  ));

  quickSortRecursive(arr, low, pivotIdx - 1, steps, callStack, sortedIndices);
  quickSortRecursive(arr, pivotIdx + 1, high, steps, callStack, sortedIndices);
}

// Entry point — runs full quicksort on a copy, returns steps[] array
function recordQuickSort(inputArray) {
  const arr = [...inputArray];
  const steps = [];
  const callStack = [];
  const sortedIndices = [];

  quickSortRecursive(arr, 0, arr.length - 1, steps, callStack, sortedIndices);

  // Final step marks all remaining indices as sorted
  const allSorted = Array.from({ length: arr.length }, (_, i) => i);
  steps.push(makeStep(
    'sorted', [], -1,
    `Array fully sorted! ${arr.join(', ')}`,
    [], arr, allSorted, [0, arr.length - 1]
  ));

  return steps;
}
