import {expect} from 'chai';
import {add} from '../';

describe('add tests', () => {
  it('adds 2 numbers', () => {
    const result = add(1, 2);
    expect(result).to.eql(3);
  });
  it('adds 1 +ve & 1 -ve numbers', () => {
    const result = add(1, -1);
    expect(result).to.eql(0);
  });
});
