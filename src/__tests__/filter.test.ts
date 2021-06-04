import {expect} from 'chai';
import {WhereBuilder, Filter, FilterBuilder} from '..';
import {User} from './test-helper';

describe('filter builder', () => {
  it('creates where filter', () => {
    const expected: Filter<User> = {
      where: {friends: 1, name: 'John', department: 'faculty'},
    };
    const fb = new FilterBuilder<User>({where: {friends: 1}});
    fb.where({
      friends: 1,
      name: 'John',
      department: 'faculty',
    });
    const result = fb.build();
    expect(result).to.eql(expected);
  });
  it('creates fields filter', () => {
    const expected: Filter<User> = {
      fields: {
        active: true,
        department: false,
      },
    };
    const fb = new FilterBuilder<User>();
    fb.fields('active', true);
    fb.fields('department', false);
    const result = fb.build();
    expect(result).to.eql(expected);
  });
  it('creates order filter', () => {
    const expected: Filter<User> = {
      order: ['dob ASC', 'active DESC'],
    };
    const fb = new FilterBuilder<User>();
    fb.order('dob');
    fb.order('active', 'DESC');
    const result = fb.build();
    expect(result).to.eql(expected);
  });
  it('creates limit filter', () => {
    const expected: Filter<User> = {
      limit: 5,
    };
    const fb = new FilterBuilder<User>();
    fb.limit(5);
    const result = fb.build();
    expect(result).to.eql(expected);
  });
  it('creates offset filter', () => {
    const expected: Filter<User> = {
      offset: 10,
    };
    const fb = new FilterBuilder<User>();
    fb.offset(10);
    const result = fb.build();
    expect(result).to.eql(expected);
  });
  it('creates skip filter', () => {
    const expected: Filter<User> = {
      offset: 20,
    };
    const fb = new FilterBuilder<User>();
    fb.skip(20);
    const result = fb.build();
    expect(result).to.eql(expected);
  });
  it('creates inclusion filter', () => {
    const expected: Filter<User> = {
      include: [
        {relation: 'photos'},
        {relation: 'departments', scope: {where: {name: 'student'}}},
      ],
    };
    const fb = new FilterBuilder<User>();
    fb.include('photos');
    fb.include({relation: 'departments', scope: {where: {name: 'student'}}});
    const result = fb.build();
    expect(result).to.eql(expected);
  });
  it('imposes filter', () => {
    const expected: Filter<User> = {
      where: {
        name: 'John',
      },
    };
    const fb = new FilterBuilder<User>();
    fb.where({department: 'faculty'});
    fb.impose({where: {name: 'John'}});
    const result = fb.build();
    expect(result).to.eql(expected);
  });
});

describe('misc', () => {
  it('clears where store', () => {
    const expected: Filter<User> = {};
    const fb = new FilterBuilder<User>();
    fb.where({friends: {gt: 1}});
    fb.clear();
    const result = fb.build();
    expect(result).to.eql(expected);
  });
  it('uses chainable interaface', () => {
    const expected: Filter<User> = {
      where: {
        department: 'faculty',
      },
      limit: 10,
    };
    const fb = new FilterBuilder<User>();
    fb.where({name: 'John'}).clear();
    fb.impose({where: {department: 'faculty'}}).limit(10);
    const result = fb.build();
    expect(result).to.eql(expected);
  });
  it('builds complex filter - 1', () => {
    const dob = new Date();
    const expected: Filter<User> = {
      where: {
        name: {like: 'John'},
        dob: {gte: dob},
      },
      offset: 30,
      limit: 10,
      fields: {
        active: true,
        department: false,
        name: true,
      },
    };
    const fb = new FilterBuilder<User>();
    const result = fb
      .where({name: 'Davis'})
      .fields('name', false)
      .clear()
      .impose({where: {name: {like: 'John'}, dob: {gte: dob}}})
      .skip(30)
      .limit(10)
      .fields('active', true)
      .fields('department', false)
      .fields('name', true)
      .build();
    expect(result).to.eql(expected);
  });
  it('builds complex where - 2', () => {
    const expected: Filter<User> = {
      where: {name: {regexp: /davis/i}, photoUrl: {exists: true}},
      order: ['department ASC'],
      include: [{relation: 'departments'}],
    };
    const fb = new FilterBuilder<User>();
    fb.where({friends: 1});
    fb.clear();
    fb.impose({where: {name: {like: 'John'}}})
      .skip(100)
      .clear();
    const wb = new WhereBuilder<User>();
    wb.regexp('name', new RegExp('davis', 'i')).exists('photoUrl');
    const result = fb
      .order('department', 'DESC')
      .impose({
        where: wb.build(),
      })
      .order('department')
      .include('departments')
      .build();
    expect(result).to.eql(expected);
  });
});
