import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import '../../App.scss';
import { LandingMenu } from '../../components/LandingMenu/index';
import LandingIntroduction from '../../components/LandingPage/introduction';
import { currentUser, User } from '../../helpers/current-user';

interface LandingPageProps {
    user: User;
}

interface LandingPageState {
    user: User | undefined;
}

export class LandingPage extends Component<LandingPageProps, LandingPageState> {
    constructor(props: LandingPageProps) {
        super(props);
        this.state = {
            user: currentUser()
        };
    }
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

export default LandingPage;
