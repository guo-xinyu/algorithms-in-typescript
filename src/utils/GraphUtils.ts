import Chance from 'chance';

import {ConnectedWeightedGraph, WeightedEdge} from '../model/GraphDo';

import ArrayUtils from './ArrayUtils';
import NumberUtils from './NumberUtils';

/**
 * @description
 * @export
 * @enum {number}
 */
export enum GraphType {
  tree = 'tree'
}

/**
 * @description 圖工具
 * @author 郭新雨
 * @date 2020-10-25
 * @export
 * @class GraphUtils
 */
export default class GraphUtils {
  /**
   * @description 判斷兩個圖的頂點是否相同
   * @author 郭新雨
   * @date 2020-10-25
   * @param {ConnectedWeightedGraph} aGraph A圖
   * @param {ConnectedWeightedGraph} bGraph B圖
   * @returns {boolean} 判斷結果
   */
  public static verticesEuqual(aGraph: ConnectedWeightedGraph, bGraph: ConnectedWeightedGraph): boolean {
    if (aGraph.vertices.size !== bGraph.vertices.size) {
      return false;
    }
    const result = Array.from(aGraph.vertices).find(ele => !bGraph.vertices.has(ele));
    if (typeof result === 'string') {
      return false;
    }
    return true;
  }
  /**
   * @description 用深度優先搜索的方法判斷一個圖的兩個頂點是否連通
   * @author 郭新雨
   * @date 2020-10-25
   * @static
   * @param {string} aVertex A頂點
   * @param {string} bVertex B頂點
   * @param {ConnectedWeightedGraph} graph 圖
   * @returns {boolean} 判斷結果
   * @memberof GraphUtils
   */
  public static dfsTwoVertexConnected(aVertex: string, bVertex: string, graph: ConnectedWeightedGraph): boolean {
    for (let edge of Array.from(graph.weightedEdges).filter(ele => ele.v1 === aVertex || ele.v2 === aVertex)) {
      if (edge.v1 === bVertex || edge.v2 === bVertex) {
        return true;
      }
      if (edge.v1 === aVertex && GraphUtils.dfsTwoVertexConnected(edge.v2, bVertex, graph)) {
        return true;
      }
      if (edge.v2 === bVertex && GraphUtils.dfsTwoVertexConnected(edge.v1, bVertex, graph)) {
        return true;
      }
    }
    return false;
  }
  /**
   * @description 判斷一個圖是否是連通的
   * @author 郭新雨
   * @date 2020-10-25
   * @static
   * @param {ConnectedWeightedGraph} graph 圖
   * @returns {boolean} 判斷結果
   * @memberof GraphUtils
   */
  public static isConnected(graph: ConnectedWeightedGraph): boolean {
    if (graph.vertices.size === 0) {
      return false;
    }
    if (graph.vertices.size === 1) {
      return true;
    }
    const verticesArr = Array.from(graph.vertices);
    const firstVertex = verticesArr[0];
    for (let vertex of verticesArr) {
      if (vertex === firstVertex) {
        continue;
      }
      if (!GraphUtils.dfsTwoVertexConnected(firstVertex, vertex, graph)) {
        return false;
      }
    }
    return true;
  }
  /**
   * @description
   * @author 郭新雨
   * @date 2020-11-12
   * @static
   * @param {number} vertexSize
   * @param {GraphType} graphType
   * @returns {ConnectedWeightedGraph}
   * @memberof GraphUtils
   */
  public static randomGraph(vertexSize: number, graphType: GraphType): ConnectedWeightedGraph {
    // const vertexSize = NumberUtils.randomInteger(1, 100);
    const vertices = new Set<string>();
    const chance = new Chance();
    for (let i = 0; i <= vertexSize - 1; ++i) {
      vertices.add(chance.string({length: vertexSize}));
    }
    const weightedEdges = new Set<WeightedEdge>();
    if (graphType === GraphType.tree) {
      const verticesArray = Array.from(vertices);
      for (let [index, vertex] of verticesArray.entries()) {
        if (index === verticesArray.length - 1) {
          continue;
        }
        weightedEdges.add({
          v1: vertex,
          v2: verticesArray[index + 1],
          weight: NumberUtils.randomInteger(1, 100)
        });
      }
      const weightedEdgeNum = NumberUtils.randomInteger(0, ((vertexSize - 2) * (vertexSize - 1)) / 2);
      for (let i = 0; i <= weightedEdgeNum - 1; ++i) {
        weightedEdges.add({
          v1: ArrayUtils.randomElement(verticesArray),
          v2: ArrayUtils.randomElement(verticesArray),
          weight: NumberUtils.randomInteger(1, 100)
        });
      }
    }
    return {
      vertices,
      weightedEdges
    };
  }
}
