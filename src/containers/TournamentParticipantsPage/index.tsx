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
import Select from 'react-select';
import TournamentHeader from '../../components/TournamentHeader';

interface TournamentParticipantsPageProps {
    dispatch: any;
    tournaments: Tournament[];
    currentTournament: Tournament | null;
    games: Game[];
    match: {params: {tournamentId: string}};
}

interface TournamentParticipantsPageState {
    name: string;
    submitted: boolean;
}

class TournamentParticipantsPage extends Component<TournamentParticipantsPageProps, TournamentParticipantsPageState> {
    constructor(props: TournamentParticipantsPageProps) {
        super(props);
        this.props.dispatch(tournamentActions.getOneTournaments(parseInt(this.props.match.params.tournamentId, 10)));
        this.state = {
            name: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleChange(e: any) {
        const { name, value } = e.target;
        // @ts-ignore
        this.setState({ [name]: value });
    }

    public handleSubmit(e: any) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { name } = this.state;
        const { dispatch, currentTournament } = this.props;
        if (name && currentTournament) {
            dispatch(tournamentActions.createParticipant(name, currentTournament.id));
            dispatch(tournamentActions.getMyTournaments());
            this.setState({
                name: '',
                submitted: false
            });
        }
    }

    public renderMenu() {
        const {currentTournament} = this.props;
        if (currentTournament) {
            return <TournamentMenu id={currentTournament.id}/>;
        }
        return '';
    }

    public renderParticipants() {
        const {currentTournament} = this.props;
        if (currentTournament) {
            return _.map(currentTournament.participants, (participant) => {
                return <p>{participant.id} {participant.name}</p>;
            });
        }
        return '';
    }
    public render() {
        const {name, submitted} = this.state;
        const {currentTournament} = this.props;
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
                            {currentTournament && currentTournament.state === tournamentStates.STOPPED && <div><div className={'form-group' + (submitted && !name ? ' has-error' : '')}>
                                <label htmlFor='name'>Team name</label>
                                <input type='name' className='form-control' name='name' value={name} onChange={this.handleChange} />
                                {submitted && !name &&
                                <div className='help-block'>Name is required</div>
                                }
                            </div><div className='form-group'>
                                <button className='button-secondary' onClick={this.handleSubmit}>Login</button>
                            </div></div>}
                        </Col>
                    </Row>
                    <Row className='dashboard-content'>
                        <Col xs='12'>
                            {this.renderParticipants()}
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

const connectedTournamentParticipantsPage = connect(mapStateToProps)(TournamentParticipantsPage);
export { connectedTournamentParticipantsPage as TournamentParticipantsPage };
