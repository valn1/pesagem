import { TouchableOpacityProps } from "react-native";
import { VSIconProps, VectorIconProps } from "./VSIconInterfaces";

export type VSButtonProps = TouchableOpacityProps & {
    title?: string;
    quiet?: boolean;
    bordered?: boolean;
    disabled?: boolean;
    filled?: boolean;
    rtl?: boolean;
    iconProps?: VectorIconProps;
};
