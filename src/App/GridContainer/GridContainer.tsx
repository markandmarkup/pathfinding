import * as React from 'react';
import GridSquare from './GridSquare/GridSquare';
import './GridContainer.css';

interface GridContainerProps {
    rows: number;
    cols: number;
}

interface GridContainerState {
    rows: number;
    cols: number;
    gridArray: Array<string>;
}

export default class GridContainer extends React.Component<GridContainerProps, GridContainerState>
{
    constructor(props) {
        super(props);

        const cols = this.props.cols;
        const rows = this.props.rows;
        const gridArray = new Array(cols * rows).fill('neutral');

        this.state = {
            "cols": this.props.cols,
            "rows": this.props.rows,
            "gridArray": gridArray
        }
    }

    // renderSquares(cols: number, rows: number) {
    //     const arrayInit = Array(cols * rows);
    //     const blocktypeArray = arrayInit.map()
        
    // }

    render() {
        return (
            <div className="gridContainer">
                {this.state.gridArray.map((blockType, index) => (
                    <GridSquare key={ index } blockType={ blockType } size={ Math.floor((600 / this.state.cols) - 2) }/>
                ))
                }
            </div>
        )
    }
}