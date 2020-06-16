/**
 * @description 用N個半徑爲R釐米的球進行如下實現。
 * 在H米高的位置設置了一個圓筒，將球垂直放入（從下向上數第i個球的底端距離地面高度爲H+2R。實驗開始時最下面的球開始掉落，
 * 此後每一秒又有一個球開始掉落。不計空氣阻力，并假設球與球或地面間的碰撞是彈性碰撞。
 * 請求出實驗開始後T秒鐘時每個球底端的高度。假設重力加速度爲g=10m/s^2
 * @author 郭新雨
 * @date 2020-04-26
 * @export
 * @param {number} n 球的個數
 * @param {number} h 圓筒底端的高度/米
 * @param {number} r 球的半徑/釐米
 * @param {number} t 要得到多少秒之後的每個球的高度
 * @returns {number} 每個球的高度
 */
export default function solution(n: number, h: number, r: number, t: number): number[] {
  return [n * h * r * t];
}
