import {it} from 'mocha';
import inspect from 'object-inspect';

import {ConnectedWeightedGraph} from '../../model/GraphDo';
import ArrayUtils from '../../utils/ArrayUtils';
import GraphUtils, {GraphType} from '../../utils/GraphUtils';

/**
 * @description
 * @author 郭新雨
 * @date 2020-12-02
 * @returns {ConnectedWeightedGraph}
 */
function createAGraph(): ConnectedWeightedGraph {
  return {
    vertices: new Set(['a', 'b', 'c', 'd']),
    weightedEdges: new Set([{
      v1: 'a',
      v2: 'b',
      weight: 1
    }, {
      v1: 'a',
      v2: 'c',
      weight: 1
    }, {
      v1: 'b',
      v2: 'd',
      weight: 1
    }])
  };
}

/**
 * @description
 * @author 郭新雨
 * @date 2020-12-02
 * @returns {ConnectedWeightedGraph}
 */
function createBGraph(): ConnectedWeightedGraph {
  return {
    vertices: new Set(['a', 'b', 'c']),
    weightedEdges: new Set([{
      v1: 'a',
      v2: 'b',
      weight: 1
    }, {
      v1: 'b',
      v2: 'c',
      weight: 2
    }])
  };
}

/**
 * @description
 * @author 郭新雨
 * @date 2020-11-26
 * @export
 */
export default function testGraphUtils(): void {
  const aGraph = createAGraph();
  const bGraph = createBGraph();
  // const twoGraph = createTwoGraph();

  it(`${inspect([aGraph, bGraph], {indent: 2})}兩個圖的頂點相同嗎？\n${
    String(GraphUtils.verticesEuqual(aGraph, bGraph))}\n`, (done) => {
    done();
  });

  const vertex1 = ArrayUtils.randomElement(Array.from(aGraph.vertices));
  const vertex2 = ArrayUtils.randomElement(Array.from(aGraph.vertices));

  it(`${inspect(aGraph, {indent: 2})}中的節點${vertex1}和節點${vertex2}連通嗎？\n${
    String(GraphUtils.dfsTwoVertexConnected(vertex1, vertex2, aGraph))}\n`, (done) => {
    done();
  });

  it(`圖${inspect(aGraph, {indent: 2})}是否連通\n${
    String(GraphUtils.isConnected(aGraph))}\n`, (done) => {
    done();
  });

  const randomCreatedTree = GraphUtils.randomGraph(5, GraphType.tree);
  it(`隨機生成了一個圖：\n${
    inspect(randomCreatedTree.vertices, {indent: 2})
  }\n${
    inspect(randomCreatedTree.weightedEdges, {indent: 2})
  }`, (done) => {
    done();
  });
}
