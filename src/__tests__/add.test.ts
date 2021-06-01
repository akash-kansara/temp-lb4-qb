import {expect} from 'chai';
import {add} from '../';

describe('add tests', () => {
  it('adds 2 numbers', () => {
    const result = add(1, 2);
    expect(result).to.eql(3);
  });
});
