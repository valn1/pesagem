import { TextProps } from "react-native";

export type VSTextProps = TextProps & {
    children?: React.ReactNode;
    args?: string[];
    color?: string;
    size?: number;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikeThrough?: boolean;
}