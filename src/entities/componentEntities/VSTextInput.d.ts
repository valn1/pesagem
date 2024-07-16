import { TextInputProps } from "react-native";

export type VSTextInputProps = TextInputProps & {
    label?: string;
    quiet?: boolean;
    bordered?: boolean;
    disabled?: boolean;
    filled?: boolean;
    rtl?: boolean;
    invalid?: boolean;
    leftSlot?: React.ReactNode;
    rightSlot?: React.ReactNode;
    fixedLabel?: boolean;
    textTreatment?: (text: string) => string;
};
