import React from 'react'
import {View, StyleSheet, Text, StatusBar, TouchableOpacity, Image} from 'react-native'

import {auth} from '../../config/Index';

import { signOut } from 'firebase/auth';

import { useNavigation } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons'




const StatusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

export default function Header(){

    const navigation = useNavigation();
    const currentUser = auth.currentUser;

    if(currentUser != null){
        //logado
    } else {
        alert ('E necessario estar logado para utilizar este recurso')
    }

    function logout(){
        signOut(auth)
        .then(() => {
            alert('Você desconectou-se do sistema');
            navigation.navigate('Initial')
        })
        .catch((error) => {
            const errorMessage = error.errorMessage;
            alert(errorMessage);
        })
    }

    return(
        <View style = {styles.container}>
            <View style = {styles.content}>
                <Text style = {styles.username}>User</Text>

                <Image
                    source={require("../../../assets/Group1318.png")}
                    style={styles.image}
                />

                <TouchableOpacity style = {styles.buttonUser} onPress={logout}>
                    <Ionicons name="log-out" size = {32} color = {'white'}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: "#0C1F3F",
        paddingTop: StatusBarHeight,
        flexDirection: 'row',
        paddingStart: 16,
        paddingEnd: 16,
        paddingBottom: 30,
    },
    content:{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    username:{
        fontSize: 20,
        color: "#E5E7EA", 
        fontWeight: 'bold',
        
    },
    image: {
        height: 25,
        width: 100,
        justifyContent: 'center',
    }

})

