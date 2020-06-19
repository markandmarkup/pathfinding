import { pathfinder1 } from './Pathfinder1';

test('success test pathfinder1 diagonal route', () => {
    const inputArray = [
        ["neutral","start","neutral","neutral"],
        ["neutral","neutral","neutral","neutral"],
        ["neutral","neutral","neutral","neutral"],
        ["neutral","neutral","neutral","end"]
    ];
    const start = [0,1];
    const end = [3,3];
    const expected = {
        success: true,
        resultArray: [
            ["neutral","pathRight","neutral","neutral"],
            ["neutral","pathRight","neutral","neutral"],
            ["neutral","pathDown","pathRight","neutral"],
            ["neutral","neutral","pathDown","end"]
        ],
        pathCount: 1,
        attemptCount: 1
    };
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
    const expected = {
        success: true,
        resultArray: [
            ["neutral","neutral","neutral","neutral"],
            ["neutral","neutral","pathRight","neutral"],
            ["neutral","neutral","pathRight","neutral"],
            ["neutral","neutral","end","neutral"]
        ],
        pathCount: 1,
        attemptCount: 1
    };
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
    const expected = {
        success: true,
        resultArray: [
            ["end","pathUp","neutral","neutral"],
            ["neutral","pathLeft","pathUp","neutral"],
            ["neutral","neutral","pathLeft","pathUp"],
            ["neutral","neutral","neutral","neutral"]
        ],
        pathCount: 1,
        attemptCount: 1
    };
    expect(pathfinder1(inputArray, start, end)).toStrictEqual(expected);
})