import React, {Component} from 'react';
import {StatisticRecord} from '../../reducers/tournament.reducer';
import _ from 'lodash';

interface TableProps {
    statistics: StatisticRecord[];
}

class Table extends Component<TableProps> {
    public render() {
        const {statistics} = this.props;
        return (
            <div className='tournament-table'>
                <div className='header-bar'>
                    <div className='fa-pull-left'>
                        <span className='empty-statistic'>#</span>
                    </div>
                    <div className='name'>
                        <span>Name</span>
                    </div>
                    <div className='fa-pull-right'>
                        <span className='empty-statistic'>P</span>
                        <span className='empty-statistic ml-3'>W</span>
                        <span className='empty-statistic ml-1'>T</span>
                        <span className='empty-statistic ml-1'>L</span>
                        <span className='empty-statistic ml-3'>GD</span>
                        <span className='empty-statistic ml-3'>Pts</span>
                    </div>
                </div>
                {_.map(statistics, (statistic) => {
                    return (
                        <div className='team-bar'>
                            <div className='fa-pull-left'>
                                <span className='place'>{statistic.place}</span>
                            </div>
                            <div className='name'>
                                <span>{statistic.name}</span>
                            </div>
                            <div className='fa-pull-right'>
                                <span className='statistic'>{statistic.match_played}</span>
                                <span className='statistic ml-3'>{statistic.match_won}</span>
                                <span className='statistic ml-1'>{statistic.match_tied}</span>
                                <span className='statistic ml-1'>{statistic.match_lost}</span>
                                <span className='statistic ml-3'>{statistic.goals_difference}</span>
                                <span className='place ml-3'>{statistic.points}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Table;
