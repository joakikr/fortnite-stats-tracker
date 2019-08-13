import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// Components
import UserCard from '../UserCard/UserCard';
import Error from '../Error/Error';
import SearchAppBar from '../SearcAppBar/SearchAppBar';
import RecentSearch from '../RecentSearch/RecentSearch';
import CompareTable from '../CompareTable/CompareTable';

// Redux
import { fetchProfile, setProfile, toggleToCompare } from '../../state/actions';
import {
    getProfiles,
    getProfileUsernames,
    getErrorMessage,
    getActiveProfile,
    getProfilesToCompare,
    getCompareRows
} from '../../state/selectors';

const App = () => {
    const dispatch = useDispatch();
    const profiles = useSelector(getProfiles);
    const profileUsernames = useSelector(getProfileUsernames);
    const profileCompareRows = useSelector(getCompareRows);
    const profilesToCompare = useSelector(getProfilesToCompare);
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
                    { profileCompareRows.length > 1 && (
                        <Fragment>
                            <Typography>Comparing { profileCompareRows.length } players</Typography>
                            <CompareTable rows={profileCompareRows} />
                        </Fragment>
                    )}
                </Box>
                <Box>
                    {!user && <Typography>Search by epic username to see stats.</Typography>}
                    {error && <Error message={error} />}
                    {user && profileCompareRows.length < 2 && <UserCard user={user} />}
                </Box>
                <Box>
                    {profileUsernames.length > 0 && (
                        <RecentSearch
                            compare={profilesToCompare}
                            usernames={profileUsernames}
                            toggleToCompare={username => dispatch(toggleToCompare(username))}
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
