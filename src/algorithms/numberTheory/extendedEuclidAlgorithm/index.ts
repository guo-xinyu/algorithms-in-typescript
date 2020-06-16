// /**
//  * @description 利用擴展歐幾里得算法，求解不定方程ax1+bx2=c的所有解
//  * @author 郭新雨
//  * @date 2020-06-12
//  * @export
//  * @param {number} a
//  * @param {number} b
//  * @param {number} c
//  * @returns {[number, number][]}
//  */
// export default function extendedEuclidAlgorithm(a: number, b: number, c: number): [number, number][] {

// }

/**
 * @description 使用擴展歐幾里得算法，計算兩個數的貝祖係數
 * @author 郭新雨
 * @date 2020-06-14
 * @export
 * @param {number} numA
 * @param {number} numB
 * @returns {[number,number][]}
 */
export default function extendedEuclidAlgorithm(numA: number, numB: number): [number, number] {
  if (numA <= 0 || !Number.isInteger(numA) || numB <= 0 || !Number.isInteger(numB)) {
    throw 'extendedEuclidAlgorithm的入參須爲正整數';
  }

  let result = Math.min(numA, numB);
  let dividend = Math.max(numA, numB);

  let s0 = 1;
  let t0 = 0;

  let s1 = 0;
  let t1 = 1;

  while (dividend % result) {
    const s = s0 - (Math.floor(dividend / result) * s1);
    const t = t0 - (Math.floor(dividend / result) * t1);
    s0 = s1;
    s1 = s;
    t0 = t1;
    t1 = t;
    const nextDividend = result;
    result = dividend % result;
    dividend = nextDividend;
  }
  if (numA > numB) {
    return [s1, t1];
  }
  return [t1, s1];
}
