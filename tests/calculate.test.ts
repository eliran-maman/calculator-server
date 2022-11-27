import {calculate} from '../src/calculator/calculate'

describe('Test Calculator', () => {
    test('5+5*4', () => {
        expect(calculate('5+5*4')).toBe(25);
    });

    test('5*5+4', () => {
        expect(calculate('5*5+4')).toBe(29);
    });

    test('(5+5)*4', () => {
        expect(calculate('(5+5)*4')).toBe(40);
    });

    test('(5+5/(2*2-3))-1', () => {
        expect(calculate('(5+5/(2*2-3))-1')).toBe(9);
    });

    test('(5+5/(2*2-3)-1', () => {
        expect(() => calculate('(5+5/(2*2-3)-1')).toThrowError();
    });

    test('(5+5/(2*2-3)-1', () => {
        expect(() => calculate('(5+5/(2*2-3))-1^1')).toThrowError();
    });

    test('(5+5/(2*2-3)-1', () => {
        expect(() => calculate('abc')).toThrowError();
    });

    test('()', () => {
        expect(() => calculate('()')).toThrowError();
    });

    test('', () => {
        expect(() => calculate('')).toThrowError();
    });
});