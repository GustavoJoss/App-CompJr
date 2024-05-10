import React from 'react'
import {View, StyleSheet, Text, StatusBar, TouchableOpacity, Image} from 'react-native'

import {Feather} from '@expo/vector-icons'


const StatusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

export default function Header(){
    return(
        <View style = {styles.container}>
            <View style = {styles.content}>
                <Text style = {styles.username}>User</Text>

                <Image
                    source={require("../../../assets/Group1318.png")}
                    style={styles.image}
                />

                <TouchableOpacity style = {styles.buttonUser}>
                    <Feather name = "user" size = {27} color = "#E5E7EA"/>
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

