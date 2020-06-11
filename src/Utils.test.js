import { convertArrayTo2D, convertArrayTo1D, pathfinder1 } from './Utils';

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

test('success test pathfinder1 diagonal route', () => {
    const inputArray = [
        ["neutral","start","neutral","neutral"],
        ["neutral","neutral","neutral","neutral"],
        ["neutral","neutral","neutral","neutral"],
        ["neutral","neutral","neutral","end"]
    ];
    const start = [0,1];
    const end = [3,3];
    const expected = [
        ["neutral","pathRight","neutral","neutral"],
        ["neutral","pathRight","neutral","neutral"],
        ["neutral","pathDown","pathRight","neutral"],
        ["neutral","neutral","pathDown","end"]
    ];
    expect(pathfinder1(inputArray, start, end)).toStrictEqual(expected);
})

test('success test pathfinder1 straight x axis route', () => {
    const inputArray = [
        ["neutral","neutral","neutral","neutral"],
        ["neutral","neutral","start","neutral"],
        ["neutral","neutral","neutral","neutral"],
        ["neutral","neutral","end","neutral"]
    ];
    const start = [1,2];
    const end = [3,2];
    const expected = [
        ["neutral","neutral","neutral","neutral"],
        ["neutral","neutral","pathRight","neutral"],
        ["neutral","neutral","pathRight","neutral"],
        ["neutral","neutral","end","neutral"]
    ]
    expect(pathfinder1(inputArray, start, end)).toStrictEqual(expected);
})

test('success test pathfinder1 negative uneven diagonal route', () => {
    const inputArray = [
        ["end","neutral","neutral","neutral"],
        ["neutral","neutral","neutral","neutral"],
        ["neutral","neutral","neutral","start"],
        ["neutral","neutral","neutral","neutral"]
    ];
    const start = [2,3];
    const end = [0,0];
    const expected = [
        ["end","pathUp","neutral","neutral"],
        ["neutral","pathLeft","pathUp","neutral"],
        ["neutral","neutral","pathLeft","pathUp"],
        ["neutral","neutral","neutral","neutral"]
    ]
    expect(pathfinder1(inputArray, start, end)).toStrictEqual(expected);
})