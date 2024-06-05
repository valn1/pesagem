import { TouchableOpacityProps } from "react-native";

export type VSButtonProps = TouchableOpacityProps & {
    title?: string;
    icon?: string;
    quiet?: boolean;
    bordered?: boolean;
    disabled?: boolean;
    filled?: boolean;
};
