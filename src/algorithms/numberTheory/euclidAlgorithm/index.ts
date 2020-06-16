/**
 * @description 用輾轉相除法求兩個正整數的最大公約數
 * @author 郭新雨
 * @date 2020-05-20
 * @export
 * @param {number} numA 正整數A
 * @param {number} numB 正整數B
 * @returns {number} A和B的最大公約數
 */
export default function euclidAlgorithm(numA: number, numB: number): number {
  if (numA <= 0 || !Number.isInteger(numA) || numB <= 0 || !Number.isInteger(numB)) {
    throw 'euclidAlgorithm的入參須爲正整數';
  }
  let result = Math.min(numA, numB);
  let dividend = Math.max(numA, numB);

  while (dividend % result) {
    const nextDividend = result;
    result = dividend % result;
    dividend = nextDividend;
  }
  return result;
}
