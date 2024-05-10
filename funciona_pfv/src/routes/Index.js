import { createStackNavigator } from '@react-navigation/stack';

import Initial from '../screens/Initial/Index';
import SignInScreen from '../screens/SignInScreen/Index';
import HomeScreen from '../screens/HomeScreen/Index';
import SignUpScreen from '../screens/SignUpScreen/Index';

const Stack = createStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name = "Initial"
                component = {Initial}
                options = {{headerShown: false}}
            />
            <Stack.Screen
                name = "SignInScreen"
                component = {SignInScreen}
                options = {{headerShown: false}}
            />
            <Stack.Screen
                name = "HomeScreen"
                component={HomeScreen} 
                options = {{headerShown: false}}
            />
            <Stack.Screen
                name = "SignUpScreen"
                component = {SignUpScreen}
                options = {{headerShown: false}}
            />

        </Stack.Navigator>
    )
}

