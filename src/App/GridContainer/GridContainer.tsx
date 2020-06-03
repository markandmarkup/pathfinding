import * as React from 'react';
import GridSquare from './GridSquare/GridSquare';
import './GridContainer.css';
import { convertArrayTo2D } from '../../Utils';

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

        const gridArray = new Array(this.props.cols * this.props.rows).fill('neutral');

        this.state = {
            "cols": this.props.cols,
            "rows": this.props.rows,
            "gridArray": gridArray
        }

        console.log(convertArrayTo2D(gridArray, this.state.cols, this.state.rows));
    }
    
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