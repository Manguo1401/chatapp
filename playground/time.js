const moment = require('moment');

let date = moment();
date.add(1, 'years').subtract(8, 'months');
console.log(date.format('MMM Do, YYYY'));

console.log(date.format('h:mm a'));
let timeStamp = moment().valueOf();
console.log(timeStamp);

let createdAt = 12345;
let date2 = moment(createdAt);
console.log(date2.format('h:mm a'));