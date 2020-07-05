import ArrayUtils from '../../../utils/ArrayUtils';

/**
 * @description
 * @author 郭新雨
 * @date 2020-01-07
 * @interface PartitionResult
 */
interface PartitionResult {
  partition: number;
  arrResult: number[];
}

/**
 * @description
 * @author 郭新雨
 * @date 2020-01-08
 * @param {number[]} arr
 * @param {number} start
 * @param {number} end
 * @returns {PartitionResult}
 */
function partitiion(arr: number[], start: number, end: number): PartitionResult {
  let result = arr;
  const x = arr[end];
  let i = start - 1;
  for (let j = start; j <= end - 1; ++j) {
    if (result[j] <= x) {
      result = ArrayUtils.exchange<number>(result, ++i, j);
    }
  }
  result = ArrayUtils.exchange<number>(result, ++i, end);
  return {
    partition: i,
    arrResult: arr
  };
}

/**
 * @description
 * @author 郭新雨
 * @date 2020-01-08
 * @export
 * @param {number[]} arr
 * @param {number} [start=0]
 * @param {number} [end=arr.length]
 * @returns {number[]}
 */
export default function quicksort(arr: number[], start = 0, end: number = arr.length - 1): number[] {
  let result = arr;
  if (start >= end) {
    return result;
  }
  const partitionResult = partitiion(result, start, end);
  result = quicksort(result, start, partitionResult.partition - 1);
  result = quicksort(result, partitionResult.partition, end);
  // const partitionResult = partitiion(arr);
  return result;
}
