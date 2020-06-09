import React from 'react';
import './App.css';
import GridContainer from './GridContainer/GridContainer';

interface AppState {
  gridBuildMode: string;
}

class App extends React.Component<{}, AppState> {

  state = {
    gridBuildMode: "start"
  }

  setGridBuildMode = (blockType: string) : void => {
    this.setState({
      gridBuildMode: blockType
    });
  }

  render() { 
    return (
      <div className="App">
        <div className="gridBuildOptions">
          <input type="radio" id="gridBuildStart" name="gridBuildOptions" value="start" onClick={()=> this.setGridBuildMode("start")} defaultChecked/>
            <label htmlFor="gridBuildStart">Start</label>
          <input type="radio" id="gridBuildEnd" name="gridBuildOptions" value="end" onClick={()=> this.setGridBuildMode("end")}/>
            <label htmlFor="gridBuildEnd">End</label>
          <input type="radio" id="gridBuildBlock" name="gridBuildOptions" value="block" onClick={()=> this.setGridBuildMode("block")}/>
            <label htmlFor="gridBuildBlock">Block</label>
        </div>

        <div className="runControls">
          <button type="button">Run &gt;&gt;</button>
        </div>

        <GridContainer rows={ 5 } cols={ 5 } gridBuildMode={ this.state.gridBuildMode }/>
        
      </div>
    )
  }
}

export default App;
