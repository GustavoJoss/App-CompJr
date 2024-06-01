import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar } from 'react-native';

import Routes from './src/routes/Index'
import { UserProvider } from './src/contexts/MemberContext';

export default function App(){

    return(
        <UserProvider>
        <NavigationContainer>
            <StatusBar translucent backgroundColor="#0C1F3F"/>
            <Routes/>
        </NavigationContainer>
        </UserProvider>
    );
}


