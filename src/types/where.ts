import {Property} from './base';

export type PropertyClause<T> = {
  eq?: T;
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
