import { VSCardProps } from "../../entities/componentEntities/VSCardInterfaces";
import { StyledCard } from "./styles";

export const VSCard: React.FC<VSCardProps> = (props) => {
    return <StyledCard {...props} />;
}