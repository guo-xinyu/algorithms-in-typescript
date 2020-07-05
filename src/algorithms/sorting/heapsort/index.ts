import ArrayUtils from '../../../utils/ArrayUtils';

// import TreeDo from 'model/TreeDo';

// /**
//  * @description
//  * @author 郭新雨
//  * @date 2020-01-03
//  * @param {number[]} arr
//  * @param {number} a
//  * @param {number} b
//  * @returns {number[]}
//  */
// function exchange(arr: number[], a: number, b: number): number[] {
//   if (a <= -1 || b <= -1 || a >= arr.length || b >= arr.length) {
//     return arr;
//   }
//   const temp = arr[a];
//   arr[a] = arr[b];
//   arr[b] = temp;
//   return arr;
// }

// /**
//  * @description
//  * @author 郭新雨
//  * @date 2019-12-20
//  * @param {number} i
//  * @returns {number}
//  */
// function parentNode(i: number): number {
//   return ~~(i / 2);
// }

/**
 * @description
 * @author 郭新雨
 * @date 2019-12-20
 * @param {number} i 計算第幾號元素的左孩子的下標
 * @returns {number} 左孩子的下標
 */
function leftChild(i: number): number {
  return 2 * i;
}

/**
 * @description
 * @author 郭新雨
 * @date 2019-12-20
 * @param {number} i 計算第幾號元素的右孩子的下標
 * @returns {number} 右孩子的下標
 */
function rightChild(i: number): number {
  return (2 * i) + 1;
}

/**
 * @description 維護堆的性質
 * @author 郭新雨
 * @date 2020-02-17
 * @param {number[]} arr 數組
 * @param {number} i 子樹的根節點
 * @returns {number[]} 維護了子樹最大堆性質的數組
 */
function maxHeapify(arr: number[], i: number): number[] {
  let result = arr;
  const l = leftChild(i);
  const r = rightChild(i);
  let largest: number = i;
  if (l <= result.length && result[l] > result[largest]) {
    largest = l;
  }
  if (r <= result.length && result[r] > result[largest]) {
    largest = r;
  }
  if (largest !== i) {
    result = ArrayUtils.exchange<number>(result, i, largest);
    result = maxHeapify(result, largest);
  }
  return result;
}

/**
 * @description 建堆
 * @author 郭新雨
 * @date 2020-01-04
 * @param {number[]} arr 數組
 * @returns {number[]} 建堆的數組
 */
function buildMaxHeap(arr: number[]): number[] {
  let result = arr;
  for (let i = Math.ceil(arr.length / 2); i >= 0; --i) {
    result = maxHeapify(result, i);
  }
  return result;
}

/**
 * @description 堆排序
 * @author 郭新雨
 * @date 2019-12-15
 * @export
 * @param {number[]} arr 數組
 * @returns {number[]} 排序後的數組
 */
export default function heapsort(arr: number[]): number[] {
  let result: number[] = [];
  let originArr = buildMaxHeap(arr);
  while (originArr.length) {
    originArr = maxHeapify(originArr, 1);
    const firstItem = originArr.shift();
    if (typeof firstItem === 'undefined') {
      continue;
    }
    result.push(firstItem);
  }
  return result;
}
