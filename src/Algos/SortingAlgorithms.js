export function getSlectionSortAnimations(arr) {
  const animation = [];
  SelectionSort([...arr], animation);
  return animation;
}

export function getBubbleSortAnimations(arr) {
  const animation = [];
  BubbleSort([...arr], animation);
  return animation;
}

export function getQuickSortAnimations(arr) {
  const animation = [];
  QuickSort([...arr], 0, arr.length - 1, animation);
  return animation;
}

export function getMergeSortAnimations(arr) {
  const animation = [];
  MergeSort([...arr], 0, arr.length - 1, animation);
  // console.log("from mergeSort", arr);
  return animation;
}

function SelectionSort(arr, animation) {
  for (let i = 0; i < arr.length; i++) {
    var min = i;
    for (let j = i + 1; j < arr.length; j++) {
      animation.push([0, min, j]);
      animation.push([1, min, j]);

      if (arr[j] < arr[min]) min = j;
    }
    animation.push([-1, i, arr[min]]);
    animation.push([2, min, arr[i]]);
    swap(arr, i, min);
  }
}

function BubbleSort(arr, animation) {
  var swapped = true;
  var end = arr.length - 1;
  while (swapped) {
    swapped = false;
    for (let i = 0; i < end; i++) {
      animation.push([0, i, i + 1]);
      animation.push([1, i, i + 1]);
      if (arr[i] > arr[i + 1]) {
        animation.push([2, i, arr[i + 1]]);
        animation.push([2, i + 1, arr[i]]);
        swap(arr, i, i + 1);
        swapped = true;
      }
    }
    animation.push([-1, end, arr[end]]);
    end--;
  }
  while (end >= 0) {
    animation.push([-1, end, arr[end]]);
    end--;
  }
}

function Partition(arr, start, end, animation) {
  // console.log(animation);
  var i = start - 1;
  const pivot = arr[end];

  for (let j = start; j < end; j++) {
    animation.push([0, j, end]);
    animation.push([1, j, end]);
    if (arr[j] < pivot) {
      i++;
      animation.push([2, i, arr[j]]);
      animation.push([2, j, arr[i]]);
      swap(arr, i, j);
    }
  }
  animation.push([2, i + 1, arr[end]]);
  animation.push([2, end, arr[i + 1]]);
  swap(arr, i + 1, end);
  return i + 1;
}

function QuickSort(arr, start, end, animation) {
  if (start <= end) {
    var par = Partition(arr, start, end, animation);

    animation.push([-1, par, arr[par]]);
    QuickSort(arr, start, par - 1, animation);
    QuickSort(arr, par + 1, end, animation);
  }
}

function MergeSort(arr, low, high, animation) {
  if (low >= high) return;
  let mid = low + Math.floor((high - low) / 2);
  MergeSort(arr, low, mid, animation);
  MergeSort(arr, mid + 1, high, animation);
  Merge(arr, low, mid, high, animation);
}

function Merge(arr, low, mid, high, animation) {
  const left = [],
    right = [];
  for (let i = low; i <= mid; i++) left.push(arr[i]);
  for (let i = mid + 1; i <= high; i++) right.push(arr[i]);

  let i = 0,
    j = 0,
    k = low;
  while (i < left.length && j < right.length) {
    animation.push([0, low + i, mid + j + 1]);
    animation.push([1, low + i, mid + j + 1]);
    if (left[i] < right[j]) {
      animation.push([2, k, left[i]]);
      // animation.push([2, low + i, arr[k]]);
      arr[k] = left[i];
      i++;
    } else {
      animation.push([2, k, right[j]]);
      // animation.push([2, mid + j + 1, arr[k]]);
      arr[k] = right[j];
      j++;
    }
    k++;
  }

  while (i < left.length) {
    animation.push([0, i, i]);
    animation.push([1, i, i]);

    animation.push([2, k, left[i]]);
    arr[k++] = left[i++];
  }
  while (j < right.length) {
    animation.push([0, j, j]);
    animation.push([1, j, j]);

    animation.push([2, k, right[j]]);
    arr[k++] = right[j++];
  }
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
