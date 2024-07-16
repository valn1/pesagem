import { TouchableOpacityProps } from "react-native";
import { VectorIconProps } from "./VSIcon";

export type VSButtonProps = TouchableOpacityProps & {
    title?: string;
    quiet?: boolean;
    bordered?: boolean;
    disabled?: boolean;
    filled?: boolean;
    rtl?: boolean;
    iconProps?: VectorIconProps;
};
