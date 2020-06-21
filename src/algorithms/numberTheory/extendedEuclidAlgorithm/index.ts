/**
 * @description 使用擴展歐幾里得算法，計算兩個數的貝祖係數，本函數所計算的貝祖係數爲兩組，一組爲第一個數爲正，第二個數爲負，第二組反之
 * @author 郭新雨
 * @date 2020-06-14
 * @export
 * @param {number} numA 數A
 * @param {number} numB 數B
 * @returns {[number,number][]} 兩組貝祖係數
 */
export default function extendedEuclidAlgorithm(numA: number, numB: number): [number, number][] {
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
  const linear: [number, number][] = [];
  if (numA > numB) {
    linear.push([s1, t1]);
    // return linear;
  } else {
    linear.push([t1, s1]);
  }
  if (linear[0][0] < 0) {
    linear.push([linear[0][0] + numB, linear[0][1] - numA]);
  } else {
    linear.push([linear[0][0] - numB, linear[0][1] + numA]);
  }
  return linear;
}
