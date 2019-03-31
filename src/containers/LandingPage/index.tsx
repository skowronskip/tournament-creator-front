import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import '../../App.scss';
import LandingMenu from '../../components/LandingMenu/index';
import LandingIntroduction from '../../components/LandingPage/introduction';

export class LandingPage extends PureComponent {
    public render() {
        return (
            <Container fluid={true} className='landing-bg'>
                <Row>
                    <Col xs='12'>
                        <LandingMenu/>
                    </Col>
                </Row>
                <Row>
                    <Col xs='12'>
                        <LandingIntroduction/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default LandingPage
