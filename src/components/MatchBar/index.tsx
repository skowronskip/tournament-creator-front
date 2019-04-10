import React, {Component} from 'react';
import {Match, Participant, Tournament} from '../../reducers/tournament.reducer';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen} from '@fortawesome/free-solid-svg-icons/faPen';
import MatchScore from '../../modals/match.score';
import {connect} from 'react-redux';
import _ from 'lodash';

interface MatchBarProps {
    dispatch: any;
    currentTournament: Tournament;
    match_id: number;
}

interface MatchBarState {
    isOpen: boolean;
}

class MatchBar extends Component<MatchBarProps, MatchBarState> {
    constructor(props: MatchBarProps) {
        super(props);
        this.state = {
            isOpen: false
        };

        this.toggle = this.toggle.bind(this);
    }
    public toggle() {
        this.setState((prevState: MatchBarState) => ({
            isOpen: !prevState.isOpen
        }));
    }

    public render() {
        const {match_id, currentTournament} = this.props;
        const match = _.find(currentTournament.matches, (match) => match.id === match_id);
        let homeTeam;
        let awayTeam;
        if (match) {
            homeTeam = _.find(currentTournament.participants, (participant) => participant.id === match.home_team_id);
            awayTeam = _.find(currentTournament.participants, (participant) => participant.id === match.away_team_id);
        }
        const {dispatch} = this.props;
        if (match && homeTeam && awayTeam) {
            return (
                <div className='match-bar'>
                    <div className='fa-pull-left'>
                        <span className='match-no'>{match.match_no}</span>
                    </div>
                    <div className='match'>
                        <div className='team-left'>
                            <span>{homeTeam ? homeTeam.name : 'error'}</span>
                        </div>
                        <div className='score'>
                            <span>{!_.isNil(match.homePoints) ? match.homePoints : ' '}</span>
                            <span className='spacer'> - </span>
                            <span>{!_.isNil(match.awayPoints) ? match.awayPoints: ' '}</span>
                        </div>
                        <div className='team-right'>
                            <span>{awayTeam ? awayTeam.name : 'error'}</span>
                        </div>
                    </div>
                    <div className='fa-pull-right' onClick={this.toggle}>
                        <span className='edit'><FontAwesomeIcon icon={faPen}/></span>
                    </div>
                    <MatchScore homeTeam={homeTeam} awayTeam={awayTeam} match={match} isOpen={this.state.isOpen} toggle={this.toggle} dispatch={dispatch}/>
                </div>
            );
        }
        return '';
    }
}

function mapStateToProps(state: any) {
    const {  currentTournament } = state.tournament;
    return {
        currentTournament
    };
}

const connectedMatchBar = connect(mapStateToProps)(MatchBar);
export { connectedMatchBar as MatchBar };
