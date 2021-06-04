import {Filter, Where} from '../types';

export class WhereStore<M extends object> {
  store: Where<M>;

  constructor(w?: Where<M>) {
    this.store = w ?? {};
  }

  add(w: Where<M>) {
    for (const k of Object.keys(w)) {
      if (k in this.store) {
        this.store = {and: [this.store, w]};
        return;
      }
    }
    this.store = Object.assign(this.store, w);
  }

  clear() {
    this.store = {};
  }
}

export class FilterStore<M extends object> {
  store: Filter<M>;

  constructor(f?: Filter<M>) {
    this.store = f ?? {};
  }

  add(f: Filter<M>) {
    this.store = Object.assign(this.store, f);
  }

  clear() {
    this.store = {};
  }
}
