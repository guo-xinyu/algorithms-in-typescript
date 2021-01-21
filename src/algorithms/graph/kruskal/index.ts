import {ConnectedWeightedGraph, WeightedEdge} from '../../../model/GraphDo';

/**
 * @description
 * @author 郭新雨
 * @date 2021-01-20
 * @param v1v2Weight
 * @param {ConnectedWeightedGraph[]} trees
 * @param {string} v1
 * @param {string} v2
 * @returns {ConnectedWeightedGraph[]}
 */
function unionTree(trees: ConnectedWeightedGraph[], v1: string, v2: string): ConnectedWeightedGraph[] {
  let resultTree = [];
  for (let tree of trees) {
    if (tree.vertices.has(v1) && !tree.vertices.has(v2)) {
      const incluedeV2Tree = trees.find(ele => ele.vertices.has(v2));
      if (incluedeV2Tree && incluedeV2Tree.vertices.size) {
        for (let vertex of incluedeV2Tree.vertices) {
          tree.vertices.add(vertex);
        }
      }
      resultTree.push(tree);
    }
    if (tree.vertices.has(v2)) {
      continue;
    }
    resultTree.push(tree);
  }
  return resultTree;
}

/**
 * @description
 * @author 郭新雨
 * @date 2020-07-24
 * @export
 * @param {ConnectedWeightedGraph} graph
 * @returns {ConnectedWeightedGraph}
 */
export default function kruskal(graph: ConnectedWeightedGraph): ConnectedWeightedGraph {
  const resultEdges = new Set<WeightedEdge>([]);
  let initTrees = Array.from(graph.vertices).map(ele => ({
    vertices: new Set([ele]),
    weightedEdges: new Set<WeightedEdge>()
  }));
  const edges = Array.from(graph.weightedEdges).sort((a, b) => a.weight - b.weight);
  for (let edge of edges) {
    if (initTrees.findIndex(ele => ele.vertices.has(edge.v1) && ele.vertices.has(edge.v2)) >= 0) {
      continue;
    }
    // console.log(initTrees);
    initTrees = unionTree(initTrees, edge.v1, edge.v2);
    resultEdges.add(edge);
  }
  if (initTrees[0]) {
    initTrees[0].weightedEdges = resultEdges;
    return initTrees[0];
  }
  return graph;
}
