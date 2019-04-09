import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import '../../App.scss';
import { DashboardMenu } from '../../components/DashboardMenu/index';
import {Tournament} from '../../reducers/tournament.reducer';
import {connect} from 'react-redux';
import {Game} from '../../reducers/loader.reducer';
import _ from 'lodash';
import {tournamentActions} from '../../actions/tournament.actions';
import {tournamentStates} from '../../constants/tournament.constants';
import TournamentMenu from '../../components/TournamentMenu';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons/faPlayCircle';
import {faPauseCircle} from '@fortawesome/free-solid-svg-icons/faPauseCircle';

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
            return <h1>{currentTournament.name}<a onClick={this.startTournament}><FontAwesomeIcon icon={faPlayCircle}/></a></h1>;
        }
        else if (currentTournament && (currentTournament.state === tournamentStates.IN_PROGRESS)) {
            return <h1>{currentTournament.name}<a onClick={this.pauseTournament}><FontAwesomeIcon icon={faPauseCircle}/></a></h1>;
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
