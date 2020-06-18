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
                <div className="aboutBox" style={{height: this.state.showAbout ? "auto" : 0}}>
                    <p>About this app</p>
                </div>
            </div>
        );
    }

}

export default Header;