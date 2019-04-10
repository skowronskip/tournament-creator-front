import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import '../../App.scss';
import {DashboardMenu} from '../../components/DashboardMenu/index';
import {Tournament} from '../../reducers/tournament.reducer';
import {connect} from 'react-redux';
import {Game} from '../../reducers/loader.reducer';
import {tournamentActions} from '../../actions/tournament.actions';
import {tournamentStates} from '../../constants/tournament.constants';
import TournamentMenu from '../../components/TournamentMenu';
import TournamentHeader from '../../components/TournamentHeader';
import {TournamentMatches} from '../../components/TournamentMatches';

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
        if (this.props.currentTournament) {
            return (
                <Container fluid={true} className='dashboard'>
                    <DashboardMenu/>
                    <Container fluid={true}>
                        <Row className='dashboard-page'>
                            <Col xs='12'>
                                <TournamentHeader dispatch={this.props.dispatch} currentTournament={this.props.currentTournament}/>
                                {this.renderMenu()}
                            </Col>
                        </Row>
                        <Row className='dashboard-content'>
                            <Col xs='12'>
                                {this.renderTable()}
                                {this.props.currentTournament && <TournamentMatches key={this.props.currentTournament.id}/>}
                            </Col>
                        </Row>
                    </Container>
                </Container>
            );
        }
        return '';
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
