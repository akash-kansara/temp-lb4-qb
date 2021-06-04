# LB4 Query Builder
[![Build Status](https://travis-ci.com/sf-kansara/temp-lb4-qb.svg?branch=master)](https://travis-ci.com/sf-kansara/temp-lb4-qb.svg)
[![Coverage Status](https://coveralls.io/repos/github/sf-kansara/temp-lb4-qb/badge.svg?branch=master)](https://coveralls.io/github/sf-kansara/temp-lb4-qb?branch=master)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=sf-kansara_temp-lb4-qb&metric=alert_status)](https://sonarcloud.io/dashboard?id=sf-kansara_temp-lb4-qb)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/sf-kansara/temp-lb4-qb.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/sf-kansara/temp-lb4-qb/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/sf-kansara/temp-lb4-qb.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/sf-kansara/temp-lb4-qb/context:javascript)

### Query Builder for LB4 Filters

Example:
```ts

import {FilterBuilder, WhereBuilder} from PACKAGE_NAME;

interface User {
  name: string;
  dob: Date;
  department: 'student' | 'faculty';
  active: boolean;
  photoUrl?: string;
  tag: string;
  friends: number;
}

const wb = WhereBuilder<User>();
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
console.log(result);
/* Output:
{
  name: {regexp: /davis/i},
  dob: {lt: dob},
  photoUrl: {exists: true},
}
*/

const fb = new FilterBuilder<User>();
fb.where({friends: 1});
fb.clear();
fb.impose({where: {name: {like: 'John'}}})
  .skip(100)
  .clear();
wb.clear();
wb.regexp('name', new RegExp('davis', 'i')).exists('photoUrl');
const result = fb
  .order('department', 'DESC')
  .impose({
    where: wb.build(),
  })
  .order('department')
  .include('departments')
  .offset(10)
  .build();
console.log(result);
/* Output:
{
  where: {name: {regexp: /davis/i}, photoUrl: {exists: true}},
  order: ['department ASC'],
  include: [{relation: 'departments'}],
  offset: 10,
}
*/

```
