import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import '../../App.scss';
import logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';

export class LandingMenu extends PureComponent {
    public render() {
        return (
            <Container>
                <Row className='menu-bar'>
                    <Col xs='6'>
                        <Link to='/'><img src={logo} alt='Logo of the application'/></Link>
                    </Col>
                    <Col xs='6'>
                        <div className='float-right'>
                            <Link className='link-button' to='/login'>Log in</Link>
                            <Link className='button-primary-mini' to='#'>Sign up</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default LandingMenu;
