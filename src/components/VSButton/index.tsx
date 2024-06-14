import React from 'react';
import { VSButtonProps } from '../../entities/componentEntities/VSButtonInterfaces';
import { StyledButton } from './styles';
import VSText from '../VSText';
import VSIcon from '../VSIcon';

const VSButton: React.FC<VSButtonProps> = ({ children, title, rtl, iconProps, ...props }) => {

    return <StyledButton {...props}>
        <>
            {!rtl && iconProps?.name && <VSIcon {...iconProps} />}
            {!rtl && title && <VSText>{title}</VSText>}
            {children}
            {rtl && title && <VSText>{title}</VSText>}
            {rtl && iconProps?.name && <VSIcon {...iconProps} />}
        </>
    </StyledButton>;
};

export default VSButton;