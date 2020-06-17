import assert from 'assert';
import {PerformanceObserver, performance, PerformanceEntry} from 'perf_hooks';

import {it} from 'mocha';

import cutRod, {DynamicProgrammingCode} from '../../algorithms/dynamicProgramming/cutRod';
import {formatMapOutput} from '../../utils/OutputUtils';
import logger from '../../loggers/unitTest';

const priceMap = new Map<number, number>();

priceMap.set(1, 1);
priceMap.set(2, 5);
priceMap.set(3, 8);
priceMap.set(4, 9);
priceMap.set(5, 10);
priceMap.set(6, 17);
priceMap.set(7, 17);
priceMap.set(8, 20);
priceMap.set(9, 24);
priceMap.set(10, 30);
priceMap.set(11, 32);
priceMap.set(12, 35);
priceMap.set(13, 39);
priceMap.set(14, 47);
priceMap.set(15, 50);

const rogLength = 15;

/**
 * @description
 * @author 郭新雨
 * @date 2020-03-08
 * @export
 */
export default function testDynamicProgramming(): void {
  it(`鋼條長度爲${rogLength}\n價格表爲\n${formatMapOutput('長度', '價格', priceMap)}`, (done) => {
    const obs = new PerformanceObserver((items) => {
      logger.info(items.getEntries().map(
        (ele: PerformanceEntry): string => `${ele.name}方法耗時: ${ele.duration}ms`).join('\n'));
      performance.clearMarks();
    });
    obs.observe({entryTypes: ['measure']});
    performance.mark('A');
    const result2 = cutRod(rogLength, priceMap, DynamicProgrammingCode.upBottom);
    performance.mark('B');
    performance.measure(DynamicProgrammingCode.upBottom, 'A', 'B');
    performance.mark('C');
    const result1 = cutRod(rogLength, priceMap, DynamicProgrammingCode.topDownWithMemoization);
    performance.mark('D');
    performance.measure(DynamicProgrammingCode.topDownWithMemoization, 'C', 'D');

    performance.mark('E');
    const result3 = cutRod(rogLength, priceMap, DynamicProgrammingCode.bottomUp);
    performance.mark('F');
    performance.measure(DynamicProgrammingCode.bottomUp, 'E', 'F');

    assert.equal(result1, result2);
    assert.equal(result1, result3);
    done();
  });
}
