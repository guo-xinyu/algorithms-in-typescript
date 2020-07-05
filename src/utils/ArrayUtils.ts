/**
 * @description
 * @author 郭新雨
 * @date 2020-01-07
 * @export
 * @class ArrayUtils
 */
export default class ArrayUtils {
  public static exchange<T>(arr: T[], a: number, b: number): T[] {
    if (a <= -1 || b <= -1 || a >= arr.length || b >= arr.length) {
      return arr;
    }
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
    return arr;
  }
}
