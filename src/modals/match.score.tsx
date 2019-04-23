import React, {Component} from 'react';
import {Match, Participant} from '../reducers/tournament.reducer';
import {Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import {userActions} from '../actions/user.actions';
import {tournamentActions} from '../actions/tournament.actions';
import _ from 'lodash';

interface MatchScoreProps {
    dispatch: any;
    homeTeam: Participant;
    awayTeam: Participant;
    match: Match;
    isOpen: boolean;
    toggle: () => void;
}

interface MatchScoreState {
    homePoints: number;
    awayPoints: number;
    submitted: boolean;
}

class MatchScore extends Component<MatchScoreProps, MatchScoreState> {
    constructor(props: MatchScoreProps) {
        super(props);
        const {match} = this.props;
        this.state = {
            homePoints: match.homePoints || 0,
            awayPoints: match.awayPoints || 0,
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
        const { homePoints, awayPoints } = this.state;
        const { dispatch, match, toggle } = this.props;
        if (!_.isNil(homePoints) && !_.isNil(awayPoints)) {
            dispatch(tournamentActions.changeMatchScore(homePoints, awayPoints, match.id));
            toggle();
        }
    }

    public render() {
        const {homeTeam, awayTeam, match, isOpen, toggle} = this.props;
        const {homePoints, awayPoints, submitted} = this.state;
        return (
            <div>
                <Modal size='lg' isOpen={isOpen} toggle={toggle}>
                    <form className='mt-5 score-inputs text-center' name='form' onSubmit={this.handleSubmit}>
                    <ModalBody toggle={toggle}>
                        <Container>
                            <Row>
                                <Col xs='6'>
                                    <div>
                                        <label htmlFor='homePoints'>{homeTeam ? homeTeam.name : 'error'}</label>
                                    </div>
                                </Col>
                                <Col xs='6'>
                                    <div>
                                        <label htmlFor='awayPoints'>{awayTeam ? awayTeam.name : 'error'}</label>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs='6'>
                                    <div className={'form-group' + (submitted && !homePoints ? ' has-error' : '')}>
                                        <input type='number' className='form-control' name='homePoints' value={homePoints} onChange={this.handleChange} />
                                        {submitted && !homePoints &&
                                        <div className='help-block'>Score is required</div>
                                        }
                                    </div>
                                </Col>
                                <Col xs='6'>
                                    <div className={'form-group' + (submitted && !awayPoints ? ' has-error' : '')}>
                                        <input type='number' className='form-control' name='awayPoints' value={awayPoints} onChange={this.handleChange} />
                                        {submitted && !awayPoints &&
                                        <div className='help-block'>Score is required</div>
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </ModalBody>
                    <ModalFooter className='text-center'>
                        <button className='button-secondary'>Submit score</button>
                    </ModalFooter>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default MatchScore;
