import React from 'react';
import { StyledIcon } from './styles';
import { VSIconProps } from '../../entities/componentEntities/VSIconInterfaces';

const VSIcon: React.FC<VSIconProps> = (props) => {
    return <StyledIcon {...props} />;
};

export default VSIcon;