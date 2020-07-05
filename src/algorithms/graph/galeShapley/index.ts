import {Matching, MatingPerson, Gender, PersonId} from '../../../model/GraphDo';

type GirlMatchBoy = Record<PersonId, PersonId>;

type BoysNextCandidate = Record<PersonId, PersonId>;

/**
 * @description 分爲男子和女子的人群
 * @author 郭新雨
 * @date 2020-06-30
 * @interface ClassificationResult
 */
interface ClassificationResult {
  males: MatingPerson[];
  females: MatingPerson[];
}

/**
 * @description 男子在自己的候選人名單中選擇一個最喜歡的
 * @author 郭新雨
 * @date 2020-07-05
 * @param {MatingPerson[]} boysCandidates 男子的候選人名單
 * @param {PersonId} id 男子的ID
 * @returns {BoysNextCandidate} 男子的選擇
 */
function getBoysCandidatesFirstItem(boysCandidates: MatingPerson[], id: PersonId): BoysNextCandidate {
  const result = boysCandidates.find((ele) => ele.id === id);
  if (result && result.lovingRank.length) {
    return {[id]: result.lovingRank[0]};
  }
  return {};
}

/**
 * @description 男子們選擇女子
 * @author 郭新雨
 * @date 2020-07-05
 * @param {MatingPerson[]} males 男子們的信息
 * @returns {BoysNextCandidate} 男子們的選擇
 */
function boyChooseGirl(males: MatingPerson[]): BoysNextCandidate {
  return males.reduce((prev, cur) => {
    return Object.assign(prev, getBoysCandidatesFirstItem(males, cur.id));
  }, {});
}

/**
 * @description 女子從自己的追求者中選擇一個最喜歡的
 * @author 郭新雨
 * @date 2020-07-05
 * @param {PersonId} id 女子的ID
 * @param {MatingPerson} female 女子的信息
 * @param {BoysNextCandidate} boyCandidate 男子們的追求名單
 * @returns {GirlMatchBoy} 女子的選擇
 */
function getBoyByGirlCandidates(id: PersonId, female: MatingPerson, boyCandidate: BoysNextCandidate):
GirlMatchBoy {
  const girlCandidate: PersonId[] = female.lovingRank;
  if (!girlCandidate || !girlCandidate.length) {
    return {};
  }
  const result = girlCandidate.find(ele => Reflect.get(boyCandidate, ele) === id);
  if (result) {
    return {[id]: result};
  }
  return {};
}

/**
 * @description 女子們選擇男子
 * @author 郭新雨
 * @date 2020-07-05
 * @param {MatingPerson[]} females 女子們
 * @param {BoysNextCandidate} malesNextCandidate 男子們的追求名單
 * @returns {GirlMatchBoy} 女子們的選擇
 */
function girlChooseBoy(females: MatingPerson[], malesNextCandidate: BoysNextCandidate): GirlMatchBoy {
  return females.reduce((prev, cur) =>
    Object.assign(prev, getBoyByGirlCandidates(cur.id, cur, malesNextCandidate)),
  {});
}

/**
 * @description 男子根據女子的選擇更新自己的候選人名單
 * @author 郭新雨
 * @date 2020-07-05
 * @param {PersonId} maleId 男子的ID
 * @param {PersonId[]} boyCandidates 男子的候選人名單
 * @param {GirlMatchBoy} result 女子的選擇結果
 * @returns {PersonId[]} 男子的新候選人名單
 */
function filterBoyCandidate(maleId: PersonId, boyCandidates: PersonId[], result: GirlMatchBoy): PersonId[] {
  if (!boyCandidates.length) {
    return boyCandidates;
  }
  const girlChoose = (Reflect.get(result, boyCandidates[0]) || '') as PersonId;
  if (girlChoose !== maleId) {
    boyCandidates.splice(0, 1);
    return boyCandidates;
  }
  return boyCandidates;
}

/**
 * @description 男子們根據女子的選擇更新自己的候選人名單
 * @author 郭新雨
 * @date 2020-07-05
 * @param {MatingPerson[]} males 男子們
 * @param {GirlMatchBoy} result 女子們的選擇
 * @returns {MatingPerson[]} 更新候選人名單後的男子們的信息
 */
function boyModifyCandidate(males: MatingPerson[], result: GirlMatchBoy): MatingPerson[] {
  return males.map(ele => Object.assign(ele, {lovingRank: filterBoyCandidate(ele.id, ele.lovingRank, result)}));
}

/**
 * @description 將人群分類爲男子和女子
 * @author 郭新雨
 * @date 2020-06-30
 * @param {MatingPerson[]} persons 人群
 * @returns {[MatingPerson[], MatingPerson[]]} 男子和女子
 */
function classifyPerson(persons: MatingPerson[]): ClassificationResult {
  const males: MatingPerson[] = [];
  const females: MatingPerson[] = [];
  for (let person of persons) {
    if (person.gender === Gender.male) {
      males.push(person);
    } else {
      females.push(person);
    }
  }
  return {
    males,
    females
  };
}

/**
 * @description 判斷匹配是否穩定，原理是判斷每個男子之間選擇的女子有無重複，若有則不穩定，若無則穩定
 * @author 郭新雨
 * @date 2020-07-05
 * @param {BoysNextCandidate} maleChooseFemale 男子的選擇名單
 * @returns {boolean} 判斷結果
 */
function choosingIsStable(maleChooseFemale: BoysNextCandidate): boolean {
  const maleSet = new Set(Object.keys(maleChooseFemale));
  const femaleSet = new Set(Object.values(maleChooseFemale));
  return maleSet.size === femaleSet.size;
}

/**
 * @description 蓋爾——沙普利算法，亦稱延遲接受算法（deferred acceptance algorithm）
 * @author 郭新雨
 * @date 2020-07-05
 * @export
 * @param {MatingPerson[]} persons 一群人
 * @returns {Matching} 匹配結果
 */
export default function galeShapley(persons: MatingPerson[]):
Matching {
  let result: GirlMatchBoy = {};
  const {males, females} = classifyPerson(JSON.parse(JSON.stringify(persons)));
  let newBoysCandidates: MatingPerson[] = males;
  for (;;) {
    const maleChooseFemale = boyChooseGirl(newBoysCandidates);
    result = girlChooseBoy(females, maleChooseFemale);
    newBoysCandidates = boyModifyCandidate(newBoysCandidates, result);
    if (choosingIsStable(maleChooseFemale)) {
      return Object.keys(result).map(key => [key, Reflect.get(result, key) as PersonId || '']);
    }
  }
}
