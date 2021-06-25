export type Matching = [PersonId, PersonId][];

export type PersonId = string;

/**
 * @description 性别
 * @export
 * @enum {number}
 */
export enum Gender {
  female = 'female',
  male = 'male'
}

/**
 * @description 人的信息
 * @author 郭新雨
 * @date 2020-06-29
 * @export
 * @interface MatingPerson
 */
export interface MatingPerson {
  id: PersonId;
  name: string;
  age: number;
  gender: Gender;
  lovingRank: PersonId[];
}

/**
 * @description 帶權重的邊
 * @author 郭新雨
 * @date 2020-07-24
 * @export
 * @interface WeightedEdge
 */
export interface WeightedEdge {
  v1: string;
  v2: string;
  weight: number;
}

/**
 * @description 連通加權圖
 * @author 郭新雨
 * @date 2020-07-24
 * @export
 * @interface ConnectedWeightedGraph
 */
export interface ConnectedWeightedGraph {
  vertices: Set<string>;
  weightedEdges: Set<WeightedEdge>;
}

// /**
//  * @description
//  * @author 郭新雨
//  * @date 2021-05-13
//  * @export
//  * @interface Tree
//  */
// export interface Tree {
//   node: string;
//   parentToNodeWeight: number;
//   children?: Tree[];
// }
