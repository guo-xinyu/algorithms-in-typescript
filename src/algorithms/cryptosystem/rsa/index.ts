import euclidAlgorithm from '../../numberTheory/euclidAlgorithm';
import extendedEuclidAlgorithm from '../../numberTheory/extendedEuclidAlgorithm';
import NumberUtils from '../../../utils/NumberUtils';

/**
 * @description RSA密碼系統，本類因node.js性能限制，衹能加密5以内的整數
 * @author 郭新雨
 * @date 2020-06-11
 * @export
 * @class Rsa
 */
export default class Rsa {
  private p = 0;
  private q = 0;
  private n = 0;
  private e = 0;
  private d = 0;
  public constructor() {
    this.p = this.createPrime();
    for (;;) {
      this.q = this.createPrime();
      if (this.q !== this.p) {
        break;
      }
    }

    this.n = this.p * this.q;
    this.e = this.randomRelativePrimeNumber((this.p - 1) * (this.q - 1), [2, ((this.p - 1) * (this.q - 1)) - 1]);
    // console.log('p', this.p);
    // console.log('q', this.q);
    // console.log('e', this.e);
    // console.log(JSON.stringify(extendedEuclidAlgorithm(this.e, (this.p - 1) * (this.q - 1))));
    this.d = (extendedEuclidAlgorithm(this.e, (this.p - 1) * (this.q - 1)).find(ele => ele[0] >= 0) || [0, 0])[0];
    // console.log('d', this.d);
  }
  public getPublicKey(): [number, number] {
    return [this.n, this.e];
  }
  public decrypt(primMessage: number): number {
    return Math.pow(primMessage, this.d) % this.n;
  }
  public encrypt(message: number): number {
    return Math.pow(message, this.e) % this.n;
  }
  private randomRelativePrimeNumber(num: number, range: [number, number]): number {
    for (;;) {
      const result = NumberUtils.randomInteger(range[0], range[1]);
      if (euclidAlgorithm(num, result) === 1) {
        return result;
      }
    }
  }
  private createPrime(): number {
    for (;;) {
      const num = NumberUtils.randomInteger(5, 10);
      if (NumberUtils.isPrime(num)) {
        return num;
      }
    }
  }
}
