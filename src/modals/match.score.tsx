import React, {Component} from 'react';
import {Match, Participant} from '../reducers/tournament.reducer';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
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
                <Modal isOpen={isOpen} toggle={toggle}>
                    <ModalHeader toggle={toggle}>{homeTeam ? homeTeam.name : 'error'} vs {awayTeam ? awayTeam.name : 'error'}</ModalHeader>
                    <ModalBody>
                        <form className='mt-5' name='form' onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (submitted && !homePoints ? ' has-error' : '')}>
                                <label htmlFor='homePoints'>{homeTeam ? homeTeam.name : 'error'} score</label>
                                <input type='number' className='form-control' name='homePoints' value={homePoints} onChange={this.handleChange} />
                                {submitted && !homePoints &&
                                <div className='help-block'>Score is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !awayPoints ? ' has-error' : '')}>
                                <label htmlFor='awayPoints'>{awayTeam ? awayTeam.name : 'error'} score</label>
                                <input type='number' className='form-control' name='awayPoints' value={awayPoints} onChange={this.handleChange} />
                                {submitted && !awayPoints &&
                                <div className='help-block'>Score is required</div>
                                }
                            </div>
                            <div className='form-group'>
                                <button className='button-secondary'>Login</button>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='secondary' onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default MatchScore;
