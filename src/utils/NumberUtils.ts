/**
 * @description 數的工具類
 * @author 郭新雨
 * @date 2020-05-20
 * @export
 * @class NumberUtils
 */
export default class NumberUtils {
  /**
   * @description 生成指定範圍内的隨機整數
   * @author 郭新雨
   * @date 2020-05-20
   * @static
   * @param {number} min 下界
   * @param {number} max 上界
   * @returns {number} 生成的整數
   * @memberof NumberUtils
   */
  public static randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
   * @description 判斷一個數是否是兩個數的最大公約數
   * @author 郭新雨
   * @date 2020-06-16
   * @static
   * @param {number} result 所要判斷的數
   * @param {number} numA 數a
   * @param {number} numB 數b
   * @returns {boolean} 判斷結果
   * @memberof NumberUtils
   */
  public static isGcd(result: number, numA: number, numB: number): boolean {
    if (result > numA && result > numB) {
      return false;
    }
    for (let i = result + 1; i <= numA && i <= numB; ++i) {
      if (numA % i === 0 && numB % i === 0) {
        return false;
      }
    }
    return true;
  }
}
