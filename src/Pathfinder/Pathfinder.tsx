import React from 'react';
import './Pathfinder.css';
import GridContainer from './GridContainer/GridContainer';
import { convertArrayTo2D, pathfinder1, indexToXYArray, convertArrayTo1D, pathfinder2 } from '../Utils';

interface PathfinderState {
  cols: number;
  rows: number;
  gridBuildMode: string;
  gridArray: Array<string>;
  pathfinderInputGrid: Array<string>;
  userMessage: string;
}

class Pathfinder extends React.Component<{}, PathfinderState> 
{
  constructor(props) {
    super(props);

    const cols = 5;
    const rows = 5;
    const gridArray = new Array(cols * rows).fill('neutral');

    this.state = {
        "cols": cols,
        "rows": rows,
        "gridArray": gridArray,
        "gridBuildMode": "start",
        "pathfinderInputGrid": [],
        "userMessage": ""
    }
}

  setGridBuildMode = (blockType: string) : void => {
    this.setState({
      gridBuildMode: blockType
    });
  }

  updateGrid = (index) : void => {
    let updatedGridArray: Array<any> = this.state.gridArray;

    if (this.state.gridBuildMode === "start" || this.state.gridBuildMode === "end") {
        updatedGridArray = updatedGridArray.map((gridSquare) => {
            return gridSquare === this.state.gridBuildMode ? "neutral" : gridSquare;
        })
    }
    
    updatedGridArray[index] = this.state.gridBuildMode;

    this.setState({
        gridArray: updatedGridArray
    });
  }

  clearGrid = () : void => {
    this.setState({
      gridArray: new Array(this.state.cols * this.state.rows).fill('neutral')
    });
    return;
  }

  resetGrid = () : void => {
    if (this.state.pathfinderInputGrid.length === this.state.cols * this.state.rows) {
      this.setState({
        gridArray: this.state.pathfinderInputGrid
      });
    }
    return;
  }

  runPathfinder = (gridArray: Array<string>) : void => {
    if (gridArray.length !== this.state.rows * this.state.cols) {
      this.setState({
        userMessage: "Pathfinder received an array of incorrect length"
      })
      return;
    }

    if (gridArray.indexOf("start") === -1 || gridArray.indexOf("end") === -1) {
      this.setState({
        userMessage: "Grid must contain one 'start' and one 'end' square"
      })
      return;
    }

    const start = indexToXYArray(gridArray.indexOf("start"), this.state.cols);
    const end = indexToXYArray(gridArray.indexOf("end"), this.state.cols);

    const gridArray2d = convertArrayTo2D(gridArray, this.state.cols, this.state.rows);
    pathfinder2(gridArray2d, start, end);
    // const pathFinderResult2d = pathfinder1(gridArray2d, start, end);
    // const pathFinderResult = convertArrayTo1D(pathFinderResult2d);

    // this.setState({
    //   pathfinderInputGrid: gridArray,
    //   gridArray: pathFinderResult,
    //   userMessage: ""
    // })
    return;
  }

  render() { 
    return (
      <div className="pathfinder">
        <div className="gridBuildOptions">
          <input type="radio" id="gridBuildStart" name="gridBuildOptions" value="start" onClick={()=> this.setGridBuildMode("start")} defaultChecked/>
            <label htmlFor="gridBuildStart">Start</label>
          <input type="radio" id="gridBuildEnd" name="gridBuildOptions" value="end" onClick={()=> this.setGridBuildMode("end")}/>
            <label htmlFor="gridBuildEnd">End</label>
          <input type="radio" id="gridBuildBlock" name="gridBuildOptions" value="block" onClick={()=> this.setGridBuildMode("block")}/>
            <label htmlFor="gridBuildBlock">Block</label>
          <input type="radio" id="gridBuildNeutral" name="gridBuildOptions" value="neutral" onClick={()=> this.setGridBuildMode("neutral")}/>
            <label htmlFor="gridBuildNeutral">Neutral</label>
        </div>

        <div className="runControls">
          <button type="button" onClick={ ()=> this.runPathfinder(this.state.gridArray) }>Run &gt;&gt;</button>
          <button type="button" onClick={ ()=> this.resetGrid() }>Reset &#8634;</button>
          <button type="button" onClick={ ()=> this.clearGrid() }>Clear</button>
        </div>

        <div className="userMessage">{ this.state.userMessage }</div>

        <GridContainer rows={ this.state.rows } cols={ this.state.cols } gridArray={ this.state.gridArray } handleClick={ this.updateGrid }/>
        
      </div>
    )
  }
}

export default Pathfinder;
