import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import VSIcon from '../VSIcon';
import { TabBarContainer, TabButton, TabIcon, TabLabel } from './styles';

const VSTab: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
    const tabs = {
        Lista: 'home',
        Home: 'scale-outline',
        Settings: 'settings-outline',
    };

    return (
        <TabBarContainer>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                    if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
                };

                const onLongPress = () => navigation.emit({ type: 'tabLongPress', target: route.key });

                return (
                    <TabButton onPress={onPress} onLongPress={onLongPress} key={route.key}>
                        <TabIcon name={tabs[route.name]} focused={isFocused} />
                        <TabLabel bold size={15} focused={isFocused}>{route.name}</TabLabel>
                    </TabButton>
                );
            }
            )}
        </TabBarContainer>
    );
};

export default VSTab;