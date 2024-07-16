import React from 'react';
import { VSTextProps } from '../../entities/componentEntities/VSText';
import { CustomText } from './styles';
import { replacePlaceholders } from './helper';

const VSText: React.FC<VSTextProps> = ({ children, args, ...props }) => {
    return <CustomText {...props}>{replacePlaceholders(children, args)}</CustomText>;
};

export default VSText;