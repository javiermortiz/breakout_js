import React from 'react';

class Splash extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="splash">

                <div className="title">
                    <div className="title-name">
                        <h1>Breakout</h1>
                    </div>
                    <div className="title-author">
                        <h2>A game by Javier M Ortiz</h2>
                    </div>
                </div>

                <div className="splash-navbar">
                    <ul className="splash-navbar-list">
                        <a href=""><li>Portfolio</li></a>
                        <a href=""><li>Github</li></a>
                        <a href=""><li>LinkedIn</li></a>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Splash;