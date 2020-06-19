import React from 'react';
import './Header.css';

interface HeaderState {
    showAbout: boolean;
}

class Header extends React.Component {

    state = {
        showAbout: false
    }

    toggleAbout() : void {
        this.setState({
            showAbout: !this.state.showAbout
        })
    }

    render() {
        return (
            <div className="header">
                <header className="headerBar">
                    <div className="titleContainer">
                        <img src="./images/mamu-logo.svg" alt="Mark and Markup logo" className="headerLogo"/>
                        <h1 className="pageTitle">Exploring Pathfinding Algorithms</h1>
                    </div>
                    <nav className="navLinks">
                        <button type="button" onClick={ ()=> {this.toggleAbout()} }>About</button>
                    </nav>
                </header>
                <div className="aboutBox" style={this.state.showAbout ? { visibility: "visible", opacity: 1 } : { visibility: "hidden", opacity: 0 }}>
                    <button type="button" onClick={ ()=> {this.toggleAbout()} }>Close</button>
                    <div className="aboutContent">
                        <h2>About this project</h2>
                        <p>This project is a self imposed challenge with a goal of trying to find efficient pathfinding algorithms.</p>
                        <p>The algorithm must find a continuous path from 'Start' to 'End', given the following rules:</p>
                        <ul>
                            <li>The path can move from its current square to any adjacent square in a move: up, down, left or right</li>
                            <li>The path cannot enter a 'Block' square</li>
                            <li>The path cannot visit the same square twice</li>
                            <li>The algorithm should strive to find the shortest possible path from Start to End</li>
                        </ul>

                        <h2>Instructions</h2>
                        <ol>
                            <li>Select a block type from the options - 'Start', 'End', 'Block' or 'Neutral'</li>
                            <li>Click a square on the grid to apply the selected block type. There can only be one 'Start' and 'End' square, but multiple 'Block' squares</li>
                            <li>Choose which algorithm to run from the drop-down</li>
                            <li>Click 'Run' to run the algorithm when everything's set up (it may take some time to see the results depending on your pc and the algorithm choice!)</li>
                            <li>'Reset' returns the grid to the configuration when 'Run' was last clicked</li>
                            <li>'Clear' returns all blocks in the grid to 'Neutral'</li>
                        </ol>
                    </div>
                </div>
            </div>
        );
    }

}

export default Header;