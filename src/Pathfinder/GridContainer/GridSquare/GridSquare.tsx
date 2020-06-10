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
        //squares can be one of nine block types: neutral, start, end, block,
        // pathUp, pathRight, pathDown, pathLeft, deadEnd
        "blockType": this.props.blockType,
        "index": this.props.index
    }

    translateBlockType = {
        "neutral"   : "",
        "start"     : "Start",
        "end"       : "End",
        "block"     : "X",
        "pathUp"    : "&#8679;",
        "pathRight" : "&#8680;",
        "pathDown"  : "&#8681;",
        "pathLeft"  : "&#8678;",
        "deadEnd"   : "&#8856;"
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
                onClick={() => this.props.handleClick(this.state.index)}
                dangerouslySetInnerHTML={{__html: this.translateBlockType[`${this.state.blockType}`]}}>
            </div>
        )
    }
}