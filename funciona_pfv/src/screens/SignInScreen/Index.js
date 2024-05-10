import React, { useState } from 'react'
import{ View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, TextInput} from 'react-native'
import { useNavigation } from '@react-navigation/native';


export default function SignInScreen(){

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    state = {
        email: '',
        password: '',
    }

        return(
            <SafeAreaView style = {styles.container}>
                <Image
                    source={require("../../../assets/Group1338.png")}
                    style={styles.logoImg}
                />

                <TextInput 
                    placeholder=' Email '
                    style={styles.input}
                    autoFocus={true}
                    keyboardType='email-address'
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput 
                    placeholder=' Senha '
                    style={styles.input}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style = {styles.buttom} onPress={() => navigation.navigate('HomeScreen')}>
                    <Text style = {styles.buttomText}>Entrar</Text>
                </TouchableOpacity>

            </SafeAreaView>
        )
    }

    const styles = StyleSheet.create({
        container:{
        flex:1,
            backgroundColor: "#0C1F3F",
            justifyContent: 'center',
            alignItems: 'center',
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
