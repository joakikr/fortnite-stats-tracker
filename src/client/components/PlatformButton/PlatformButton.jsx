import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import PCIcon from '../Icon/PCIcon';
import PSNIcon from '../Icon/PSNIcon';
import XBoxIcon from '../Icon/XBoxIcon';
import { PLATFORM } from '../../consts';

const useStyles = makeStyles(theme => ({
    icon: {
        width: theme.spacing(7),
        padding: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0,
        color: theme.palette.common.black
    },
}));

const iconMapper = {
    [PLATFORM.PSN]: <PSNIcon />,
    [PLATFORM.XBOX]: <XBoxIcon />,
    [PLATFORM.PC]: <PCIcon />
};

const PlatformButton = ({ onSelect, selected = PLATFORM.PSN }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleSelect = (platform) => {
        setAnchorEl(null);
        onSelect(platform);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'platform-popover' : undefined;

    const selectedIcon = iconMapper[selected] || <PSNIcon />;

    return (
        <div>
            <IconButton onClick={handleOpen} className={classes.icon}>
                { selectedIcon }
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                <IconButton
                    onClick={() => handleSelect(PLATFORM.PSN)}
                    aria-label="ps"
                >
                    <PSNIcon />
                </IconButton>
                <IconButton
                    onClick={() => handleSelect(PLATFORM.XBOX)}
                    aria-label="xbox"
                >
                    <XBoxIcon />
                </IconButton>
                <IconButton
                    onClick={() => handleSelect(PLATFORM.PC)}
                    aria-label="pc"
                >
                    <PCIcon />
                </IconButton>
            </Popover>
        </div>
    );
};

export default PlatformButton;