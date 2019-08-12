import React from 'react';

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

export default User;