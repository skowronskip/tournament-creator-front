import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../actions/user.actions';
import {Col, Container, Row} from 'reactstrap';
import logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';

interface SignUpPageProps {
    dispatch: any;
    loggingIn: any;
    users: any;
}

interface SignUpPageState {
    email: string;
    login: string;
    password: string;
    password_confirmation: string;
    submitted: boolean;
}

class SignupPage extends React.Component<SignUpPageProps, SignUpPageState> {
    constructor(props: any) {
        super(props);

        this.state = {
            email: '',
            login: '',
            password: '',
            password_confirmation: '',
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
        const { email, login, password, password_confirmation } = this.state;
        const { dispatch } = this.props;
        if (email && password && password_confirmation  && login && password === password_confirmation) {
            dispatch(userActions.signup(email, password, login));
        }
    }

    public render() {
        const { loggingIn } = this.props;
        const { email, login, password, password_confirmation, submitted } = this.state;
        return (
            <Container>
                <Row>
                    <Col xs='12'>
                        <div className='signup-box'>
                            <Link to='/'><img src={logo} alt='Logo of the application'/></Link>
                            <form className='mt-5' name='form' onSubmit={this.handleSubmit}>
                                <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                                    <label htmlFor='email'>Email</label>
                                    <input type='email' className='form-control' name='email' value={email} onChange={this.handleChange} />
                                    {submitted && !email &&
                                    <div className='help-block'>Email is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !login ? ' has-error' : '')}>
                                    <label htmlFor='login'>Login</label>
                                    <input type='text' className='form-control' name='login' value={login} onChange={this.handleChange} />
                                    {submitted && !login &&
                                    <div className='help-block'>Login is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                    <label htmlFor='password'>Password</label>
                                    <input type='password' className='form-control' name='password' value={password} onChange={this.handleChange} />
                                    {submitted && !password &&
                                    <div className='help-block'>Password is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !password_confirmation ? ' has-error' : '')}>
                                    <label htmlFor='password_confirmation'>Password confirmation</label>
                                    <input type='password' className='form-control' name='password_confirmation' value={password_confirmation} onChange={this.handleChange} />
                                    {submitted && !password_confirmation &&
                                    <div className='help-block'>Repeat password</div>
                                    }
                                    {password !== password_confirmation &&
                                    <div className='help-block'>Password are not identical</div>
                                    }
                                </div>
                                <div className='form-group'>
                                    <button className='button-secondary'>Sign up</button>
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

const connectedSignUpPage = connect(mapStateToProps)(SignupPage);
export { connectedSignUpPage as SignUpPage };
