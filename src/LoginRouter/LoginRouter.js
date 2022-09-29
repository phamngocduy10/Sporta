import { createStackNavigator } from '@react-navigation/stack';
import Account from '../Account/Account';
import CreateClub from '../Account/CreateClub';
import Settings from '../Account/Settings';
import ByMail from '../Login/ByMail';
import ByPhone from '../Login/ByPhone';
import ForgetPassword from '../Login/ForgetPassword';
import Login from '../Login/Login';
import Register from '../Login/Register';
import { MainTab } from '../MainTab/MainTab';
import Match from '../Match/Match'

const Stack = createStackNavigator();

export function LoginRouter() {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Account" component={Account} options={{ gestureEnabled: true, gestureDirection: "horizontal", gestureResponseDistance: 400 }} />
            <Stack.Screen name="CreateClub" component={CreateClub} options={{ gestureEnabled: true, gestureDirection: "horizontal", gestureResponseDistance: 400 }} />
            <Stack.Screen name="SearchClub" component={CreateClub} options={{ gestureEnabled: true, gestureDirection: "horizontal", gestureResponseDistance: 400 }} />
            <Stack.Screen name="Settings" component={Settings} options={{ gestureEnabled: true, gestureDirection: "horizontal", gestureResponseDistance: 400 }} />
            <Stack.Screen name="Login" component={Login} options={{ gestureEnabled: true, gestureDirection: "horizontal", gestureResponseDistance: 400 }} />
            <Stack.Screen name="Register" component={Register} options={{ gestureEnabled: true, gestureDirection: "horizontal", gestureResponseDistance: 400 }} />
            <Stack.Screen name="MainTab" component={MainTab} />
            <Stack.Screen name="Match" component={Match} options={{ gestureEnabled: true, gestureDirection: "horizontal", gestureResponseDistance: 400 }} />
            <Stack.Screen name="ByPhone" component={ByPhone} options={{ gestureEnabled: true, gestureDirection: "horizontal", gestureResponseDistance: 400 }} />
            <Stack.Screen name="ByMail" component={ByMail} options={{ gestureEnabled: true, gestureDirection: "horizontal", gestureResponseDistance: 400 }} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ gestureEnabled: true, gestureDirection: "horizontal", gestureResponseDistance: 400 }} />
        </Stack.Navigator>
    );
}