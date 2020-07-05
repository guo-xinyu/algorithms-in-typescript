// export type Candidates<T = string> = Record<string, T[]>;

export type Matching = [PersonId, PersonId][];

export type PersonId = string;

// export type Gender = 'Female' | 'Male';

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
