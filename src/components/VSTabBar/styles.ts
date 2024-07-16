import styled from "styled-components/native";
import VSText from "../VSText";
import VSIcon from "../VSIcon";

export const TabBarContainer = styled.View`
    width: 100%;
    height: 70px;
    background-color: ${({ theme }) => theme.colors.card};
    flex-direction: row;
    justify-content: space-around;
`;

export const TabButton = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const TabLabel = styled(VSText)<{focused:boolean}>`
    color: ${({ theme, focused }) => focused ? theme.colors.primary : theme.colors.text};
`;

export const TabIcon = styled(VSIcon).attrs({
    size: 30,
})<{focused:boolean}>`
    color: ${({ theme, focused }) => focused ? theme.colors.primary : theme.colors.text};
`;