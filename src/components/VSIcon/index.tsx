import React from 'react';
import { StyledIcon } from './styles';
import { VSIconProps } from '../../entities/componentEntities/VSIcon/VSIconInterface';

const VSIcon: React.FC<VSIconProps> = ({ name, color, size }) => {
    return <StyledIcon name={name} color={color} size={size} />;
};

export default VSIcon;