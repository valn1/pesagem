import { StaticParamList, StaticScreenProps, createStaticNavigation } from "@react-navigation/native";
import { Home } from "./screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const PlaceholderScreen: React.FC<StaticScreenProps<{ teste?: string }>> = () => null;

const RootTabs = createBottomTabNavigator({
    if: () => true,
    screens: {
        Lista: PlaceholderScreen,
        Home,
        Settings: PlaceholderScreen,
    },
});

const RootStack = createNativeStackNavigator({
    initialRouteName: 'Home',
    screenOptions: {
        headerShown: false,
    },
    screens: {
        login: {
            if: () => false,
            screen: PlaceholderScreen
        },
        RootTabs
    }
});


type RootStackParamList = StaticParamList<typeof RootStack>;

type RootTabsParamList = StaticParamList<typeof RootTabs>;

type NavigationParamsList = Omit<RootStackParamList, 'RootTabs'> & RootTabsParamList;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends NavigationParamsList { }
    }
}

export const Navigation = createStaticNavigation(RootStack);