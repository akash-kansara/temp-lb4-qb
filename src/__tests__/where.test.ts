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
  it('creates neq condition', () => {
    const expected: Where<User> = {
      name: {neq: 'Davis'},
      department: {neq: 'student'},
    };
    const wb = new WhereBuilder<User>();
    wb.neq('name', 'Davis');
    wb.neq('department', 'student');
    const result = wb.build();
    expect(result).to.eql(expected);
  });
  it('creates gt condition', () => {
    const dob = new Date();
    const expected: Where<User> = {
      friends: {gt: 1},
      dob: {gt: dob},
    };
    const wb = new WhereBuilder<User>();
    wb.gt('friends', 1);
    wb.gt('dob', dob);
    const result = wb.build();
    expect(result).to.eql(expected);
  });
  it('creates gte condition', () => {
    const dob = new Date();
    const expected: Where<User> = {
      friends: {gte: 1},
      dob: {gte: dob},
    };
    const wb = new WhereBuilder<User>();
    wb.gte('friends', 1);
    wb.gte('dob', dob);
    const result = wb.build();
    expect(result).to.eql(expected);
  });
  it('creates lt condition', () => {
    const dob = new Date();
    const expected: Where<User> = {
      friends: {lt: 1},
      dob: {lt: dob},
    };
    const wb = new WhereBuilder<User>();
    wb.lt('friends', 1);
    wb.lt('dob', dob);
    const result = wb.build();
    expect(result).to.eql(expected);
  });
  it('creates lte condition', () => {
    const dob = new Date();
    const expected: Where<User> = {
      friends: {lte: 1},
      dob: {lte: dob},
    };
    const wb = new WhereBuilder<User>();
    wb.lte('friends', 1);
    wb.lte('dob', dob);
    const result = wb.build();
    expect(result).to.eql(expected);
  });
  it('creates inq condition', () => {
    const expected: Where<User> = {
      department: {inq: ['faculty', 'student']},
      tag: {inq: ['tag1', 'tag2']},
    };
    const wb = new WhereBuilder<User>();
    wb.inq('department', ['faculty', 'student']);
    wb.inq('tag', ['tag1', 'tag2']);
    const result = wb.build();
    expect(result).to.eql(expected);
  });
  it('creates nin condition', () => {
    const expected: Where<User> = {
      department: {nin: ['faculty', 'student']},
      tag: {nin: ['tag1', 'tag2']},
    };
    const wb = new WhereBuilder<User>();
    wb.nin('department', ['faculty', 'student']);
    wb.nin('tag', ['tag1', 'tag2']);
    const result = wb.build();
    expect(result).to.eql(expected);
  });
  it('creates between condition', () => {
    const lowDate = new Date('1990-01-01');
    const highDate = new Date();
    const expected: Where<User> = {
      dob: {between: [lowDate, highDate]},
      friends: {between: [1, 5]},
    };
    const wb = new WhereBuilder<User>();
    wb.between('dob', lowDate, highDate);
    wb.between('friends', 1, 5);
    const result = wb.build();
    expect(result).to.eql(expected);
  });
  it('creates exists condition', () => {
    const expected: Where<User> = {
      tag: {exists: true},
      photoUrl: {exists: false},
    };
    const wb = new WhereBuilder<User>();
    wb.exists('tag');
    wb.exists('photoUrl', false);
    const result = wb.build();
    expect(result).to.eql(expected);
  });
  it('creates like condition', () => {
    const expected: Where<User> = {
      name: {like: 'John'},
      tag: {like: 'tag1'},
    };
    const wb = new WhereBuilder<User>();
    wb.like('name', 'John');
    wb.like('tag', 'tag1');
    const result = wb.build();
    expect(result).to.eql(expected);
  });
  it('creates nlike condition', () => {
    const expected: Where<User> = {
      name: {nlike: 'John'},
      tag: {nlike: 'tag1'},
    };
    const wb = new WhereBuilder<User>();
    wb.nlike('name', 'John');
    wb.nlike('tag', 'tag1');
    const result = wb.build();
    expect(result).to.eql(expected);
  });
  it('creates ilike condition', () => {
    const expected: Where<User> = {
      name: {ilike: 'John'},
      tag: {ilike: 'tag1'},
    };
    const wb = new WhereBuilder<User>();
    wb.ilike('name', 'John');
    wb.ilike('tag', 'tag1');
    const result = wb.build();
    expect(result).to.eql(expected);
  });
  it('creates nilike condition', () => {
    const expected: Where<User> = {
      name: {nilike: 'John'},
      tag: {nilike: 'tag1'},
    };
    const wb = new WhereBuilder<User>();
    wb.nilike('name', 'John');
    wb.nilike('tag', 'tag1');
    const result = wb.build();
    expect(result).to.eql(expected);
  });
  it('creates regexp condition', () => {
    const expected: Where<User> = {
      name: {regexp: 'Davis'},
      tag: {regexp: new RegExp('tag', 'i')},
    };
    const wb = new WhereBuilder<User>();
    wb.regexp('name', 'Davis');
    wb.regexp('tag', /tag/i);
    const result = wb.build();
    expect(result).to.eql(expected);
  });
  it('creates and condition', () => {
    const dob = new Date();
    const expected1: Where<User> = {
      and: [{friends: 3}, {dob: {gt: dob}}],
    };
    const expected2: Where<User> = {
      and: [{friends: 3}],
    };
    const wb1 = new WhereBuilder<User>();
    const wb2 = new WhereBuilder<User>();
    wb1.and([{friends: 3}, {dob: {gt: dob}}]);
    wb2.and({friends: 3});
    const result1 = wb1.build();
    const result2 = wb2.build();
    expect(result1).to.eql(expected1);
    expect(result2).to.eql(expected2);
  });
  it('creates or condition', () => {
    const dob = new Date();
    const expected1: Where<User> = {
      or: [{friends: 3}, {dob: {gt: dob}}],
    };
    const expected2: Where<User> = {
      or: [{friends: 3}],
    };
    const wb1 = new WhereBuilder<User>();
    const wb2 = new WhereBuilder<User>();
    wb1.or([{friends: 3}, {dob: {gt: dob}}]);
    wb2.or({friends: 3});
    const result1 = wb1.build();
    const result2 = wb2.build();
    expect(result1).to.eql(expected1);
    expect(result2).to.eql(expected2);
  });
  it('imposes where clause', () => {
    const dob = new Date();
    const expected: Where<User> = {
      name: 'John',
      dob,
    };
    const wb = new WhereBuilder<User>();
    wb.eq('name', 'John');
    wb.impose({dob});
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
  it('clears where store', () => {
    const expected: Where<User> = {};
    const wb = new WhereBuilder<User>();
    wb.eq('friends', 1);
    wb.eq('friends', 2);
    wb.clear();
    const result = wb.build();
    expect(result).to.eql(expected);
  });
  it('uses chainable interaface', () => {
    const expected: Where<User> = {
      department: 'faculty',
    };
    const wb = new WhereBuilder<User>();
    wb.eq('friends', 1).eq('friends', 2).clear();
    wb.eq('department', 'faculty');
    const result = wb.build();
    expect(result).to.eql(expected);
  });
  it('builds complex where - 1', () => {
    const dob = new Date();
    const expected: Where<User> = {
      name: {like: 'John'},
      dob: {gte: dob},
      and: [{department: {neq: 'student'}, tag: {inq: ['tag1']}}],
    };
    const wb = new WhereBuilder<User>();
    wb.gt('friends', 1);
    wb.clear();
    const result = wb
      .impose({name: {like: 'John'}})
      .gte('dob', dob)
      .and([{department: {neq: 'student'}, tag: {inq: ['tag1']}}])
      .build();
    expect(result).to.eql(expected);
  });
  it('builds complex where - 2', () => {
    const dob = new Date();
    const expected: Where<User> = {
      name: {regexp: /davis/i},
      dob: {lt: dob},
      photoUrl: {exists: true},
    };
    const wb = new WhereBuilder<User>();
    wb.gt('friends', 1);
    wb.clear();
    wb.impose({name: {like: 'John'}})
      .gte('dob', dob)
      .and([{department: {neq: 'student'}, tag: {inq: ['tag1']}}]);
    wb.clear();
    const result = wb
      .impose({dob: {lt: dob}})
      .regexp('name', new RegExp('davis', 'i'))
      .exists('photoUrl', true)
      .build();
    expect(result).to.eql(expected);
  });
});
