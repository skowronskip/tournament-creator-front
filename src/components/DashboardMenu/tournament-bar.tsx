import React, {Component} from 'react';
import {Tournament} from '../../reducers/tournament.reducer';
import moment from 'moment';
import {Game} from '../../reducers/loader.reducer';
import avatar from '../../assets/avatar.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface TournamentBarProps {
    tournament: Tournament;
    game: Game;
}
class TournamentBar extends Component<TournamentBarProps> {
    public render() {
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
                        <p className='participants'><FontAwesomeIcon icon={faUser}/>{this.props.tournament.participants.length}</p>
                        <p className='game'>Created at: {moment(this.props.tournament.created_at).format('DD-MM-YYYY')}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default TournamentBar;
