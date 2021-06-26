import {PerformanceObserver, performance, PerformanceEntry} from 'perf_hooks';
import assert from 'assert';

import {it} from 'mocha';
import inspect from 'object-inspect';

import logger from '../../../loggers/unitTest';
// import euclidAlgorithm from '../../../algorithms/numberTheory/euclidAlgorithm';
// import {ConnectedWeightedGraph} from '../../../model/GraphDo';
import GraphUtils, {GraphType} from '../../../utils/GraphUtils';
import kruskal from '../../../algorithms/graph/kruskal';

const testGraph = GraphUtils.randomGraph(6, GraphType.tree);

// const testGraph: ConnectedWeightedGraph = {
//   vertices: new Set(['A', 'B', 'C', 'D', 'E', 'F', 'G']),
//   weightedEdges: new Set([{
//     v1: 'A',
//     v2: 'B',
//     weight: 8
//   }, {
//     v1: 'B',
//     v2: 'C',
//     weight: 7
//   }, {
//     v1: 'C',
//     v2: 'D',
//     weight: 5
//   }, {
//     v1: 'A',
//     v2: 'E',
//     weight: 5
//   }, {
//     v1: 'C',
//     v2: 'E',
//     weight: 3
//   }, {
//     v1: 'B',
//     v2: 'E',
//     weight: 4
//   }, {
//     v1: 'D',
//     v2: 'E',
//     weight: 2
//   }, {
//     v1: 'D',
//     v2: 'F',
//     weight: 1
//   }, {
//     v1: 'B',
//     v2: 'F',
//     weight: 4
//   }, {
//     v1: 'E',
//     v2: 'G',
//     weight: 9
//   }])
// };

/**
 * @description
 * @author 郭新雨
 * @date 2020-05-20
 * @export
 */
export default function testKruskal(): void {
  // const range = [1, 10000];
  // const numA = NumberUtils.randomInteger(range[0], range[1]);
  // const numB = NumberUtils.randomInteger(range[0], range[1]);

  it(`${inspect(testGraph, {indent: 2})}的最小生成樹是${
    inspect(kruskal(testGraph), {indent: 2})
  }\n`, (done) => {
    const obs = new PerformanceObserver((items) => {
      logger.info(items.getEntries().map(
        (ele: PerformanceEntry): string => `${ele.name}方法耗時: ${ele.duration}ms`).join('\n'));
      performance.clearMarks();
    });
    // obs.observe({entryTypes: ['measure']});
    // performance.mark('A');
    // const result = euclidAlgorithm(numA, numB);
    // performance.mark('B');
    // performance.measure('輾轉相除法所耗時間爲', 'A', 'B');

    obs.observe({entryTypes: ['measure']});
    performance.mark('A');
    const minTree = kruskal(testGraph);
    performance.mark('B');

    // console.log(inspect(minTree, {indent: 2}));

    // for (let vertex of minTree.vertices) {
    //   console.log(minTree.vertices.size, vertex);
    // }
    // for (let edge of minTree.weightedEdges) {
    //   console.log(minTree.weightedEdges.size, edge);
    // }

    assert.ok(GraphUtils.isMiniumumSpanningTree(testGraph, minTree));
    done();
  });
}

// /**
//  * @description 判斷兩個圖的節點是否相同
//  * @author 郭新雨
//  * @date 2020-10-25
//  * @param {ConnectedWeightedGraph} aGraph A圖
//  * @param {ConnectedWeightedGraph} bGraph B圖
//  * @returns {boolean} 判斷結果
//  */
// function verticesEuqual(aGraph: ConnectedWeightedGraph, bGraph: ConnectedWeightedGraph): boolean {
//   if (aGraph.vertices.size !== bGraph.vertices.size) {
//     return false;
//   }
//   const result = Array.from(aGraph.vertices).find(ele => !bGraph.vertices.has(ele));
//   if (typeof result === 'string') {
//     return false;
//   }
//   return true;
// }
