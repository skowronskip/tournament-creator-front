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
import Table from '../../components/Table';

interface TournamentPageProps {
    dispatch: any;
    tournaments: Tournament[];
    currentTournament: Tournament | null;
    games: Game[];
    match: {params: {tournamentId: string}};
}

class TournamentPage extends Component<TournamentPageProps> {
    constructor(props: TournamentPageProps) {
        super(props);
        this.props.dispatch(tournamentActions.getOneTournaments(parseInt(this.props.match.params.tournamentId, 10)));
        this.props.dispatch(tournamentActions.getTournamentStatistics(parseInt(this.props.match.params.tournamentId, 10)));
    }
    componentWillReceiveProps(nextProps: Readonly<TournamentPageProps>, nextContext: any): void {
        if (this.props.match.params.tournamentId !== nextProps.match.params.tournamentId) {
            this.props.dispatch(tournamentActions.getOneTournaments(parseInt(nextProps.match.params.tournamentId, 10)));
            this.props.dispatch(tournamentActions.getTournamentStatistics(parseInt(nextProps.match.params.tournamentId, 10)));
        }
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
                            <TournamentHeader dispatch={this.props.dispatch} currentTournament={this.props.currentTournament}/>
                            {this.renderMenu()}
                        </Col>
                    </Row>
                    <Row className='dashboard-content'>
                        <Col xs='12'>
                            {this.props.currentTournament && <Table statistics={this.props.currentTournament.statistics}/>}
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

const connectedTournamentPage = connect(mapStateToProps)(TournamentPage);
export { connectedTournamentPage as TournamentPage };
