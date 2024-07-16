import brandGM from '../../../node_modules/@react-native-vector-icons/fontawesome6/glyphmaps/FontAwesome6_brand.json';
import regularGM from '../../../node_modules/@react-native-vector-icons/fontawesome6/glyphmaps/FontAwesome6_regular.json';
import solidGM from '../../../node_modules/@react-native-vector-icons/fontawesome6/glyphmaps/FontAwesome6_solid.json';
import ionIconsGM from '../../../node_modules/@react-native-vector-icons/ionicons/glyphmaps/Ionicons.json';
import { type IconProps } from '@react-native-vector-icons/common';


// type brandIconProps = IconProps<keyof typeof brandGM>;
// type regularIconProps = IconProps<keyof typeof regularGM>;
// type solidIconProps = IconProps<keyof typeof solidGM>;
type ionIconProps = IconProps<keyof typeof ionIconsGM>;

export type VectorIconProps = ({ iconStyle?: never } & ionIconProps);
// export type VectorIconProps =
//     | ({ iconStyle?: 'brand' } & brandIconProps)
//     | ({ iconStyle?: 'regular' } & regularIconProps)
//     | ({ iconStyle?: 'solid' } & solidIconProps)
//     | ({ iconStyle?: never } & ionIconProps);

export type VSIconProps = VectorIconProps & {
};