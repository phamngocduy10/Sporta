import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Account from '../Account/Account';
import Match from '../Match/Match'

const Tab = createBottomTabNavigator();

export function MainTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Account" component={Account} />
            <Tab.Screen name="Match" component={Match} />
        </Tab.Navigator>
    );
}