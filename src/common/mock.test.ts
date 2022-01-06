import {sum} from './mock';

describe('first test of simple function', () =>
{
    test('sum 2 + 2', () => {
        expect(sum(2, 2)).toEqual(4);
    });
});