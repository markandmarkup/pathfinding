import { convertArrayTo2D } from './Utils';

const inputArray = [1,2,3,4,5,6,7,8,9];
const cols = 3;
const rows = 3;
const expected = [[1,4,7],[2,5,8],[3,6,9]];

test('success test converting 1d array to 3x3 matrix', () => {
    expect(convertArrayTo2D(inputArray, cols, rows)).toStrictEqual(expected);
})