/**
 * @description
 * @author 郭新雨
 * @date 2020-03-09
 * @param keyTitle
 * @param valueTitle
 * @param {Map<string | number, string | number>} map
 * @returns {string}
 */
export function formatMapOutput(
  keyTitle: string, valueTitle: string, map: Map<string | number, string | number>): string {
  let keyStr = `${keyTitle}\t`;
  let valueStr = `${valueTitle}\t`;
  // let splitter = '';

  for (let [key, value] of map.entries()) {
    keyStr += `\t${key}\t|`;
    valueStr += `\t${value}\t|`;
    // splitter += '-----';
  }
  return `${keyStr}\n${'-'.repeat(keyStr.length * 4)}\n${valueStr}`;
}
