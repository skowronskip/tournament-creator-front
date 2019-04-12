import React, {Component} from 'react';
import {Tournament} from '../../reducers/tournament.reducer';
import moment from 'moment';
import {Game} from '../../reducers/loader.reducer';
import avatar from '../../assets/avatar.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import {Progress} from 'reactstrap';
import {tournamentStates} from '../../constants/tournament.constants';

interface TournamentBarProps {
    tournament: Tournament;
    game: Game;
}
class TournamentBar extends Component<TournamentBarProps> {
    public render() {
        const { tournament } = this.props;
        const matchesGrouped = _.groupBy(tournament.matches, 'state');
        const resolvedNumber = matchesGrouped.resolved ? matchesGrouped.resolved.length : 0;
        const notResolvedNumber = matchesGrouped.not_resolved ? matchesGrouped.not_resolved.length : 0;
        const progress = resolvedNumber / (resolvedNumber + notResolvedNumber) * 100;
        return (
            <div className='tournament-bar'>
                <div className='image'>
                    <img src={avatar} alt=''/>
                </div>
                <div className='info'>
                    <p className='name'>{this.props.tournament.name}</p>
                    <p className='game'>Game: {this.props.game.name}</p>
                </div>
                <div className='fa-pull-right'>
                    <div className='additional-info'>
                        <div className='participants'>
                            <FontAwesomeIcon icon={faUser}/>{this.props.tournament.participants.length}
                            {tournament.state !== tournamentStates.STOPPED && <div className='d-inline-block ml-4 align-middle'>
                                <Progress className='tournament-bar-progress' value={progress}/>
                            </div>}
                        </div>
                        <p className='game'>Created at: {moment(this.props.tournament.created_at).format('DD-MM-YYYY')}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default TournamentBar;
