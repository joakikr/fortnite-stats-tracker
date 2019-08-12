import React, { useState } from 'react';
import axios from 'axios';

// Styling
import './App.less'

const ERROR_MSG = {
  PLAYER_NOT_FOUND: 'Fant ikke spiller med gitt brukernavn.',
  TOO_MANY_REQUESTS: 'For mange søk på en gang. Vent litt og prøv igjen.',
  GENERAL: 'Noe gikk galt. Prøv igjen senere.'
}

const errorHandler = (status, setError) => {
  switch (status) {
    case 429:
      setError(ERROR_MSG.TOO_MANY_REQUESTS);
      break;
    case 404:
      setError(ERROR_MSG.PLAYER_NOT_FOUND);
      break;
    default: 
      setError(ERROR_MSG.GENERAL);
  }
}

const App = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');

  function onClickHandler() {
    async function fetchUser(username) {
      try {
        const path = `/api/profile/${username}`;
        const result = await axios(path);
        setUser(result.data.profile);
        setError(null);
      } catch (err) {
        setUser(null);
        errorHandler(err.response.status, setError);
      }
    }

    fetchUser(username)
  }

  return (
    <div>
      <div>
        <input type="text" placeholder="Brukernavn..." onChange={(event) => setUsername(event.target.value)} />
        <button onClick={onClickHandler}>Søk på bruker</button>
      </div>
      {user && (
        <div id="user">
          <h1>{user.epicUserHandle}</h1>
          <span>Platform: {user.platformNameLong}</span>
          <span>Generelle stats:</span>
          <ul>
            {user.lifeTimeStats.map(stat => (
              <li>
                {stat.key} : {stat.value}
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && <div id="error">{error}</div>}
    </div>
  );
};

export default App;
