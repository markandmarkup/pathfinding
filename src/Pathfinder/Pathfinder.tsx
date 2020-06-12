import React from 'react';
import './Pathfinder.css';
import GridContainer from './GridContainer/GridContainer';
import { convertArrayTo2D, indexToXYArray, convertArrayTo1D } from '../utils/Utils';
import { pathfinder1 } from '../utils/Pathfinder1';
import { pathfinder2 } from '../utils/Pathfinder2';


interface PathfinderState {
  cols: number;
  rows: number;
  gridBuildMode: string;
  pathfinders: object;
  selectedPathfinder: Function;
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
        "pathfinders": {
          "pathfinder1": pathfinder1,
          "pathfinder2": pathfinder2
        },
        "selectedPathfinder": pathfinder1,
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

  setPathfinder = (e) : void => {
    this.setState({
      selectedPathfinder: this.state.pathfinders[e.target.value]
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
    const pathFinderResult = this.state.selectedPathfinder(gridArray2d, start, end);
    const userMessage = pathFinderResult.success ? `Successful paths: ${pathFinderResult.pathCount}` : "No successful paths found";
    const pathFinder1DResult = pathFinderResult.resultArray.length > 0 ? convertArrayTo1D(pathFinderResult.resultArray) : gridArray;

    this.setState({
      pathfinderInputGrid: gridArray,
      gridArray: pathFinder1DResult,
      userMessage: userMessage
    })
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
          <select name="pathfinderSelect" id="pathfinderSelect" onChange={ (e)=> this.setPathfinder(e) }>
            <option value="pathfinder1">Pathfinder 1</option>
            <option value="pathfinder2">Pathfinder 2</option>
          </select>
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
