import { convertArrayTo2D, convertArrayTo1D } from './Utils';

test('success test converting 1d array to 3x3 matrix', () => {
    const inputArray = [1,2,3,4,5,6,7,8,9];
    const cols = 3;
    const rows = 3;
    const expected = [[1,4,7],[2,5,8],[3,6,9]];
    expect(convertArrayTo2D(inputArray, cols, rows)).toStrictEqual(expected);
})

test('success test converting 2d array to 1d', () => {
    const inputArray = [[1,4,7],[2,5,8],[3,6,9]];
    const expected = [1,2,3,4,5,6,7,8,9];
    expect(convertArrayTo1D(inputArray)).toStrictEqual(expected);
})
