import React from 'react';
import './App.css';
import GridContainer from './GridContainer/GridContainer';

function App() {

  return (
    <div className="App">
      <div className="gridBuildOptions">
        <input type="radio" id="gridBuildStart" name="gridBuildOptions" value="start"/>
          <label htmlFor="gridBuildStart">Start</label>
        <input type="radio" id="gridBuildEnd" name="gridBuildOptions" value="end"/>
          <label htmlFor="gridBuildEnd">End</label>
        <input type="radio" id="gridBuildBlock" name="gridBuildOptions" value="block"/>
          <label htmlFor="gridBuildBlock">Block</label>
      </div>

      <div className="runControls">
        <button type="button">Run &gt;&gt;</button>
      </div>

      <GridContainer rows={5} cols={5} />
      
    </div>
  );
}

export default App;
