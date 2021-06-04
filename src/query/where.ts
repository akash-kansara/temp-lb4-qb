import {Where, Property} from '../types';
import {WhereStore} from './store';

export class WhereBuilder<M extends object> {
  private where: WhereStore<M>;

  constructor(w?: Where<M>) {
    this.where = new WhereStore(w);
  }

  eq<P extends Property<M>>(prop: P, value: M[P]) {
    this.where.add({[prop]: value});
    return this;
  }

  neq<P extends Property<M>>(prop: P, value: M[P]) {
    this.where.add({[prop]: {neq: value}});
    return this;
  }

  gt<P extends Property<M>>(prop: P, value: M[P]) {
    this.where.add({[prop]: {gt: value}});
    return this;
  }

  gte<P extends Property<M>>(prop: P, value: M[P]) {
    this.where.add({[prop]: {gte: value}});
    return this;
  }

  lt<P extends Property<M>>(prop: P, value: M[P]) {
    this.where.add({[prop]: {lt: value}});
    return this;
  }

  lte<P extends Property<M>>(prop: P, value: M[P]) {
    this.where.add({[prop]: {lte: value}});
    return this;
  }

  inq<P extends Property<M>>(prop: P, value: M[P][]) {
    this.where.add({[prop]: {inq: value}});
    return this;
  }

  nin<P extends Property<M>>(prop: P, value: M[P][]) {
    this.where.add({[prop]: {nin: value}});
    return this;
  }

  between<P extends Property<M>>(prop: P, value1: M[P], value2: M[P]) {
    this.where.add({[prop]: {between: [value1, value2]}});
    return this;
  }

  exists<P extends Property<M>>(prop: P, value = true) {
    this.where.add({[prop]: {exists: value}});
    return this;
  }

  like<P extends Property<M>>(prop: P, value: M[P]) {
    this.where.add({[prop]: {like: value}});
    return this;
  }

  nlike<P extends Property<M>>(prop: P, value: M[P]) {
    this.where.add({[prop]: {nlike: value}});
    return this;
  }

  ilike<P extends Property<M>>(prop: P, value: M[P]) {
    this.where.add({[prop]: {ilike: value}});
    return this;
  }

  nilike<P extends Property<M>>(prop: P, value: M[P]) {
    this.where.add({[prop]: {nilike: value}});
    return this;
  }

  regexp<P extends Property<M>>(prop: P, value: string | RegExp) {
    this.where.add({[prop]: {regexp: value}});
    return this;
  }

  and(w: Where<M> | Where<M>[]) {
    const ands = Array.isArray(w) ? w : [w];
    this.where.add({and: ands});
    return this;
  }

  or(w: Where<M> | Where<M>[]) {
    const ors = Array.isArray(w) ? w : [w];
    this.where.add({or: ors});
    return this;
  }

  impose(w: Where<M>) {
    this.where.add(w);
    return this;
  }

  clear() {
    this.where.clear();
    return this;
  }

  build() {
    return this.where.store;
  }
}
