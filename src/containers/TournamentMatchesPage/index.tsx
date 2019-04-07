import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import '../../App.scss';
import { DashboardMenu } from '../../components/DashboardMenu/index';
import {Tournament} from '../../reducers/tournament.reducer';
import {connect} from 'react-redux';
import {Game} from '../../reducers/loader.reducer';
import _ from 'lodash';
import {tournamentActions} from '../../actions/tournament.actions';
import {Link} from 'react-router-dom';
import {tournamentStates} from '../../constants/tournament.constants';
import TournamentMenu from '../../components/TournamentMenu';

interface TournamentMatchesPageProps {
    dispatch: any;
    tournaments: Tournament[];
    currentTournament: Tournament | null;
    games: Game[];
    match: {params: {tournamentId: string}};
}

class TournamentMatchesPage extends Component<TournamentMatchesPageProps> {
    constructor(props: TournamentMatchesPageProps) {
        super(props);
        this.props.dispatch(tournamentActions.getOneTournaments(parseInt(this.props.match.params.tournamentId, 10)));
    }

    public renderHeader() {
        const {currentTournament, games} = this.props;
        const game = currentTournament ? _.find(games, (game) => game.id === currentTournament.game_id) : null;
        if (currentTournament && game) {
            return <h1>{currentTournament.name}</h1>;
        }
        return '';
    }

    public renderMenu() {
        const {currentTournament} = this.props;
        if (currentTournament) {
            return <TournamentMenu id={currentTournament.id}/>;
        }
        return '';
    }

    public renderTable() {
        const {currentTournament} = this.props;
        if (currentTournament && currentTournament.state === tournamentStates.STOPPED) {
            return <p>Tournament is not started yet.</p>;
        }
        return '';
    }


    public render() {
        return (
            <Container fluid={true} className='dashboard'>
                <DashboardMenu/>
                <Container fluid={true}>
                    <Row className='dashboard-page'>
                        <Col xs='12'>
                            {this.renderHeader()}
                            {this.renderMenu()}
                        </Col>
                    </Row>
                    <Row className='dashboard-content'>
                        <Col xs='12'>
                            {this.renderTable()}
                        </Col>
                    </Row>
                </Container>
            </Container>
        );
    }
}

function mapStateToProps(state: any) {
    const { tournaments, currentTournament } = state.tournament;
    const { games } = state.loader;
    return {
        currentTournament,
        tournaments,
        games
    };
}

const connectedTournamentMatchesPage = connect(mapStateToProps)(TournamentMatchesPage);
export { connectedTournamentMatchesPage as TournamentMatchesPage };
