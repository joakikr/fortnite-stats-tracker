import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '@material-ui/core/SvgIcon';

let PCIcon = props => (
    <SvgIcon {...props}>
        <svg viewBox="0 0 32 32">
            <path d="M26 18V7H6v11M29 25H3l2-4h22z" />
        </svg>
    </SvgIcon>
);
PCIcon = pure(PCIcon);
PCIcon.displayName = 'PCIcon';
PCIcon.muiName = 'SvgIcon';

export default PCIcon;
