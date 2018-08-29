const expect = require('expect');

let {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        let from = 'aaron';
        let text = 'flop';
        let message = generateMessage(from, text);

        expect(message).toMatchObject({from, text});
        expect(typeof message.createdAt).toBe('number');
    });
});