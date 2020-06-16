import NumberUtils from '../../../utils/NumberUtils';
import {it} from 'mocha';
import {PerformanceObserver, performance, PerformanceEntry} from 'perf_hooks';
import logger from '../../../loggers/unitTest';
import euclidAlgorithm from '../../../algorithms/numberTheory/euclidAlgorithm';
import assert from 'assert';

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

  it(`${numA}與${numB}的最大公約數是${euclidAlgorithm(numA, numB)}\n`, (done) => {
    const obs = new PerformanceObserver((items) => {
      logger.info(items.getEntries().map(
        (ele: PerformanceEntry): string => `${ele.name}方法耗時: ${ele.duration}ms`).join('\n'));
      performance.clearMarks();
    });
    obs.observe({entryTypes: ['measure']});
    performance.mark('A');
    const result = euclidAlgorithm(numA, numB);
    performance.mark('B');
    performance.measure('輾轉相除法所耗時間爲', 'A', 'B');

    assert.ok(NumberUtils.isGcd(result, numA, numB));
    done();
  });
}
