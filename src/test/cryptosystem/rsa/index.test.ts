import {PerformanceObserver, performance, PerformanceEntry} from 'perf_hooks';
import assert from 'assert';

import {it} from 'mocha';

import logger from '../../../loggers/unitTest';
import Rsa from '../../../algorithms/cryptosystem/rsa';
import NumberUtils from '../../../utils/NumberUtils';

/**
 * @description
 * @author 郭新雨
 * @date 2020-05-20
 * @export
 */
export default function testEuclidAlgorithm(): void{
  const range = [1, 4];
  const numA = NumberUtils.randomInteger(range[0], range[1]);
  // const numA = 5;

  const rsa = new Rsa();

  const num1 = rsa.encrypt(numA);
  const num2 = rsa.decrypt(num1);

  it(`${numA}的加密結果是${num1}\n，解密結果是${num2}`, (done) => {
    const obs = new PerformanceObserver((items) => {
      logger.info(items.getEntries().map(
        (ele: PerformanceEntry): string => `${ele.name}方法耗時: ${ele.duration}ms`).join('\n'));
      performance.clearMarks();
    });
    obs.observe({entryTypes: ['measure']});
    performance.mark('A');
    const mPrim = rsa.encrypt(numA);
    performance.mark('B');
    performance.measure('RSA加密耗時', 'A', 'B');
    performance.mark('C');
    const m = rsa.decrypt(mPrim);
    performance.mark('D');
    performance.measure('RSA解密耗時', 'C', 'D');

    assert.ok(numA === m);
    done();
  });
}
