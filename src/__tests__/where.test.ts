import {expect} from 'chai';
import {Where, WhereBuilder} from '..';
import {User} from './test-helper';

describe('where builder', () => {
  it('creates eq condition', () => {
    const expected: Where<User> = {
      friends: 1,
      name: 'John',
      department: 'faculty',
    };
    const wb = new WhereBuilder<User>({friends: 1});
    wb.eq('name', 'John');
    wb.eq('department', 'faculty');
    const result = wb.build();
    expect(result).to.eql(expected);
  });
});

describe('misc', () => {
  it('combines where on same property', () => {
    const expected: Where<User> = {
      and: [{friends: 1}, {friends: 2}],
    };
    const wb = new WhereBuilder<User>();
    wb.eq('friends', 1);
    wb.eq('friends', 2);
    const result = wb.build();
    expect(result).to.eql(expected);
  });
});
