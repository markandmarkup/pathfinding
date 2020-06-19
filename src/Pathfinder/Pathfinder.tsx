import React from 'react';
import './Pathfinder.css';
import GridContainer from './GridContainer/GridContainer';
import Results from './Results/Results';
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
  resultsArray: Array<any>;
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
        "resultsArray": [],
        "userMessage": ""
    }
  }

  setGridBuildMode = (blockType: string) : void => {
    let buildLabels = document.querySelectorAll(".gridBuildOptions label");
    buildLabels.forEach(label => label.setAttribute("style", "background-color: none"));

    switch (blockType) {
      case "start":
        buildLabels[0].setAttribute("style", "background-color: #6495ed");
        break;
      case "end":
        buildLabels[1].setAttribute("style", "background-color: #3cb371");
        break;
      case "block":
        buildLabels[2].setAttribute("style", "background-color: #808080");
        break;
      case "neutral":
        buildLabels[3].setAttribute("style", "background-color: #96b3e7");
        break;
      default:
        buildLabels[0].setAttribute("style", "background-color: #6495ed");
        break;
    }

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

    if (this.state.gridBuildMode === "start") this.setGridBuildMode("end");
    if (this.state.gridBuildMode === "end") this.setGridBuildMode("block");
  }

  clearGrid = () : void => {
    this.setState({
      gridArray: new Array(this.state.cols * this.state.rows).fill('neutral'),
      userMessage: ""
    });
    this.setGridBuildMode("start");
    return;
  }

  resetGrid = () : void => {
    if (this.state.pathfinderInputGrid.length === this.state.cols * this.state.rows) {
      this.setState({
        gridArray: this.state.pathfinderInputGrid,
        userMessage: ""
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
    let userMessage = pathFinderResult.success ? `Successful paths: ${pathFinderResult.pathCount}` : "No successful paths found";
    userMessage += ` Path attempts: ${pathFinderResult.attemptCount}`;
    // const pathFinder1DResult = pathFinderResult.resultArray.length > 0 ? convertArrayTo1D(pathFinderResult.resultArray) : gridArray;
    console.log('PFR:')
    console.log(pathFinderResult.resultArray)
    let resultsArray
    if (pathFinderResult.resultArray.length > 0) {
      resultsArray = pathFinderResult.resultArray.map(item => convertArrayTo1D(item));
    }
    console.log(resultsArray)

    this.setState({
      pathfinderInputGrid: gridArray,
      gridArray: resultsArray.length > 0 ? resultsArray[0] : gridArray,
      resultsArray: resultsArray,
      userMessage: userMessage
    })
    return;
  }

  viewResult = (resultIndex: number): void => {
    if (this.state.resultsArray[resultIndex]) {
      this.setState({
        gridArray: this.state.resultsArray[resultIndex]
      })
    }
  }

  render() { 
    return (
      <div className="pathfinder">
        <div className="interface">
          <div className="gridBuildOptions">
            <label htmlFor="gridBuildStart" style={{backgroundColor: "#6495ed"}}>
              <input type="radio" id="gridBuildStart" name="gridBuildOptions" value="start" onClick={()=> this.setGridBuildMode("start")} defaultChecked/>
                Start</label>
            <label htmlFor="gridBuildEnd">
              <input type="radio" id="gridBuildEnd" name="gridBuildOptions" value="end" onClick={()=> this.setGridBuildMode("end")}/>
                End</label>
            <label htmlFor="gridBuildBlock">
              <input type="radio" id="gridBuildBlock" name="gridBuildOptions" value="block" onClick={()=> this.setGridBuildMode("block")}/>
                Block</label>
            <label htmlFor="gridBuildNeutral">
              <input type="radio" id="gridBuildNeutral" name="gridBuildOptions" value="neutral" onClick={()=> this.setGridBuildMode("neutral")}/>
                Neutral</label>
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

        <Results resultArray={ this.state.resultsArray } handleHover={ this.viewResult }/>
      </div>
    )
  }
}

export default Pathfinder;
