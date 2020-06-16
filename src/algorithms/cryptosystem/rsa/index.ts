// import euclidAlgorithm from '../../numberTheory/euclidAlgorithm';

// /**
//  * @description
//  * @author 郭新雨
//  * @date 2020-06-11
//  * @export
//  * @class Rsa
//  */
// export class Rsa {
//   private p = 0;
//   private q = 0;
//   private n = 0;
//   private e = 0;
//   private d = 0;
//   public constructor() {
//     this.p = this.createPrime();
//     this.q = this.createPrime();
//     this.n = this.p * this.q;
//     this.e = this.randomRelativePrimeNumber((this.p - 1) * (this.q - 1), [2, ((this.p - 1) * (this.q - 1)) - 1]);
//     // this.d=
//   }
//   public getPublicKey(): [number, number] {
//     return [this.n, this.e];
//   }
//   public decrypt(primMessage: number): number {
//     return primMessage;
//   }
//   public encrypt(message: number): number {
//     this.p = this.createPrime();
//     this.q = this.createPrime();
//     const n = p * q;
//     //   const e=
//     //   return Math.pow(message) ;
//   }
//   private randomRelativePrimeNumber(num: number, range: [number, number]): number {
//     for (;;) {
//       const result = Math.floor(Math.random() * (range[1] - range[0])) + range[0];
//       if (euclidAlgorithm(num, result) === 1) {
//         return result;
//       }
//     }
//   }
//   private createPrime(): number {
//     for (;;) {
//       const num = Math.floor(Math.random() * 10000);
//       if (this.primalityTesting(num)) {
//         return num;
//       }
//     }
//   }
//   private primalityTesting(num: number): boolean {
//     if (num <= 1) {
//       return false;
//     }
//     for (let i = 2; i * i <= num; ++i) {
//       if (num % i === 0) {
//         return false;
//       }
//     }
//     return true;
//   }
// }
