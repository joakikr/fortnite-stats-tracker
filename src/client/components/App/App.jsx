import React, { useState, Fragment } from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

// Components
import UserCard from '../UserCard/UserCard';
import Error from '../Error/Error';
import SearchAppBar from '../SearcAppBar/SearchAppBar';

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
        <Fragment>
            <CssBaseline />
            <SearchAppBar onChange={setUsername} onEnter={onClickHandler} />
            <Container maxWidth="lg">
                <Box>
                    {user && <UserCard user={user} />}
                    {error && <Error message={error} />}
                </Box>
            </Container>
        </Fragment>
    );
};

export default App;
