import React, {Component} from 'react';
import {Link} from 'react-router-dom';

interface TournamentMenuProps {
    id: number;
}

export class TournamentMenu extends Component<TournamentMenuProps> {
    public render() {
        return (
            <div className='tournament-menu'>
                <Link to={`/dashboard/tournament/${this.props.id}`}>Table</Link>
                <Link to={`/dashboard/tournament/${this.props.id}/matches`}>Matches</Link>
                <Link to={`/dashboard/tournament/${this.props.id}/participants`}>Participants</Link>
                <Link to='#'>Settings</Link>
            </div>
        );
    }
}

export default TournamentMenu;
