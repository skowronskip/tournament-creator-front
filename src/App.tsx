/*import React, { Component } from 'react';
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
*/

import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './helpers/history';
import { alertActions } from './actions/alert.actions';
import { PrivateRoute } from './components/PrivateRoute';
import { HomePage } from './HomePage/HomePage';
import { LoginPage } from './LoginPage/LoginPage';
import LandingPage from './containers/LandingPage';
import { alertConstants } from './constants/alert.constatns';

interface AppProps {
    alert: {
        type: alertConstants;
        message: string;
    };
    dispatch: any;
}
const Test = () => <div>TEST!</div>;
class App extends React.Component<AppProps> {
    constructor(props: any) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    public render() {
        const { alert } = this.props;
        return (
            <Router history={history}>
                <div className='app-settings'>
                    {alert && alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Switch>
                        <Route exact path='/' component={LandingPage} />
                        <PrivateRoute exact path='/test' component={Test} />
                        <Route exact path='/login' component={LoginPage} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state: any) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
