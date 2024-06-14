import { VSScreenProps } from "../../entities/componentEntities/VSScreenInterfaces";
import { StyledContent, StyledTitle, StyledView } from "./styles";

export const VSScreen: React.FC<VSScreenProps> = ({ children, name }) => {
    return (
        <StyledView>
            <StyledTitle>{name}</StyledTitle>
            <StyledContent>
                {children}
            </StyledContent>
        </StyledView>
    );
}