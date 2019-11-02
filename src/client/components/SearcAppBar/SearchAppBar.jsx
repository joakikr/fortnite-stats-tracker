import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginBottom: '16px'
    },
    bar: {
        backgroundColor: theme.palette.bar[600]
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    search: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.25),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.35)
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto'
        }
    },
    searchIcon: {
        width: theme.spacing(7),
        padding: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0,
        color: theme.palette.common.black
    },
    inputRoot: {
        width: '100%',
        color: 'inherit'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 5),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 140,
            '&:focus': {
                width: 200
            }
        }
    }
}));

const onKeyDown = (e, onEnter) => {
    const key = e.which || e.keyCode;
    if (key === 13) {
        // enter
        onEnter(e);
    }
};

const SearchAppBar = ({ value, onChange, onEnter }) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <AppBar className={classes.bar} position="static">
                <Container maxWidth="md">
                    <Toolbar disableGutters>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Fortnite Stats Tracker
                        </Typography>
                        <Box className={classes.search}>
                            <IconButton
                                className={classes.searchIcon}
                                onClick={onEnter}
                                aria-label="search"
                            >
                                <SearchIcon />
                            </IconButton>
                            <InputBase
                                value={value}
                                type="search"
                                onChange={e => onChange(e.target.value)}
                                onKeyDown={event => onKeyDown(event, onEnter)}
                                placeholder="Search by user..."
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};

export default SearchAppBar;
