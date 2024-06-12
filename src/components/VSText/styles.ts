import styled from 'styled-components/native';
import { VSTextProps } from '../../entities/componentEntities/VSText/VSTextInterfaces';

export const CustomText = styled.Text<VSTextProps>`
    font-size: 16px;
    text-align: center;
    ${({ color }) => color ? `color: ${color};` : ''}
    ${({ size }) => size ? `font-size: ${size}px;` : ''}
    ${({ bold }) => bold ? 'font-weight: bold;' : ''}
    ${({ italic }) => italic ? 'font-style: italic;' : ''}
    ${({ underline }) => underline ? 'text-decoration: underline;' : ''}
    ${({ strikeThrough }) => strikeThrough ? 'text-decoration: line-through;' : ''}
`;