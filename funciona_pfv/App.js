import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView} from 'react-native-gesture-handler'

import Routes from './src/routes/Index'

export default function App(){

    return(
        <NavigationContainer>
            <StatusBar translucent backgroundColor="#0C1F3F"/>
            <Routes/>
        </NavigationContainer>
    );
}


