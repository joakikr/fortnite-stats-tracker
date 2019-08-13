import React from 'react';
import Typography from '@material-ui/core/Typography';

const Error = ({ message }) => (
    <Typography variant="body1" component="span" noWrap>
        { message }
    </Typography>
);

export default Error;
