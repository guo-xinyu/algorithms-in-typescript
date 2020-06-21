import {PerformanceObserver, performance, PerformanceEntry} from 'perf_hooks';
import assert from 'assert';

import {it} from 'mocha';

import logger from '../../../loggers/unitTest';
import extendedEuclidAlgorithm from '../../../algorithms/numberTheory/extendedEuclidAlgorithm';
import NumberUtils from '../../../utils/NumberUtils';

/**
 * @description
 * @author 郭新雨
 * @date 2020-05-20
 * @export
 */
export default function testEuclidAlgorithm(): void{
  const range = [1, 10000];
  const numA = NumberUtils.randomInteger(range[0], range[1]);
  const numB = NumberUtils.randomInteger(range[0], range[1]);
  // const numA = 26;
  // const numB = 10;

  it(`${numA}與${numB}的貝祖係數是${JSON.stringify(extendedEuclidAlgorithm(numA, numB))}\n`, (done) => {
    const obs = new PerformanceObserver((items) => {
      logger.info(items.getEntries().map(
        (ele: PerformanceEntry): string => `${ele.name}方法耗時: ${ele.duration}ms`).join('\n'));
      performance.clearMarks();
    });
    obs.observe({entryTypes: ['measure']});
    performance.mark('A');
    const result = extendedEuclidAlgorithm(numA, numB);
    performance.mark('B');
    performance.measure('輾轉相除法所耗時間爲', 'A', 'B');

    assert.ok(result.reduce((prev, cur) => prev && NumberUtils.isGcd((cur[0] * numA) + (cur[1] * numB), numA, numB),
      NumberUtils.isGcd((result[0][0] * numA) + (result[0][1] * numB), numA, numB)));
    done();
  });
}
