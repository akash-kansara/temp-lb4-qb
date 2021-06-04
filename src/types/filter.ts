import {AnyObject, Property} from './base';
import {Where} from './where';

export type SortOrder = 'ASC' | 'DESC';

export type Fields<M extends object> = {[P in Property<M>]?: boolean};

export type Inclusion = {relation: string; scope?: Filter<AnyObject>};

export type Filter<M extends object> = {
  where?: Where<M>;
  fields?: Fields<M>;
  order?: string[];
  limit?: number;
  offset?: number;
  skip?: number;
  include?: Inclusion[];
};

export type FilterExcludingWhere<M extends object> = Omit<Filter<M>, 'where'>;
