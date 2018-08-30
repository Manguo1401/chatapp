/* [{
    id: '/#2135678',
    name: 'Aaron',
    room: 'The office fans'
}] */

// addUser(id, name, room);
// removeUser(id)
// getUser(id)
// getUserList(room)

// ES6 syntax
class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        let user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }
    getUser(id) {
        let user = this.users.filter((user) => user.id === id)[0];
        return user;
    }
    getUserList(room) {
        let users = this.users.filter((user) => user.room === room);
        let namesArray = users.map((user) => user.name);

        return namesArray;
    }
}


module.exports = {Users};
/* class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getUserDescription() {
        return `${this.name} is ${this.age} years old`
    }
}

let me = new Person("Aaron", 29);
let description = me.getUserDescription();
console.log(description)
 */