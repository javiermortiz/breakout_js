import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Splash from './splash';
import Game from './game';

const Root = () => {
    return (
        <HashRouter>
            <div>
                <Switch>
                    <Route exact path="/" component={Splash} />
                    <Route exact path="/game" component={Game} />
                </Switch>
            </div>
        </HashRouter>
    )
}

export default Root;