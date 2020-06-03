

export const convertArrayTo2D = (inputArray: Array<any>, cols: number, rows: number) : Array<any> => {
    let output = new Array(cols).fill('');
    output = output.map(i => new Array(rows).fill(''));

    inputArray.forEach((item, index) => {
        let x = index % cols;
        let y = Math.floor(index / cols);
        output[x][y] = item;
    })
    return output;
}