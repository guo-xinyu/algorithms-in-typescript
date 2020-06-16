/**
 * @description 動態規劃的各種方法
 * @export
 * @enum {number}
 */
export enum DynamicProgrammingCode {
  upBottom = 'UP_BOTTOM',
  topDownWithMemoization = 'TOP_DOWN_WITH_MEMOIZATION',
  bottomUp = 'BOTTOM_UP'
}

/**
 * @description 利用自頂向下動態規劃方法解决如何切割鋼條能獲取最大利潤的問題
 * @author 郭新雨
 * @date 2020-03-09
 * @param {number} leng 鋼條長度，整數
 * @param {Map<number, number>} map 鋼條每種長度的價格，整數
 * @returns {number} 獲利
 */
function upBottomCutRod(leng: number, map: Map<number, number>): number {
  if (leng === 0) {
    return 0;
  }
  let result = 0;
  for (let i = 1; i <= leng; ++i) {
    const solutionResult = (map.get(i) || 0) + upBottomCutRod(leng - i, map);
    if (result < solutionResult) {
      result = solutionResult;
    }
  }
  return result;
}

const memoizedMap = new Map<number, number>();

/**
 * @description 利用自頂向下動態規劃方法解决如何切割鋼條能獲取最大利潤的問題
 * @author 郭新雨
 * @date 2020-03-09
 * @param {number} leng 鋼條長度，整數
 * @param {Map<number, number>} map 鋼條每種長度的價格，整數
 * @returns {number} 獲利
 */
function topDownWithMemoizationCutRod(leng: number, map: Map<number, number>): number {
  if (leng === 0) {
    return 0;
  }
  let result = 0;
  for (let i = 1; i <= leng; ++i) {
    const downResult = memoizedMap.get(leng - i) || topDownWithMemoizationCutRod(leng - i, map);
    const solutionResult = (map.get(i) || 0) + downResult;
    if (result < solutionResult) {
      result = solutionResult;
    }
  }
  memoizedMap.set(leng, result);
  return result;
}

const bottomUpMap = new Map<number, number>();

/**
 * @description 利用自頂向下動態規劃方法解决如何切割鋼條能獲取最大利潤的問題
 * @author 郭新雨
 * @date 2020-03-09
 * @param {number} leng 鋼條長度，整數
 * @param {Map<number, number>} map 鋼條每種長度的價格，整數
 * @returns {number} 獲利
 */
function bottomUpCutRod(leng: number, map: Map<number, number>): number {
  if (leng === 0) {
    return 0;
  }
  for (let i = 1; i <= leng; ++i) {
    let result = 0;
    for (let j = 1; j <= i; ++j) {
      const memoResult = (bottomUpMap.get(i - j) || 0) + (map.get(j) || 0);
      if (result < memoResult) {
        result = memoResult;
      }
    }
    bottomUpMap.set(i, result);
  }
  return bottomUpMap.get(leng) || 0;
}

/**
 * @description 利用動態規劃解决如何切割鋼條能獲取最大利潤的問題（（科爾曼 著，殷建平 譯：算法導論，機械工業出版社，2013年），第十五章第一道例題）
 * @author 郭新雨
 * @date 2020-03-08
 * @export
 * @param {number} leng 鋼條長度，整數
 * @param {Map<number, number>} map 鋼條每種長度的價格，整數
 * @param {DynamicProgrammingCode} state 動態規劃的狀態，决定使用哪一種動態規劃方法
 * @returns {number} 獲利
 */
export default function cutRod(leng: number, map: Map<number, number>, state: DynamicProgrammingCode): number {
  switch (state) {
    case DynamicProgrammingCode.upBottom:
      return upBottomCutRod(leng, map);
    case DynamicProgrammingCode.topDownWithMemoization:
      return topDownWithMemoizationCutRod(leng, map);
    case DynamicProgrammingCode.bottomUp:
      return bottomUpCutRod(leng, map);
    default:
      return 0;
  }
}
