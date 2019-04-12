import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import '../../App.scss';
import { DashboardMenu } from '../../components/DashboardMenu/index';
import Select from 'react-select';
import {connect} from 'react-redux';
import {tournamentActions} from '../../actions/tournament.actions';
import _ from 'lodash';

interface NewTournamentPageProps {
    dispatch: any;
    loggingIn: boolean;
    games: [];
}

interface NewTournamentPageState {
    name: string;
    game: any;
    submitted: boolean;
}

class NewTournamentPage extends Component<NewTournamentPageProps, NewTournamentPageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            game: null,
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
    }

    public handleChange(e: any) {
        const { name, value } = e.target;
        // @ts-ignore
        this.setState({ [name]: value });
    }

    public handleChangeSelect = (game: any) => {
        this.setState({ game});
    }

    public handleSubmit(e: any) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { name, game } = this.state;
        const { dispatch } = this.props;
        if (name && game) {
            dispatch(tournamentActions.createNewTournament(name, game));
        }
    }

    public render() {
        const {name, game, submitted} = this.state;
        const customStyles = {
            option: (provided: any, state: any) => ({
                ...provided,
                borderBottom: '1px dotted pink',
                color: state.isSelected ? 'red' : 'blue',
                padding: 20,
            }),
            valueContainer: (provided: any, state: any) => {
                return (
                    {
                        ...provided,
                        backgroundColor: '#404040',
                        borderColor: '#808080',
                        borderRadius: 20
                    }
                );
            },
            singleValue: (provided: any, state: any) => {
                const opacity = state.isSelected ? 0.5 : 1;
                const transition = 'opacity 300ms';

                return { ...provided, opacity, transition };
            }
        }

        return (
            <Container fluid={true} className='dashboard'>
                <DashboardMenu/>
                <Container fluid={true}>
                    <Row className='dashboard-page'>
                        <Col xs='12'>
                            <h1>CREATE NEW TOURNAMENT</h1>
                            <div className={'form-group custom-inputs' + (submitted && !name ? ' has-error' : '')}>
                                <label htmlFor='name'>Tournament name</label>
                                <input type='name' className='form-control' name='name' value={name} onChange={this.handleChange} />
                                {submitted && !name &&
                                <div className='help-block'>Name is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !name ? ' has-error' : '')}>
                                <label htmlFor='name'>Game</label>
                                <Select value={game} styles={customStyles} onChange={this.handleChangeSelect} options={this.props.games}/>
                                {submitted && !name &&
                                <div className='help-block'>Name is required</div>
                                }
                            </div>
                            <div className='form-group'>
                                <button className='button-secondary' onClick={this.handleSubmit}>Login</button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        );
    }
}

function mapStateToProps(state: any) {
    let { games } = state.loader ? state.loader : false;
    games = _.map(games, (game) => {
        return {
            value: game.id,
            label: game.name
        };
    });
    return {
        games
    };
}

const connectedNewTournamentPage = connect(mapStateToProps)(NewTournamentPage);
export { connectedNewTournamentPage as NewTournamentPage };
