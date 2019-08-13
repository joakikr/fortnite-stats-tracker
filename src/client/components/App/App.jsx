import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

// Components
import UserCard from '../UserCard/UserCard';
import Error from '../Error/Error';
import SearchAppBar from '../SearcAppBar/SearchAppBar';
import RecentSearch from '../RecentSearch/RecentSearch';

// Redux
import { fetchProfile, setProfile } from '../../state/actions';
import {
    getProfiles,
    getProfileUsernames,
    getErrorMessage,
    getActiveProfile
} from '../../state/selectors';

const App = () => {
    const dispatch = useDispatch();
    const profiles = useSelector(getProfiles);
    const profileUsernames = useSelector(getProfileUsernames);
    const activeProfile = useSelector(getActiveProfile);
    const error = useSelector(getErrorMessage);
    const user = profiles[activeProfile];

    return (
        <Fragment>
            <CssBaseline />
            <SearchAppBar
                value={activeProfile}
                onChange={username => dispatch(setProfile(username))}
                onEnter={() => dispatch(fetchProfile(activeProfile))}
            />
            <Container maxWidth="md">
                <Box>
                    {user && <UserCard user={user} />}
                    {error && <Error message={error} />}
                </Box>
                <Box>
                    {profileUsernames.length > 0 && (
                        <RecentSearch
                            usernames={profileUsernames}
                            setProfile={username =>
                                dispatch(setProfile(username))
                            }
                        />
                    )}
                </Box>
            </Container>
        </Fragment>
    );
};

export default App;
