import styled from "styled-components/native";
import { VSCardProps } from "../../entities/componentEntities/VSCard";

export const StyledCard = styled.View<VSCardProps>`
    border-radius: 12px;
    overflow: hidden;
    margin: 20px;
    flex-grow: 1;
    max-width: 400px;
    max-height: 400px;
    background-color: ${({ theme, quiet }) => quiet ? 'transparent' : theme.colors.card};
    ${({ bordered, theme }) => bordered && `border: 1px solid ${theme.colors.secondary};`}
    ${({ seethrough }) => seethrough && `opacity: 0.3;`}
`;//remover max-width e max-height