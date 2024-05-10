import{ View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView,} from 'react-native';
import * as React from 'react';
import { GestureHandlerRootView} from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header/Index'

import Buttom from '../../components/Buttom/Index'

export default function HomeScreen(){

    return(
        <View style = {styles.container}>
            <Header/>
            <Buttom
            style = {{ bottom: 80, right: 60}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#E5E7EA",
    },
    logoImg:{ 
        marginTop: 50,
        marginBottom: 40,
        width: 240,
        height:40,
        justifyContent: "center",
    },
    buttom:{
        backgroundColor:"#E5E7EA",
        width: "50%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        marginBottom: 20,
    },
    buttomText:{
        color: "#0C1F3F",
    },
    buttomTextTwo:{
        color: "#E5E7EA",
    },
    input:{
        backgroundColor:"#E5E7EA",
        width: "70%",
        height: 30,
        justifyContent: "center",
        borderRadius: 10,
        marginBottom: 20,

    }

})
