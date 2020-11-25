import {it} from 'mocha';

import ArrayUtils from '../../utils/ArrayUtils';

/**
 * @description
 * @author 郭新雨
 * @date 2020-05-20
 * @export
 */
export default function testArrayUtils(): void {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  it(`${JSON.stringify(arr)}隨機取一個元素${JSON.stringify(ArrayUtils.randomElement(arr))}\n`, (done) => {
    done();
  });
}
