import styled from "styled-components/native";
import VSText from "../VSText";

export const StyledView = styled.SafeAreaView`
    flex-grow: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const StyledContent = styled.ScrollView.attrs({
    contentContainerStyle: {
        flexGrow: 1,
        justifyContent: 'center'
    }
})`
`;

export const StyledTitle = styled(VSText).attrs({
    bold: true
})`
    font-size: 20px;
    color: ${({ theme }) => theme.colors.secondary};
    border:2px solid ${({ theme }) => theme.colors.secondary};
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    text-align: left;
    padding: 0 20px;
`;