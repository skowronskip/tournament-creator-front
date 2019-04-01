import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../actions/user.actions';
import {Col, Container, Row} from 'reactstrap';
import logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';

interface LoginPageProps {
    dispatch: any;
    loggingIn: any;
    users: any;
}

interface LoginPageState {
    email: string;
    password: string;
    submitted: boolean;
}

class Index extends React.Component<LoginPageProps, LoginPageState> {
    constructor(props: any) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            email: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleChange(e: any) {
        const { name, value } = e.target;
        // @ts-ignore
        this.setState({ [name]: value });
    }

    public handleSubmit(e: any) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        const { dispatch } = this.props;
        if (email && password) {
            dispatch(userActions.login(email, password));
        }
    }

    public render() {
        const { loggingIn } = this.props;
        const { email, password, submitted } = this.state;
        return (
            <Container>
                <Row>
                    <Col xs='12'>
                        <div className='login-box'>
                            <Link to='/'><img src={logo} alt='Logo of the application'/></Link>
                            <form className='mt-5' name='form' onSubmit={this.handleSubmit}>
                                <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                                    <label htmlFor='email'>Email</label>
                                    <input type='email' className='form-control' name='email' value={email} onChange={this.handleChange} />
                                    {submitted && !email &&
                                    <div className='help-block'>Email is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                    <label htmlFor='password'>Password</label>
                                    <input type='password' className='form-control' name='password' value={password} onChange={this.handleChange} />
                                    {submitted && !password &&
                                    <div className='help-block'>Password is required</div>
                                    }
                                </div>
                                <div className='form-group'>
                                    <button className='button-secondary'>Login</button>
                                    {loggingIn &&
                                    <img src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==' />
                                    }
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

function mapStateToProps(state: any) {
    const { loggingIn } = state.authentication ? state.authentication : false;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(Index);
export { connectedLoginPage as LoginPage };
