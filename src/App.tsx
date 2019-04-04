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
import {loaderActions} from './actions/loader.actions';
import Loader from 'react-loader-spinner';

toast.configure();

interface AppProps {
    alert: {
        type: alertConstants;
        message: string;
    };
    loader: {
        loaded: boolean;
        games: [];
    };
    dispatch: any;
}
const Test = () => <div>TEST!</div>;
class App extends React.Component<AppProps> {
    constructor(props: any) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
        dispatch(loaderActions.loadBackendData());
    }
    public handleAlert() {
        const { alert } = this.props;
        if (alert && alert.message) {
            switch (alert.type) {
                case alertConstants.ERROR:
                    return toast.error(alert.message, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                case alertConstants.SUCCESS:
                    return toast.success(alert.message, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
            }
        }
    }
    public componentDidUpdate(prevProps: Readonly<AppProps>, prevState: Readonly<{}>, snapshot?: any): void {
        this.handleAlert();
    }
    public render() {
        return (
            <Router history={history}>
                {!this.props.loader.loaded && <div className='loader'>
                    <Loader
                        type='Grid'
                        color='#cccccc'
                        height='50'
                        width='50'
                    />
                </div>}
                {this.props.loader.loaded && <div className='app-settings'>
                    <Switch>
                        <Route exact path='/' component={LandingPage} />
                        <PrivateRoute exact path='/dashboard' component={DashboardPage} />
                        <PrivateRoute exact path='/test' component={Test} />
                        <AnonymousRoute exact path='/login' component={LoginPage} />
                        <AnonymousRoute exact path='/signup' component={SignUpPage} />
                    </Switch>
                </div>}
            </Router>
        );
    }
}

function mapStateToProps(state: any) {
    const { alert, loader } = state;
    return {
        alert,
        loader
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
