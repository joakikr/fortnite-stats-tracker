import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { defaultTheme, darkModeTheme } from './themes';

// Components
import UserCardList from '../UserCard/UserCardList';
import Error from '../Error/Error';
import SearchAppBar from '../SearcAppBar/SearchAppBar';
import RecentSearch from '../RecentSearch/RecentSearch';
import CompareTable from '../Tables/CompareTable';
import DarkModeButton from '../DarkModeButton/DarkModeButton';
import CompareViewButtonGroup from '../CompareViewButtonGroup/CompareViewButtonGroup';

// Redux
import {
    fetchProfile,
    setProfile,
    setSearchValue,
    toggleToCompare,
    clearCompares,
    clearRecentlySearched,
    toggleDarkMode
} from '../../state/actions';
import {
    getProfileUsernames,
    getProfileByUsername,
    getErrorMessage,
    getActiveProfile,
    getSearchValue,
    getProfilesToCompare,
    getCompareRows,
    isDarkMode,
    isLoading
} from '../../state/selectors';

const useStyles = makeStyles(theme => ({
    compare: {
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1)
        }
    },
    loading: {
        marginTop: -theme.spacing(2),
        marginBottom: theme.spacing(2) 
    },
    compareTableMeta: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(1)
    }
}));

const App = () => {
    const classes = useStyles();
    const [compareView, setCompareView] = useState('all');

    // Redux
    const dispatch = useDispatch();
    const profileUsernames = useSelector(getProfileUsernames);
    const profileCompareRows = useSelector((state) => getCompareRows(state, compareView));
    const profilesToCompare = useSelector(getProfilesToCompare);
    const activeProfile = useSelector(getActiveProfile);
    const searchValue = useSelector(getSearchValue);
    const error = useSelector(getErrorMessage);
    const user = useSelector((state) => getProfileByUsername(state, activeProfile))
    const loading = useSelector(isLoading);    
    const darkMode = useSelector(isDarkMode);
    const theme = darkMode ? darkModeTheme : defaultTheme;

    function handleSetCompareView(_event, newView) {
        if (newView) {
            setCompareView(newView);
        }
    };

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <SearchAppBar
                value={searchValue}
                onChange={username => dispatch(setSearchValue(username))}
                onEnter={() => dispatch(fetchProfile(searchValue))}
            />
            { loading && (
                <LinearProgress className={classes.loading} />
            )}
            {profileUsernames.length > 0 && (
                <RecentSearch
                    compare={profilesToCompare}
                    usernames={profileUsernames}
                    toggleToCompare={username => dispatch(toggleToCompare(username))}
                    clearCompares={() => dispatch(clearCompares())}
                    clearRecentlySearched={() => dispatch(clearRecentlySearched())}
                    setProfile={username => dispatch(setProfile(username))}
                />
            )}
            <Container maxWidth="md" className={classes.compare}>
                {error && <Error message={error} />}
                {!user && !error && profileCompareRows.length < 1 && (
                    <Typography>
                        Search by epic username to see stats.
                    </Typography>
                )}
                {profileCompareRows.length > 0 && (
                    <Fragment>
                        <div className={classes.compareTableMeta}>
                            <Typography>
                                Comparing {profileCompareRows.length} players
                            </Typography>
                            <CompareViewButtonGroup view={compareView} handleCompareViewChange={handleSetCompareView} />
                        </div>
                        <CompareTable rows={profileCompareRows} view={compareView} />
                    </Fragment>
                )}
            </Container>
            <UserCardList />
            <DarkModeButton 
                isDarkMode={darkMode}
                toggleDarkMode={isDarkMode => dispatch(toggleDarkMode(isDarkMode))} 
            />
        </MuiThemeProvider>
    );
};

export default App;
