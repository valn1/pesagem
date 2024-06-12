import React from 'react';
import { VSButtonProps } from '../../entities/componentEntities/VSButton/VSButtonInterfaces';
import { StyledButton } from './styles';

const VSButton: React.FC<VSButtonProps> = ({ children, ...props }) => {
    return <StyledButton {...props}>{children}</StyledButton>;
};

export default VSButton;