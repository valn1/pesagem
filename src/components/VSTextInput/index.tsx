import React, { createRef } from "react";
import { VSTextInputProps } from "../../entities/componentEntities/VSTextInput";
import { InputBox, StyledInput, StyledLabel } from "./styles";
import { TextInput } from "react-native";

const VSTextInput: React.FC<Omit<VSTextInputProps,'onChangeText'|'onChange'>> = ({ ...props }) => {
    const [focused, setFocused] = React.useState(false);
    const [_value, setValue] = React.useState('');
    const input = createRef<typeof TextInput>();

    const focus = () => setFocused(true);
    const blur = () => setFocused(false);

    const onChangeText = (text: string) => {
        let value = text;
        if (props.textTreatment) {
            value = props.textTreatment(text);
        }
        setValue(value);
    };
    
    const labelProps = {
        focused,
        value: _value,
        placeholder: props.placeholder,
        rtl: props.rtl
    };

    return (
        <InputBox {...props} >
            {props.leftSlot && props.leftSlot}
            {props.label && <StyledLabel {...labelProps} >{props.label}</StyledLabel>}
            <StyledInput ref={input} onFocus={focus} onBlur={blur} {...props} value={_value} onChangeText={onChangeText}/>
            {props.rightSlot && props.rightSlot}
        </InputBox>
    );
}

export default VSTextInput;