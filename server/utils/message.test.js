const expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        let from = 'aaron';
        let text = 'flop';
        let message = generateMessage(from, text);

        expect(message).toMatchObject({from, text});
        expect(typeof message.createdAt).toBe('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let lat = 45.000000;
        let lng = -12.0000000;
        let from = 'aaron';

        let message = generateLocationMessage(from, lat, lng);

        expect(message).toMatchObject({
            from,
            url: `https://www.google.com/maps?q=${lat},${lng}`
        });
        expect(typeof message.createdAt).toBe('number');
    });
});