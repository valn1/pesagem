import styled from "styled-components/native";
import { VSTextInputProps } from "../../entities/componentEntities/VSTextInput";
import { RefObject } from "react";
import { TextInput } from "react-native";

type internalProps = {
    focused?: boolean;
    value?: string;
}
type boxProps = Pick<VSTextInputProps,'bordered' | 'filled' | 'quiet' | 'disabled' | 'label' | 'rtl' | 'invalid'> & internalProps
type labelProps = Pick<internalProps,'focused' | 'value'> & Pick<VSTextInputProps,'placeholder' | 'rtl' | 'fixedLabel' | 'invalid'>

export const InputBox = styled.View<boxProps>`
    border-radius: 4px;
    margin: 15px auto;
    flex-direction: row;
    align-items: center;
    height: 40px;
    width:50%;
    opacity: ${({ disabled }) => disabled ? 0.5 : 1};
    ${({ theme,quiet,bordered, invalid }) => bordered && !quiet && `border: 1px solid ${invalid ? theme.colors.danger : theme.colors.secondary};`}
    ${({ theme,quiet,filled }) => filled && !quiet && `background-color: ${theme.colors.card};`}
`;

export const StyledLabel = styled.Text<labelProps>`
    font-size: 16px;
    color: ${({ theme,invalid }) => invalid ? theme.colors.danger : theme.colors.text};
    bottom: ${({ focused, value, placeholder }) => focused || value || placeholder  ? '40px' : '10px'};
    ${({ rtl }) => rtl ? 'right' : 'left'}: 10px;
    position: absolute;
`;

export const StyledInput = styled.TextInput.attrs(({theme})=>({
    placeholderTextColor: theme.colors.text+'80',
    cursorColor: theme.colors.primary,
}))<VSTextInputProps&{ref:RefObject<typeof TextInput>}>`
    flex: 1;
    font-size: 16px;
    padding: 0 10px;
    text-align: ${({ rtl }) => rtl ? 'right' : 'left'};
    color: ${({ theme }) => theme.colors.text};
    ${({ theme,invalid }) => invalid ? `border-color: ${theme.colors.danger};` : ''}
`;