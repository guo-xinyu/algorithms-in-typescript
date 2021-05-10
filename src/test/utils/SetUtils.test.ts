import {it} from 'mocha';
import inspect from 'object-inspect';

// import {ConnectedWeightedGraph} from '../../model/GraphDo';
// import ArrayUtils from '../../utils/ArrayUtils';
import SetUtils from '../../utils/SetUtils';

const testArr = new Set(['a', 'b', 'c', 'd', 'e']);

/**
 * @description
 * @author 郭新雨
 * @date 2020-11-26
 * @export
 */
export default function testSetUtils(): void {
//   const aGraph = createAGraph();
//   const bGraph = createBGraph();
  // const twoGraph = createTwoGraph();

  it(`${inspect(testArr, {indent: 2})}的所有的子集有？\n`, (done) => {
    done();
  });

  //   const vertex1 = ArrayUtils.randomElement(Array.from(aGraph.vertices));
  //   const vertex2 = ArrayUtils.randomElement(Array.from(aGraph.vertices));

  //   it(`${inspect(aGraph, {indent: 2})}中的節點${vertex1}和節點${vertex2}連通嗎？\n${
  //     String(GraphUtils.dfsTwoVertexConnected(vertex1, vertex2, aGraph))}\n`, (done) => {
  //     done();
  //   });

  //   it(`圖${inspect(aGraph, {indent: 2})}是否連通\n${
  //     String(GraphUtils.isConnected(aGraph))}\n`, (done) => {
  //     done();
  //   });

  const subsets = SetUtils.getSubsets(testArr, 2);
  it(`有：\n${
    inspect(subsets, {indent: 2})
    //   }\n${
    //     inspect(randomCreatedTree.weightedEdges, {indent: 2})
  }`, (done) => {
    done();
  });
}
