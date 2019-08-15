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
import CompareTable from '../Tables/CompareTable';

// Redux
import {
    fetchProfile,
    setProfile,
    setSearchValue,
    toggleToCompare,
    clearCompares,
    clearRecentlySearched
} from '../../state/actions';
import {
    getProfiles,
    getProfileUsernames,
    getErrorMessage,
    getActiveProfile,
    getSearchValue,
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
    const searchValue = useSelector(getSearchValue);
    const error = useSelector(getErrorMessage);
    const user = profiles[activeProfile];

    return (
        <Fragment>
            <CssBaseline />
            <SearchAppBar
                value={searchValue}
                onChange={username => dispatch(setSearchValue(username))}
                onEnter={() => dispatch(fetchProfile(searchValue))}
            />
            {profileUsernames.length > 0 && (
                <RecentSearch
                    compare={profilesToCompare}
                    usernames={profileUsernames}
                    toggleToCompare={username =>
                        dispatch(toggleToCompare(username))
                    }
                    clearCompares={() => dispatch(clearCompares())}
                    clearRecentlySearched={() => dispatch(clearRecentlySearched())}
                    setProfile={username => dispatch(setProfile(username))}
                />
            )}
            <Container maxWidth="md">
                <Box>
                    {error && <Error message={error} />}
                    {!user && !error && profileCompareRows.length < 2 && (
                        <Typography>
                            Search by epic username to see stats.
                        </Typography>
                    )}
                    {profileCompareRows.length > 0 && (
                        <Fragment>
                            <Typography>
                                Comparing {profileCompareRows.length} players
                            </Typography>
                            <CompareTable rows={profileCompareRows} />
                        </Fragment>
                    )}
                </Box>
                <Box>
                    {user && (
                        <UserCard user={user} onRefresh={(username) => dispatch(fetchProfile(username))} />
                    )}
                </Box>
            </Container>
        </Fragment>
    );
};

export default App;
