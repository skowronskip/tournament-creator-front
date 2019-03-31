import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import { Button } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LandingPage from './containers/LandingPage';

const Home = () => <div>HOME!</div>;
const Test = () => <div>TEST!</div>;

class App extends Component {
  public render() {
    return (
        <Router>
          <div className='app-settings'>
            <Switch>
              <Route exact path='/' component={LandingPage} />
              <Route exact path='/test' component={Test} />
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
