import React, {Component} from 'react';
import {Match, Tournament} from '../../reducers/tournament.reducer';
import {tournamentStates} from '../../constants/tournament.constants';
import _ from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen} from '@fortawesome/free-solid-svg-icons/faPen';
import {MatchBar} from '../MatchBar';
import {connect} from 'react-redux';

interface TournamentMatchesProps {
    currentTournament: Tournament;
}

class TournamentMatches extends Component<TournamentMatchesProps> {

    public renderMatches() {
        const {currentTournament} = this.props;
        if (currentTournament && currentTournament.state !== tournamentStates.STOPPED && !_.isEmpty(currentTournament.matches)) {
            const {matches, participants} = currentTournament;
            const groupedMatches = _.groupBy(matches, 'round_no');
            return _.map(groupedMatches, (matches, roundNo) => {
               return (
                   <div key={roundNo} className='tournament-matches'>
                       <p className='round-no'>Round {roundNo}</p>
                       {_.map(matches, (match, index) => {
                           const homeTeam = _.find(participants, (participant) => participant.id === match.home_team_id);
                           const awayTeam = _.find(participants, (participant) => participant.id === match.away_team_id);
                           if (homeTeam && awayTeam) {
                               return (
                                   <MatchBar key={roundNo + '-' + index} match_id={match.id}/>
                               );
                           }
                           return '';
                       })}
                   </div>
               );
            });
        }
        return '';
    }
    public render() {
        return (
            <div>
                {this.renderMatches()}
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    const {  currentTournament } = state.tournament;
    return {
        currentTournament
    };
}

const connectedTournamentMatches = connect(mapStateToProps)(TournamentMatches);
export { connectedTournamentMatches as TournamentMatches };
