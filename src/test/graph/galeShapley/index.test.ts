import {PerformanceObserver, performance, PerformanceEntry} from 'perf_hooks';
import assert from 'assert';

import {it} from 'mocha';
import Chance from 'chance';

import {MatingPerson, Gender, PersonId, Matching} from '../../../model/GraphDo';
import randomize from '../../../algorithms/sorting/randomize';
import NumberUtils from '../../../utils/NumberUtils';
import logger from '../../../loggers/unitTest';
import galeShapley from '../../../algorithms/graph/galeShapley';

/**
 * @description
 * @author 郭新雨
 * @date 2020-07-05
 * @param {MatingPerson[]} persons
 * @param {number} num
 * @param {Gender} gender
 * @returns {PersonId[]}
 */
function filterRandomPerson(persons: MatingPerson[], num: number, gender: Gender): PersonId[] {
  const randomArr = randomize(persons.filter(ele => ele.gender === gender));
  const result: PersonId[] = [];
  for (let i = 0; i <= num - 1; ++i) {
    result.push(randomArr[i].id);
  }
  return result;
}

/**
 * @description
 * @author 郭新雨
 * @date 2020-07-05
 * @returns {MatingPerson[]}
 */
function generatePersons(): MatingPerson[] {
  const persons: MatingPerson[] = [];
  const chance = new Chance();
  for (let i = 0; i <= 9; ++i) {
    const gender = chance.gender().toLowerCase() as Gender;
    persons.push({
      name: chance.name({gender}),
      id: chance.ssn(),
      age: NumberUtils.randomInteger(18, 35),
      gender,
      lovingRank: []
    });
  }

  const maleNumber = persons.filter(ele => ele.gender === Gender.male).length;
  const femaleNumber = persons.filter(ele => ele.gender === Gender.female).length;

  for (let person of persons) {
    if (person.gender === Gender.male) {
      person.lovingRank.push(...filterRandomPerson(persons, NumberUtils.randomInteger(1, femaleNumber), Gender.female));
    } else if (person.gender === Gender.female) {
      person.lovingRank.push(...filterRandomPerson(persons, NumberUtils.randomInteger(1, maleNumber), Gender.male));
    }
  }
  return persons;
}

/**
 * @description
 * @author 郭新雨
 * @date 2020-07-05
 * @param {Matching[]} matching
 * @param {MatingPerson[]} persons
 * @returns {[MatingPerson, MatingPerson][]}
 */
function findResultPersonInfo(matching: Matching, persons: MatingPerson[]): [MatingPerson, MatingPerson][] {
  // return matching.map(ele => {
  //   const maleInfo = persons.find(findPers => findPers.id === ele[0]);
  //   const femaleInfo = persons.find(findPers => findPers.id === ele[1]);
  //   if (maleInfo && femaleInfo) {
  //     return [maleInfo, femaleInfo];
  //   }
  //   return [];
  // });
  const result: [MatingPerson, MatingPerson][] = [];
  for (let singleMatching of matching) {
    const maleInfo = persons.find(findPers => findPers.id === singleMatching[0]);
    const femaleInfo = persons.find(findPers => findPers.id === singleMatching[1]);
    if (maleInfo && femaleInfo) {
      result.push([maleInfo, femaleInfo]);
    }
  }
  return result;
}

/**
 * @description
 * @author 郭新雨
 * @date 2020-07-07
 * @param {PersonId} personId
 * @param {[PersonId,PersonId]} match
 * @returns {PersonId}
 */
function getCoupleIdFromMatching(personId: PersonId, match: [PersonId, PersonId]): PersonId {
  if (match[0] === personId) {
    return match[1];
  } else if (match[1] === personId) {
    return match[0];
  }
  return '';
}

/**
 * @description
 * @author 郭新雨
 * @date 2020-07-07
 * @param {PersonId} aId
 * @param {PersonId} bId
 * @param {MatingPerson[]} persons
 * @param {Matching} matching
 * @returns {boolean}
 */
function bLoveABetter(aId: PersonId, bId: PersonId, persons: MatingPerson[], matching: Matching):
boolean {
  const lover = persons.find(ele => ele.id === bId);
  if (!lover) {
    return false;
  }
  // const aId;
  const inLoverRank = lover.lovingRank.findIndex(ele => ele === aId);
  if (inLoverRank < 0) {
    return false;
  }
  const loverCouples = matching.find(ele => ele.includes(bId));
  if (!loverCouples) {
    return true;
  }
  const loverCoupleId = getCoupleIdFromMatching(bId, loverCouples);
  if (!loverCoupleId) {
    return true;
  }
  const loverCoupleInLoverRank = lover.lovingRank.findIndex(ele => ele === loverCoupleId);
  return inLoverRank < loverCoupleInLoverRank;
}

/**
 * @description 判斷一對夫婦是否穩定，看夫婦雙方相較與自己的配偶，會不會跟别人好上，
 * 即看是否存在這對夫婦之外的人甲，這對夫婦中的一個人乙相較于自己的配偶更喜歡甲，甲相較于自己的配偶也更喜歡這對夫婦中的那個乙
 * @author 郭新雨
 * @param matching
 * @date 2020-07-06
 * @param {[MatingPerson, MatingPerson]} couple
 * @param {MatingPerson[]} persons
 * @returns {boolean}
 */
function coupleIsStable(couple: [MatingPerson, MatingPerson], persons: MatingPerson[], matching: Matching): boolean {
  for (let personId of couple[0].lovingRank) {
    if (personId === couple[1].id) {
      break;
    }
    const loverLoveMeBetter = bLoveABetter(couple[0].id, personId, persons, matching);
    if (loverLoveMeBetter) {
      return false;
    }
  }
  for (let personId of couple[1].lovingRank) {
    if (personId === couple[0].id) {
      break;
    }
    const loverLoveMeBetter = bLoveABetter(couple[1].id, personId, persons, matching);
    if (loverLoveMeBetter) {
      return false;
    }
  }
  return true;
}

/**
 * @description 判斷組合是否穩定
 * @author 郭新雨
 * @date 2020-07-06
 * @param {Matching} matching
 * @param {MatingPerson[]} persons
 * @returns {boolean}
 */
function matchingIsStable(matching: Matching, persons: MatingPerson[]): boolean {
  for (let couple of matching) {
    const male = persons.find(ele => ele.id === couple[0]);
    const female = persons.find(ele => ele.id === couple[1]);
    if (!male || !female) {
      continue;
    }
    const isStable = coupleIsStable([male, female], persons, matching);
    if (!isStable) {
      return false;
    }
  }
  return true;
}

/**
 * @description
 * @author 郭新雨
 * @date 2020-06-28
 * @export
 */
export default function testGaleShapley(): void{
  const persons = generatePersons();

  it(`各位男性女性：${JSON.stringify(persons)}\n組合：${
    JSON.stringify(findResultPersonInfo(galeShapley(persons), persons))}`, (done) => {
    const obs = new PerformanceObserver((items) => {
      logger.info(items.getEntries().map(
        (ele: PerformanceEntry): string => `${ele.name}方法耗時: ${ele.duration}ms`).join('\n'));
      performance.clearMarks();
    });
    obs.observe({entryTypes: ['measure']});
    performance.mark('A');
    const result = galeShapley(persons);
    performance.mark('B');
    performance.measure('婚姻匹配所耗時間', 'A', 'B');

    assert.ok(matchingIsStable(result, persons));
    done();
  });
}
