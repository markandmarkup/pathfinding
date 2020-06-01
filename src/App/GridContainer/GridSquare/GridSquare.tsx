import * as React from 'react';
import './GridSquare.css';

interface GridSquareProps {
    size: number;
    blockType: string;
}

export default class GridSquare extends React.Component<GridSquareProps>
{
    state = {
        //squares can be one of eight block types: neutral, start, end, block,
        // pathUp, pathRight, pathDown, pathLeft
        "blockType": this.props.blockType
    }

    render() {
        return (
            <div className="gridSquare" style={{width: this.props.size + "px", height: this.props.size + "px"}}>
                
            </div>
        )
    }
}