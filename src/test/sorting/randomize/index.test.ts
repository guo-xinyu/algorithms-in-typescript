import {PerformanceObserver, performance, PerformanceEntry} from 'perf_hooks';
import assert from 'assert';

import {it} from 'mocha';

import logger from '../../../loggers/unitTest';
import randomize from '../../../algorithms/sorting/randomize';

/**
 * @description
 * @author 郭新雨
 * @date 2020-05-20
 * @export
 */
export default function testRandomize(): void {
  const arr: number[] = [];
  for (let i = 0; i <= 9; ++i) {
    arr.push(i);
  }
  //   const numA = NumberUtils.randomInteger(range[0], range[1]);

  it(`${JSON.stringify(arr)}亂序後的結果爲${JSON.stringify(randomize(arr))}\n`, (done) => {
    const obs = new PerformanceObserver((items) => {
      logger.info(items.getEntries().map(
        (ele: PerformanceEntry): string => `${ele.name}方法耗時: ${ele.duration}ms`).join('\n'));
      performance.clearMarks();
    });
    obs.observe({entryTypes: ['measure']});
    performance.mark('A');
    const result = randomize(arr);
    performance.mark('B');
    performance.measure('隨機數組算法的耗時爲', 'A', 'B');

    assert.ok(arr.length === result.length);
    done();
  });
}
