import{ View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView,} from 'react-native';
import * as React from 'react';
import { GestureHandlerRootView} from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';

export default function Initial(){

    const navigation = useNavigation();

    return(

            <SafeAreaView style = {styles.container}>
                <Image
                    source={require("../../../assets/Group1338.png")}
                    style={styles.logoImg}
                />
                <Text style={styles.logoTextFirst}>
                    IDENTIFIER
                </Text>
                <TouchableOpacity style = {styles.buttom} onPress={() => navigation.navigate('SignInScreen')}>
                    <Text style = {styles.buttomText}> Entrar </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                    <Text style= {styles.buttomTextTwo}>Criar Conta</Text>
                </TouchableOpacity>
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#0C1F3F",
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImg:{ 
        marginTop: 30,
        marginBottom: 10,
        width: 240,
        height:40,
        justifyContent: "center",
    },
    logoTextFirst:{
        marginBottom: 50,
        color: "#E5E7EA",
        fontSize: 20,
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
    }

})