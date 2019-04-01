import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './helpers/history';
import { alertActions } from './actions/alert.actions';
import { PrivateRoute } from './components/PrivateRoute';
import { AnonymousRoute} from './components/AnonymousRoute';
import { LoginPage } from './containers/LoginPage/index';
import { SignUpPage } from './containers/SignUpPage/index';
import LandingPage from './containers/LandingPage';
import DashboardPage from './containers/DashboardPage';
import { alertConstants } from './constants/alert.constatns';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

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
                        <Route exact path='/dashboard' component={DashboardPage} />
                        <PrivateRoute exact path='/test' component={Test} />
                        <AnonymousRoute exact path='/login' component={LoginPage} />
                        <AnonymousRoute exact path='/signup' component={SignUpPage} />
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
