import NumberUtils from '../../../utils/NumberUtils';
import ArrayUtils from '../../../utils/ArrayUtils';

/**
 * @description 隨機排列數組
 * @author 郭新雨
 * @date 2020-07-05
 * @export
 * @template T
 * @param {T[]} arr 待亂序的數組
 * @returns {T[]} 亂序後的數組
 */
export default function randomize<T>(arr: T[]): T[] {
  for (let index of arr.keys()) {
    const newIndex = NumberUtils.randomInteger(0, arr.length - 1);
    arr = ArrayUtils.exchange<T>(arr, index, newIndex);
  }
  return arr;
}
