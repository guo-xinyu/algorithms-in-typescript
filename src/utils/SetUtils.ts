// /**
//  * @description
//  * @author 郭新雨
//  * @date 2021-01-23
//  * @param result
//  * @template T T
//  * @param {T[]} set
//  * @param {number} size
//  * @param {Set<T>} curResult
//  * @returns {Set<Set<T>>}
//  */
// function generateSubsets<T>(set: T[], size: number, result: Set<Set<T>>): Set<Set<T>> {
//   for (let ele of result) {
//     for (let oriEle of set) {
//       ele.add(oriEle);
//     }
//   }
//   return result;
// }

/**
 * @description
 * @author 郭新雨
 * @date 2021-01-22
 * @export
 * @class SetUtils
 */
export default class SetUtils {
  /**
   * @description 得到一個集合所有的某個大小的子集
   * @author 郭新雨
   * @date 2021-01-23
   * @static
   * @template T
   * @param {Set<T>} set
   * @param {number} [size]
   * @returns {Set<Set<T>>}
   * @memberof SetUtils
   */
  public static getSubsets<T>(set: Set<T>, size: number): Set<Set<T>> {
    const arr = Array.from(set);
    // let a2 = new Set();
    // let a2=
    const a2: Set<Set<T>> = new Set();
    // for (let a2 = []; a2.push([]) < arr.length;) { }
    let l = Math.pow(2, arr.length) - 1;
    for (let i = 1; i <= l; i++) {
      let t = [];
      for (let s = i, k = 0; s > 0; s >>= 1, k++) {
        if ((s & 1) === 1) { t.push(arr[k]); }
      }

      if (t.length === size) {
        a2.add(new Set<T>(t));
      }

    }
    return new Set(a2);
    // for(let i==0;i<=arr.length;++i){

    // }
    //     for (let i = 0; i <= size - 1; ++i) {
    // for(let ele of )
    //     }
  }
}
