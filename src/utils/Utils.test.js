import { convertArrayTo2D, 
    convertArrayTo1D, 
    calculateStraightLine,
    convertStraightLineDiagonalsUpper } from './Utils';

test('Success test converting 1d array to 3x3 matrix', () => {
    const inputArray = [1,2,3,4,5,6,7,8,9];
    const cols = 3;
    const rows = 3;
    const expected = [[1,4,7],[2,5,8],[3,6,9]];
    expect(convertArrayTo2D(inputArray, cols, rows)).toStrictEqual(expected);
})

test('Success test converting 2d array to 1d', () => {
    const inputArray = [[1,4,7],[2,5,8],[3,6,9]];
    const expected = [1,2,3,4,5,6,7,8,9];
    expect(convertArrayTo1D(inputArray)).toStrictEqual(expected);
})

test('Success test calculateStraightLine static x axis', () => {
    const start = [2,1];
    const end = [2,5];
    const expected = [[2,1], [2,2], [2,3], [2,4], [2,5]];

    expect(calculateStraightLine(start, end)).toStrictEqual(expected);
})

test('Success test calculateStraightLine static y axis', () => {
    const start = [3,5];
    const end = [6,5];
    const expected = [[3,5], [4,5], [5,5], [6,5]];

    expect(calculateStraightLine(start, end)).toStrictEqual(expected);
})

test('Success test calculateStraightLine static x axis negative mvt', () => {
    const start = [1,4];
    const end = [1,0];
    const expected = [[1,4], [1,3], [1,2], [1,1], [1,0]];

    expect(calculateStraightLine(start, end)).toStrictEqual(expected);
})

test('Success test calculateStraightLine static y axis negative mvt', () => {
    const start = [6,4];
    const end = [4,4];
    const expected = [[6,4], [5,4], [4,4]];

    expect(calculateStraightLine(start, end)).toStrictEqual(expected);
})

test('Success test calculateStraightLine diagonal 4x3 positive mvt', () => {
    const start = [2,2];
    const end = [5,4];
    const expected = [[2,2], [3,3], [4,3], [5,4]];

    expect(calculateStraightLine(start, end)).toStrictEqual(expected);
})

test('Success test calculateStraightLine diagonal 2x5 positive mvt', () => {
    const start = [0,1];
    const end = [1,5];
    const expected = [[0,1], [0,2], [0,3], [1,4], [1,5]];

    expect(calculateStraightLine(start, end)).toStrictEqual(expected);
})

test('Success test calculateStraightLine diagonal 6x2 negative mvt', () => {
    const start = [5,2];
    const end = [0,1];
    const expected = [[5,2], [4,2], [3,2], [2,1], [1,1], [0,1]];

    expect(calculateStraightLine(start, end)).toStrictEqual(expected);
})

test('Success test calculateStraightLine diagonal 3x4 negative mvt', () => {
    const start = [5,5];
    const end = [3,2];
    const expected = [[5,5], [4,4], [4,3], [3,2]];

    expect(calculateStraightLine(start, end)).toStrictEqual(expected);
})
