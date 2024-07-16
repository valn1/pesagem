import { StaticParamList, StaticScreenProps, createStaticNavigation } from "@react-navigation/native";
import { Home } from "./screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Login } from "./screens/Login";

const PlaceholderScreen: React.FC<StaticScreenProps<{ teste?: string }>> = () => null;

const RootTabs = createBottomTabNavigator({
    screenOptions: {
        headerShown: false,
    },
    initialRouteName: 'Home',
    screens: {
        Lista: PlaceholderScreen,
        Home,
        Settings: PlaceholderScreen,
    },
});

const RootStack = createNativeStackNavigator({
    screenOptions: {
        headerShown: false,
    },
    initialRouteName: 'Login',
    screens: {
        Login: {
            screen: Login
        },
        RootTabs: {
            screen: RootTabs
        }
    }
});


type RootStackParamList = StaticParamList<typeof RootStack>;

// type RootTabsParamList = StaticParamList<typeof RootTabs>;

// type NavigationParamsList = Omit<RootStackParamList, 'RootTabs'> & RootTabsParamList;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}

export const Navigation = createStaticNavigation(RootStack);