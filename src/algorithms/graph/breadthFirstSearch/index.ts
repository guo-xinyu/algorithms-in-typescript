import {ConnectedWeightedGraph} from '../../../model/GraphDo';

/**
 * @param params
 */
function breadthFirstSearchVisitor(params: type) {

}

/**
 * @description 廣度優先搜索
 * @author 郭新雨
 * @date 2021-05-12
 * @export
 * @param {ConnectedWeightedGraph} graph
 * @param {string} root 根節點
 * @param {(current: string) => boolean} [callback] 回調函數，返回值爲否的話則終止遍歷
 * @returns {string[]} 返回按遍歷順序排列的節點
 */
export default function breadthFirstSearch(graph: ConnectedWeightedGraph, root: string,
  callback?: (current: string) => boolean): string[] {
  const result: string[] = [];
  while (true) {
    result.push(root);
  }
  return result;
}
