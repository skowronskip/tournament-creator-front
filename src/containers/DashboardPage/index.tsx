import React, {Component, PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import '../../App.scss';
import logo from '../../assets/logo.png';
import avatar from '../../assets/avatar.png';
import {Link} from 'react-router-dom';
import { DashboardMenu } from '../../components/DashboardMenu/index';
import {Tournament} from '../../reducers/tournament.reducer';
import {connect} from 'react-redux';
import TournamentBar from '../../components/DashboardMenu/tournament-bar';
import {Game} from '../../reducers/loader.reducer';
import _ from 'lodash';
import {tournamentActions} from '../../actions/tournament.actions';

interface DashboardPageProps {
    dispatch: any;
    tournaments: Tournament[] | null;
    games: Game[] | null;
}

class DashboardPage extends Component<DashboardPageProps> {
    public renderTournaments() {
        if (this.props.tournaments) {
            return this.props.tournaments.map((tournament) => {
                const game = _.find(this.props.games, (game) => game.id === tournament.game_id);
                if (game) {
                    return <Link key={tournament.id} to={`/dashboard/tournament/${tournament.id}`}><TournamentBar key={tournament.id} tournament={tournament} game={game}/></Link>;
                }
                return '';
            });
        }
    }
    public render() {
        if (!_.isNil(this.props.tournaments) || !_.isEmpty(this.props.tournaments)) {
            return (
                <Container fluid={true} className='dashboard'>
                    <DashboardMenu/>
                    <Container fluid={true}>
                        <Row className='dashboard-page'>
                            <Col xs='12'>
                                <h1>YOUR TOURNAMENTS</h1>
                                {this.renderTournaments()}
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
    const { tournaments} = state.tournament;
    const { games } = state.loader;
    return {
        tournaments,
        games
    };
}

const connectedDashboardPage = connect(mapStateToProps)(DashboardPage);
export { connectedDashboardPage as DashboardPage };
