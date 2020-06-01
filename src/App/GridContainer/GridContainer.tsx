import * as React from 'react';

export default class GridContainer extends React.Component
{
    state = {
        "cols": 5,
        "rows": 5,
        "gridArray": []
    }

    renderSquares(cols: number, rows: number) {
        const squareArray = Array.from(Array(cols), () => new Array(rows));
        
    }

    render() {
        return (
            <div className="gridContainer">
                
            </div>
        )
    }
}