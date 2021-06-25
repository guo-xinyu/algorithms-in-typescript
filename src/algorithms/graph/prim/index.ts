import {ConnectedWeightedGraph, WeightedEdge} from '../../../model/GraphDo';

// /**
//  * @description
//  * @author 郭新雨
//  * @date 2021-05-12
//  * @interface PrimTreeNode
//  */
// interface PrimTreeNode {
//   node: string;
//   key: number;
//   pi: string;
// }

/**
 * @description 普林算法獲取安全邊
 * @author 郭新雨
 * @date 2021-06-24
 * @param {ConnectedWeightedGraph} mst 最小生成樹的子集
 * @param {Set<WeightedEdge>} edges 最小生成樹子集之外的邊
 * @returns {*}  {WeightedEdge}
 */
function getSafeEdge(mst: ConnectedWeightedGraph, edges: Set<WeightedEdge>): WeightedEdge | void {
  let minWeightEdge = {
    v1: '',
    v2: '',
    weight: Number.POSITIVE_INFINITY
  };
  // if (!minWeightEdge) {
  //   return;
  // }
  for (let edge of edges) {
    if (((mst.vertices.has(edge.v1) && !mst.vertices.has(edge.v2)) ||
    (mst.vertices.has(edge.v2) && !mst.vertices.has(edge.v1))) && minWeightEdge.weight > edge.weight) {
      minWeightEdge = edge;
    }
  }
  if (!minWeightEdge.v1 && !minWeightEdge.v2) {
    return;
  }
  return minWeightEdge;
}

/**
 * @description
 * @author 郭新雨
 * @date 2020-07-24
 * @export
 * @param {ConnectedWeightedGraph} graph
 * @returns {ConnectedWeightedGraph}
 */
export default function prim(graph: ConnectedWeightedGraph): ConnectedWeightedGraph {
  const root = Array.from(graph.vertices)[0];
  const mst: ConnectedWeightedGraph = {
    weightedEdges: new Set(),
    vertices: new Set([root])
  };
  const weightedEdges = new Set(graph.weightedEdges);
  for (;;) {
    const safeEdge = getSafeEdge(mst, weightedEdges);
    if (!safeEdge) {
      return mst;
    }
    weightedEdges.delete(safeEdge);

    mst.vertices.add(safeEdge.v1);
    mst.vertices.add(safeEdge.v2);
    mst.weightedEdges.add(safeEdge);

    if (mst.vertices.size === graph.vertices.size) {
      return mst;
    }
  }

  // return mst;
}
