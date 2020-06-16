/**
 * @description 將兩個有序的數組歸并成一個更大的有序數組
 * @author 郭新雨
 * @date 2020-04-26
 * @export
 * @param {number[]} aArr 有序數組A
 * @param {number[]} bArr 有序數組B
 * @returns {number[]} 有序數組
 */
export default function mergesort(aArr: number[], bArr: number[]): number[] {
  aArr.push(...bArr);
  return aArr;
}
