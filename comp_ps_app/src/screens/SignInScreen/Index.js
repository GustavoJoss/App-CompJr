import React, { useState } from 'react'
import{ View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';


import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

import {useForm, Controller} from 'react-hook-form';

import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../../config/Index'

import { TextInput } from "react-native-paper";

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;



const schema = yup.object({
    email: yup.string().email("Email invalido").required("informe seu email"),
    password: yup.string().required("Informe sua senha")
})



export default function SignInScreen(){

    const [showPassword, setShowPassword] = useState(false);

    const { control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const navigation = useNavigation();

    const handleSignIn = async(data) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            const user = userCredential.user;
            //loginEfetuado
            console.log(user);

            navigation.navigate('HomeScreen')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        })
    }

        return(
            <View style = {styles.container}>
                <Image
                    source={require("../../../assets/Group1338.png")}
                    style={styles.logoImg}
                />
                
                <View style = {styles.formContainer}>
                    
                    <View>
                            <Controller
                                control = { control }
                                name = "email"
                                render = {({ field: { onChange, value } }) => (
                                    <TextInput 
                                        style={[styles.input, errors.email && styles.inputError]}
                                        placeholder='Email'
                                        textColor='#E5E7EA'
                                        placeholderTextColor='#E5E7EA'
                                        activeUnderlineColor='#E5E7EA'
                                        onChangeText={onChange}
                                        keyboardType='email-address'
                                        value={value}
                                    />

                                )}
                            />
                            {errors.email && <Text style = {styles.labelError}>{errors.email?.message}</Text>}
                    </View>

                        <View>

                            <Controller style = {styles.Controller}
                                control = { control }
                                name = "password"
                                render = {({ field: { onChange, value } }) => (
                                    <TextInput 
                                    style = {[styles.input, {
                                            borderWidth: errors.password && 1,
                                            borderColor: errors.password && '#ff375b',
                                            color: "#E5E7EA",
                                        }
                                    ]}
                                    activeUnderlineColor='#E5E7EA'
                                    placeholder=' Senha '
                                    textColor='#E5E7EA'
                                    placeholderTextColor={"#E5E7EA"}
                                    secureTextEntry = {!(showPassword)}
                                    value = {value}
                                    onChangeText = {onChange}
                                    right = {
                                        <TextInput.Icon 
                                            size={17}
                                            style={{opacity: 0.5}}
                                            icon = {showPassword ? 'eye' : 'eye-off'} 
                                            color = "#E5E7EA"
                                            onPress={() => setShowPassword(!showPassword)}
                                        />
                                    }


                                />
                        

                            )}
                            />
                            {errors.password && <Text style = {styles.labelError}>{errors.password?.message}</Text>}

                            
                        </View>
                        <View style = {styles.cadContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('RedPass')}>
                                <Text style = {[styles.textCad, {fontWeight: '600'}]}>
                                    Redefinir Senha
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style = {styles.buttonView}>
                        
                        <TouchableOpacity style = {styles.button} onPress={handleSubmit(handleSignIn)}>
                            <Text style = {styles.buttonText}>Entrar</Text>
                        </TouchableOpacity>
                        </View>

                        <View style = {styles.cadContainer}>
                            <Text style = {styles.textCad}>
                                Não tem uma conta?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                                <Text style = {[styles.textCad, {fontWeight: '600'}]}>
                                    Cadastre-se
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
        

                </View>
        )
    }

    const styles = StyleSheet.create({
        container:{
            flex:1,
            backgroundColor: "#0C1F3F",
            justifyContent: 'center',
            alignItems: 'center',
        },
        formContainer:{
            backgroundColor: "#0C1F3F",
            width: '80%',
            height: deviceHeight/2,
            borderRadius: 15,
            justifyContent: 'center',
            
        },
        buttonView:{
            justifyContent: 'center',
            alignItems:'center',
        },
        logoImg:{ 
            marginTop: 50,
            marginBottom: 40,
            width: 240,
            height:40,
            justifyContent: "center",
        },
        button:{
            backgroundColor:"#E5E7EA",
            width:'80%',
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            marginTop: 20,
        },
        buttonText:{
            color: "#0C1F3F",
            fontSize: 20,
        },
        buttonTextTwo:{
            color: "#E5E7EA",
            fontWeight: 'bold',
            alignItems: 'center',
        },
        input:{
            placeholderTextColor: '#E5E7EA',
            backgroundColor:"transparent",
            height: 40,
            width: "100%",
            justifyContent: "center",
            borderRadius: 10,
            marginBottom: 12,
            borderBottomWidth: 1,
            borderBottomColor: "#E5E7EA",
            color: 'blue',
            fontSize: 15,
        },
        text:{
            color: "#E5E7EA",
            marginBottom: 5,
        },
        labelError:{
            color: '#ff375b',
            marginBottom: 10, 
        },
        Controller:{
            backgroundColor: "yellow",
        },
        textCad: {
            color:"#E5E7EA",
            fontSize: deviceWidth*0.035
        },
        cadContainer: {
            marginTop: deviceHeight/30,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginHorizontal: '15%',
        },

    
    })
