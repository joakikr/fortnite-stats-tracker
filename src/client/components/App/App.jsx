import React, { useState } from 'react';
import axios from 'axios';

// Components
import User from '../User/User';
import Search from '../Search/Search';
import Error from '../Error/Error';

// Styling
import './App.less';

const ERROR_MSG = {
  PLAYER_NOT_FOUND: 'Fant ikke spiller med gitt brukernavn.',
  TOO_MANY_REQUESTS: 'For mange søk på en gang. Vent litt og prøv igjen.',
  GENERAL: 'Noe gikk galt. Prøv igjen senere.'
};

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
};

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

    fetchUser(username);
  }

  return (
    <div>
      <Search onChange={setUsername} onClick={onClickHandler} />
      {user && <User user={user} />}
      {error && <Error message={error} />}
    </div>
  );
};

export default App;
