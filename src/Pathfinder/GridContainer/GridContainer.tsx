import * as React from 'react';
import GridSquare from './GridSquare/GridSquare';
import './GridContainer.css';

interface GridContainerProps {
    rows: number;
    cols: number;
    gridArray: Array<string>;
    handleClick: Function;
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

        this.state = {
            "cols": this.props.cols,
            "rows": this.props.rows,
            "gridArray": this.props.gridArray,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                cols: this.props.cols,
                rows: this.props.rows,
                gridArray: this.props.gridArray
            });
        }
    }

    render() {
        return (
            <div className="gridContainer">
                {this.state.gridArray.map((blockType, index) => (
                    <GridSquare 
                        key={ index } 
                        index={ index } 
                        blockType={ blockType } 
                        size={ Math.floor(600 / this.state.cols) }
                        handleClick={ this.props.handleClick }/>
                ))
                }
            </div>
        )
    }
}