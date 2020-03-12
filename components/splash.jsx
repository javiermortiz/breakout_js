import React from 'react';
import { Link } from 'react-router-dom';

class Splash extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="splash">

                <div className="splash-navbar">
                    <ul className="splash-navbar-list">
                        <a href=""><li>Portfolio</li></a>
                        <a href=""><li>Github</li></a>
                        <a href=""><li>LinkedIn</li></a>
                    </ul>
                </div>

                <div className="title">
                    <div className="title-name">
                        <h1>Breakout</h1>
                    </div>
                    <div className="title-author">
                        <h2>A game by Javier M Ortiz</h2>
                    </div>
                </div>

                <Link to='/game'>
                <div className="start-button">
                    <h2>Start</h2>
                </div>
                </Link>
            </div>
        )
    }
}

export default Splash;