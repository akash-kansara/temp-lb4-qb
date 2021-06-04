import {Where, Property} from '../types';
import {WhereStore} from './store';

export class WhereBuilder<M extends object> {
  private where: WhereStore<M>;

  constructor(w?: Where<M>) {
    this.where = new WhereStore(w);
  }

  eq<P extends Property<M>>(prop: P, value: M[P]) {
    this.where.add({[prop]: value});
  }

  build() {
    return this.where.store;
  }
}
