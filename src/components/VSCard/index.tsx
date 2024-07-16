import React from "react";
import { VSCardProps } from "../../entities/componentEntities/VSCard";
import { StyledCard } from "./styles";

export const VSCard: React.FC<VSCardProps> = (props) => {
    return <StyledCard {...props} />;
}