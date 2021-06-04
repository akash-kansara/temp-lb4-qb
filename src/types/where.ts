import {Property} from './base';

export type PropertyClause<T> = {
  eq?: T;
  neq?: T;
  gt?: T;
  gte?: T;
  lt?: T;
  lte?: T;
  inq?: T[];
  nin?: T[];
  between?: [T, T];
  exists?: boolean;
  like?: T;
  nlike?: T;
  ilike?: T;
  nilike?: T;
  regexp?: string | RegExp;
};

export type WhereClause<M extends object> = {
  [P in Property<M>]?: M[P] | PropertyClause<M[P]>;
};

export type AndClause<T extends object> = {
  and?: Where<T>[];
};

export type OrClause<T extends object> = {
  or?: Where<T>[];
};

export type AggregateClause<T extends object> = AndClause<T> | OrClause<T>;

export type Where<M extends object> = WhereClause<M> | AggregateClause<M>;
