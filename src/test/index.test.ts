import {before, describe} from 'mocha';

import logger from '../loggers/unitTest';

import testDynamicProgramming from './dynamicProgramming/index.test';
import testEuclidAlgorithm from './numberTheory/euclidAlgorithm/index.test';
import extendedEuclidAlgorithm from './numberTheory/extendedEuclidAlgorithm/index.test';
import testRsaAlgorithm from './cryptosystem/rsa/index.test';
import testRandomize from './sorting/randomize/index.test';

before(function() {
  logger.warn('**********************************************************************************');
  logger.warn('* WARNING: Before running this functional test suite, make sure the DB is empty! *');
  logger.warn('*          If you do not, the tests will most likely fail! You have been warned. *');
  logger.warn('**********************************************************************************');
});

describe('測試動態規劃', testDynamicProgramming);
describe('測試輾轉相除法', testEuclidAlgorithm);
describe('測試擴展歐幾裡得算法', extendedEuclidAlgorithm);
describe('測試RSA', testRsaAlgorithm);
describe('測試隨機數組算法', testRandomize);
