import {Where, Property, Filter, Fields, SortOrder, Inclusion} from '../types';
import {FilterStore} from './store';

export class FilterBuilder<M extends object> {
  private filter: FilterStore<M>;

  constructor(f?: Filter<M>) {
    this.filter = new FilterStore(f);
  }

  where(w: Where<M>) {
    this.filter.add({where: w});
    return this;
  }

  fields<P extends Property<M>>(prop: P, value: boolean) {
    let fields: Fields<M> = {};
    fields[prop] = value;
    if (this.filter.store.fields) {
      fields = Object.assign(this.filter.store.fields, fields);
    }
    this.filter.add({fields});
    return this;
  }

  order<P extends Property<M>>(prop: P, value: SortOrder = 'ASC') {
    const orders = this.filter.store.order ?? [];
    let idx = -1;
    orders.forEach((order, i) => {
      if (order.startsWith(prop)) {
        idx = i;
      }
    });
    if (idx > -1) {
      orders.splice(idx, 1);
    }
    orders.push(`${prop} ${value}`);
    this.filter.add({order: orders});
    return this;
  }

  limit(l: number) {
    this.filter.add({limit: l});
    return this;
  }

  offset(o: number) {
    this.filter.add({offset: o});
    return this;
  }

  skip(s: number) {
    return this.offset(s);
  }

  include(i: Inclusion | string) {
    const includes = this.filter.store.include ?? [];
    if (typeof i === 'string') {
      includes.push({relation: i});
    } else {
      includes.push(i);
    }
    this.filter.add({include: includes});
    return this;
  }

  impose(f: Filter<M>) {
    this.filter.add(f);
    return this;
  }

  clear() {
    this.filter.clear();
    return this;
  }

  build() {
    return this.filter.store;
  }
}
