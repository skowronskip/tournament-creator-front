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
                        <p>Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60.</p>
                        <p className='mt-5'><Link to='/' className='button-secondary'>Get started</Link></p>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default LandingIntroduction;
