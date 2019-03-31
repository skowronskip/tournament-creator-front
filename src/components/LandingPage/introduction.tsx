import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import '../../App.scss';
import {Link} from 'react-router-dom';
export class LandingIntroduction extends PureComponent {
    public render() {
        return (
            <Container className='mt-5'>
                <Row>
                    <Col xs='12' lg={{size: 6, offset: 6}} className='landing-introduction'>
                        <h1><strong>CREATE YOUR OWN TOURNAMENT!</strong></h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                        <p className='mt-5'><Link to='/' className='button-secondary'>Get started</Link></p>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default LandingIntroduction;
