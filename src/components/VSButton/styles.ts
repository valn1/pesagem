import styled from "styled-components/native";
import { VSButtonProps } from "../../entities/componentEntities/VSButton/VSButtonInterfaces";

export const StyledButton = styled.TouchableOpacity<VSButtonProps>`
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 16px;
    margin: 5px auto;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    ${({ bordered, theme }) => bordered ? `border: 1px solid ${theme.colors.text};` : ''}
    ${({ filled }) => filled ? 'background-color: #007bff;' : ''}
    ${({ quiet }) => quiet ? 'background-color: transparent;' : ''}
    ${({ disabled }) => disabled ? 'opacity: 0.5;' : ''}
`;