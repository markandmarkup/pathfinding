import * as React from 'react';
import './GridSquare.css';

interface GridSquareProps {
    size: number;
    blockType: string;
    index: number;
    handleClick: Function;
}

export default class GridSquare extends React.Component<GridSquareProps>
{
    state = {
        //squares can be one of eight block types: neutral, start, end, block,
        // pathUp, pathRight, pathDown, pathLeft
        "blockType": this.props.blockType,
        "index": this.props.index
    }

    componentDidUpdate(prevProps) {
        if (this.props.blockType !== prevProps.blockType) {
            this.setState({
                blockType: this.props.blockType
            });
        }
    }

    render() {
        return (
            <div className={`gridSquare ${this.state.blockType}`}
                style={{width: this.props.size + "px", height: this.props.size + "px"}}
                onClick={() => this.props.handleClick(this.state.index)}>
                    { this.state.blockType }
            </div>
        )
    }
}