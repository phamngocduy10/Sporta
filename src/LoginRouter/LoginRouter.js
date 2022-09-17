import { createStackNavigator } from '@react-navigation/stack';
import Account from '../Account/Account';
import CreateClub from '../Account/CreateClub';
import Settings from '../Account/Settings';
import Login from '../Login/Login';
import Register from '../Login/Register';
import { MainTab } from '../MainTab/MainTab';
import Match from '../Match/Match'

const Stack = createStackNavigator();

export function LoginRouter() {
    return (
        <Stack.Navigator
            initialRouteName="MainTab"
        >
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="CreateClub" component={CreateClub} />
            <Stack.Screen name="SearchClub" component={CreateClub} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="MainTab" component={MainTab} />
            <Stack.Screen name="Match" component={Match} />
        </Stack.Navigator>
    );
}