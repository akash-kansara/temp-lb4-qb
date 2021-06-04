import {Where} from '../types';

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
}
