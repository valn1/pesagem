import React from "react";
import { VSScreenProps } from "../../entities/componentEntities/VSScreen";
import { StyledContent, StyledTitle, StyledView } from "./styles";

export const VSScreen: React.FC<VSScreenProps> = ({ children, name, showHeader }) => {
    return (
        <StyledView>
            {showHeader && <StyledTitle>{name}</StyledTitle>}
            <StyledContent>
                {children}
            </StyledContent>
        </StyledView>
    );
}