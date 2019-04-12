import React, {Component} from 'react';
import '../../App.scss';
import {Tournament} from '../../reducers/tournament.reducer';
import {tournamentActions} from '../../actions/tournament.actions';
import {tournamentStates} from '../../constants/tournament.constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons/faPlayCircle';
import {faPauseCircle} from '@fortawesome/free-solid-svg-icons/faPauseCircle';
import _ from 'lodash';
import {Progress} from 'reactstrap';

interface TournamentHeaderProps {
    dispatch: any;
    currentTournament: Tournament | null;
}

export class TournamentHeader extends Component<TournamentHeaderProps> {
    constructor(props: TournamentHeaderProps) {
        super(props);
        this.startTournament = this.startTournament.bind(this);
        this.pauseTournament = this.pauseTournament.bind(this);
    }
    public startTournament() {
        const {dispatch, currentTournament} = this.props;
        if (currentTournament) {
            if (currentTournament.state === tournamentStates.STOPPED) {
                dispatch(tournamentActions.generateTournamentMatches(currentTournament.id));
            }
            dispatch(tournamentActions.changeTournamentState(tournamentStates.IN_PROGRESS, currentTournament.id));
        }
    }
    public pauseTournament() {
        const {dispatch, currentTournament} = this.props;
        if (currentTournament) {
            dispatch(tournamentActions.changeTournamentState(tournamentStates.PAUSED, currentTournament.id));
        }
    }

    public renderHeader() {
        const {currentTournament} = this.props;
        if (currentTournament && (currentTournament.state === tournamentStates.STOPPED || currentTournament.state === tournamentStates.PAUSED)) {
            return (
                <div className='tournament-header'>
                    <span>{currentTournament.name}<a className='ml-4' onClick={this.startTournament}><FontAwesomeIcon icon={faPlayCircle}/></a></span>
                </div>
            );
        }
        else if (currentTournament && (currentTournament.state === tournamentStates.IN_PROGRESS)) {
            const matchesGrouped = _.groupBy(currentTournament.matches, 'state');
            const resolvedNumber = matchesGrouped.resolved ? matchesGrouped.resolved.length : 0;
            const notResolvedNumber = matchesGrouped.not_resolved ? matchesGrouped.not_resolved.length : 0;
            const progress = resolvedNumber / (resolvedNumber + notResolvedNumber) * 100;
            return (
                <div className='tournament-header'>
                    <span>{currentTournament.name}<a className='ml-4' onClick={this.pauseTournament}><FontAwesomeIcon icon={faPauseCircle}/></a></span>
                    <div className='d-inline-block fa-pull-right mt-4'>
                        <Progress className='tournament-header-bar' value={progress}>{Math.round(progress)}%</Progress>
                    </div>
                </div>
            );
        }
        return '';
    }

    public render() {
        return (
            <div>
                {this.renderHeader()}
            </div>
        );
    }
}

export default TournamentHeader;
