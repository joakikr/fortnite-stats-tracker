import React, { useState, Fragment } from 'react';
import { connect, useSelector } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

// Components
import UserCard from '../UserCard/UserCard';
import Error from '../Error/Error';
import SearchAppBar from '../SearcAppBar/SearchAppBar';

// Redux
import { fetchProfile } from '../../state/actions';
import { getProfiles, getErrorMessage } from '../../state/selectors';

const App = ({ fetchProfile }) => {
    const [username, setUsername] = useState('');
    const error = useSelector(getErrorMessage);
    const profiles = useSelector(getProfiles);
    const user = profiles[username];

    return (
        <Fragment>
            <CssBaseline />
            <SearchAppBar onChange={setUsername} onEnter={() => fetchProfile(username)} />
            <Container maxWidth="lg">
                <Box>
                    {user && <UserCard user={user} />}
                    {error && <Error message={error} />}
                </Box>
            </Container>
        </Fragment>
    );
};

export default connect(null, { fetchProfile })(App);
