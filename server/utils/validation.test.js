const expect = require('expect');

const {isRealString} = require('./validation');

console.log(isRealString('flop'));

describe('isRealString', () => {
    it('should reject non-string values', () => {
        let nonstring ='';
        expect(isRealString(nonstring)).toBe(false);
    });

    it('should reject strings with only spaces', () => {
        let spaces = '    ';
        expect(isRealString(spaces)).toBe(false);
    });
    
    it('should allow string with spaces between words', () => {
        let res = isRealString('   hellothere   ');
        expect(res).toBe(true);
    });
});