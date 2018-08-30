const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Aaron',
            room: 'Node course'
        }, {
            id: '2',
            name: 'Louis',
            room: 'React course'
        }, {
            id: '3',
            name: 'Helene',
            room: 'Node course'
        }]
    });

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'aaron',
            room: 'helloRoom'
        };
        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        let userId = '1';
        let user = users.removeUser(userId);

        expect(user.id).toBe(userId);

        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        let userId = '99';
        let user = users.removeUser(userId);

        expect(user).toBe(undefined);

        expect(users.users.length).toBe(3);
    }); 

    it('should find a user', () => {
        let userId = '2';
        let user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find a user', () => {
        let userId = '99';
        let user = users.getUser(userId);

        expect(user).toBe(undefined);
    });

    it('should return names for Node course', () => {
        let userList = users.getUserList('Node course');

        expect(userList).toEqual(['Aaron', 'Helene']);
    });

    it('should return names for React course', () => {
        let userList = users.getUserList('React course');

        expect(userList).toEqual(['Louis']);
    });
});