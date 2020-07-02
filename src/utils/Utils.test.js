import { convertArrayTo2D, convertArrayTo1D, calculateStraightLine } from './Utils';

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