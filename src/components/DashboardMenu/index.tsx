import React, {Component} from 'react';
import '../../App.scss';
import logo from '../../assets/logo.png';
import avatar from '../../assets/avatar.png';
import {Link} from 'react-router-dom';
import {User} from '../../helpers/current-user';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCog, faCamera, faKey, faPlus, faTimes, faPenFancy} from '@fortawesome/free-solid-svg-icons';
import {tournament, Tournament} from '../../reducers/tournament.reducer';

interface DashboardMenuProps {
    user: any;
    tournaments: Tournament[];
    dispatch: any;
}

interface DashboardMenuState {
    user: User | undefined;
}

class DashboardMenu extends Component<DashboardMenuProps, DashboardMenuState> {
    public userMail() {
        if (this.props.user) {
            return this.props.user.email;

        }
        return '';
    }
    public render() {
        return (
            <div className='dashboard-menu'>
                <div className='logo'>
                    <Link to='/'><img src={logo} alt='Logo of the application'/></Link>
                </div>
                <div className='user'>
                    <img src={avatar} alt='Avatar'/>
                    <p>{this.userMail()}</p>
                    <div className='spacer'/>
                </div>
                <div className='section'>
                    <p>USER</p>
                    <Link to='#'><FontAwesomeIcon icon={faCog} /> Edit user</Link>
                    <Link to='#'><FontAwesomeIcon icon={faKey} /> Edit password</Link>
                    <Link to='#'><FontAwesomeIcon icon={faCamera} /> Edit photo</Link>
                </div>
                <div className='section'>
                    <p>TOURNAMENT</p>
                    <Link to='/dashboard/newTournament'><FontAwesomeIcon icon={faPlus} /> New Tournament</Link>
                    <Link to='#'><FontAwesomeIcon icon={faPenFancy} /> Edit Tournament</Link>
                    <Link to='#'><FontAwesomeIcon icon={faTimes} /> Delete Tournament</Link>
                    {this.props.tournaments.map((tournament, index) => {
                        return <p key={index}>{tournament.name}</p>
                    })}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    const { user } = state.authentication && state.authentication.loggedIn ? state.authentication : false;
    const { tournaments } = state.tournament;
    return {
        tournaments,
        user
    };
}

const connectedDashboardMenu = connect(mapStateToProps)(DashboardMenu);
export { connectedDashboardMenu as DashboardMenu };
