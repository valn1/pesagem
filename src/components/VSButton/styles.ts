import styled from "styled-components/native";
import { VSButtonProps } from "../../entities/componentEntities/VSButton/VSButtonInterfaces";

export const StyledButton = styled.TouchableOpacity<VSButtonProps>`
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 16px;
    margin: 5px auto;
    ${({ bordered }) => bordered ? 'border: 1px solid #6c757d;' : ''})}
    ${({ quiet }) => quiet ? 'background-color: transparent;' : ''})}
    ${({ filled }) => filled ? 'background-color: #007bff;' : ''})}
    ${({ disabled }) => disabled ? 'opacity: 0.5;' : ''})}
`;