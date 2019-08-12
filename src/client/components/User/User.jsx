import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <div id="user">
    <h1>{user.epicUserHandle}</h1>
    <span>Platform: {user.platformNameLong}</span>
    <span>Generelle stats:</span>
    <ul>
      {user.lifeTimeStats.map((stat, index) => (
        <li key={`${user.epicUserHandle}-${index}`}>
          {stat.key} : {stat.value}
        </li>
      ))}
    </ul>
  </div>
);

User.propTypes = {
  accountId: PropTypes.string,
  platformId: PropTypes.number,
  platformName: PropTypes.string,
  platformNameLong: PropTypes.string,
  epicUserHandle: PropTypes.string,
  stats: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string,
        category: PropTypes.string,
        valueInt: PropTypes.number,
        value: PropTypes.string,
        rank: PropTypes.number,
        percentile: PropTypes.number,
        displayValue: PropTypes.string
      })
    )
  ),
  lifeTimeStats: PropTypes.arrayOf(PropTypes.object),
  recentMatches: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    accountId: PropTypes.string,
    playlist: PropTypes.string,
    kills: PropTypes.number,
    minutesPlayed: PropTypes.number,
    top1: PropTypes.number,
    top5: PropTypes.number,
    top6: PropTypes.number,
    top10: PropTypes.number,
    top12: PropTypes.number,
    top25: PropTypes.number,
    matches: PropTypes.number,
    top3: PropTypes.number1,
    dateCollected: PropTypes.string,
    score: PropTypes.number,
    platform: PropTypes.number,
    playlistId: PropTypes.number,
    playersOutlived: PropTypes.number
  }))
};

export default User;