import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import '../../App.scss';
import logo from '../../assets/logo.png';
import avatar from '../../assets/avatar.png';
import {Link} from 'react-router-dom';
import { DashboardMenu } from '../../components/DashboardMenu/index'

export class DashboardPage extends PureComponent {
    public render() {
        return (
            <Container fluid={true} className='dashboard'>
                <DashboardMenu/>
                <Container fluid={true}>
                    <Row>
                        <Col xs='12'>
                            123
                        </Col>
                    </Row>
                </Container>
            </Container>
        );
    }
}

export default DashboardPage;
