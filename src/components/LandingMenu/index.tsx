import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import '../../App.scss';
import logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';
import { User } from '../../helpers/current-user';
import { userActions } from '../../actions/user.actions';
import {connect} from 'react-redux';

interface LandingMenuProps {
    user: any;
    dispatch: any;
}

interface LandingMenuState {
    user: User | undefined;
}

class LandingMenu extends Component<LandingMenuProps, LandingMenuState> {
    constructor(props: LandingMenuProps) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    public logout() {
        this.props.dispatch(userActions.logout());
    }
    public menu() {
        if (this.props.user) {
            return (
                <div className='float-right'>
                    {this.props.user ? this.props.user.email : null}
                    <Link className='link-button ml-4' to='/dashboard'>Dashboard</Link>
                    <Link className='button-primary-mini' to='/' onClick={this.logout}>Log out</Link>
                </div>
            );

        }
        return (
            <div className='float-right'>
                <Link className='link-button' to='/login'>Log in</Link>
                <Link className='button-primary-mini' to='/signup'>Sign up</Link>
            </div>
        );
    }
    public render() {
        return (
            <Container>
                <Row className='menu-bar'>
                    <Col xs='6'>
                        <Link to='/'><img src={logo} alt='Logo of the application'/></Link>
                    </Col>
                    <Col xs='6'>
                        {this.menu()}
                    </Col>
                </Row>
            </Container>
        );
    }
}

function mapStateToProps(state: any) {
    const { user } = state.authentication && state.authentication.loggedIn ? state.authentication : false;
    return {
        user
    };
}

const connectedLandingMenu = connect(mapStateToProps)(LandingMenu);
export { connectedLandingMenu as LandingMenu };
