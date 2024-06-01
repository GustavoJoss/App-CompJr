import React, { useState } from 'react'
import{ View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

import {useForm, Controller} from 'react-hook-form'

import {auth} from '../../config/Index'
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { TextInput } from "react-native-paper";

let deviceHeight = Dimensions.get('window').height;

const schema = yup.object({
    email: yup.string()
        .email("Email invalido")
        .required("Informe seu email"),
    password: yup.string()
        .test('len', "A senha deve ter mais de 6 caracteres", val => val.length > 6)
        .required("Informe sua senha"),
    confPass: yup.string()
        .oneOf([yup.ref('password'), null], "As senhas não são iguais")
        .required("Confirme sua senha")
});

export default function SignInScreen(){

    const [showPassword, setShowPassword] = useState(false);
    const [showConfPass, setShowConfPass] = useState(false);

    const handleSignUp = async (data) => {
        // Check if any of the fields are empty
        if (data.email === '' || data.password === '' || data.confPass === '') {
            alert('Todos os campos devem ser preenchidos');
            return;
        }
    
        // Check if the passwords match
        if (data.password !== data.confPass) {
            alert('As duas senhas devem ser iguais');
            return;
        }
    
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
            alert(`O usuário ${data.email} foi criado. Faça o login`);
            
            // Navigate to the SignInScreen
            navigation.navigate('SignInScreen');
        } catch (error) {
            // Handle errors here
            console.error(error);
            alert('Erro ao criar usuário: ' + error.message);
        }
    };

    const navigation = useNavigation();

    const { control, handleSubmit, formState: { errors }  } = useForm ({
        resolver: yupResolver(schema)
    })

        return(
            <View style = {styles.container}>
                <Image
                    source={require("../../../assets/Group1338.png")}
                    style={styles.logoImg}
                />

                    <View style = {styles.formContainer}>
                    
                            <Controller
                                control = { control }
                                name = "email"
                                render = {({ field: { onChange, value } }) => (
                                    <TextInput 
                                        style = {[styles.input, {
                                            borderWidth: errors.email && 1,
                                            borderColor: errors.email && '#ff375b'
                                        }]

                                        }
                                        activeUnderlineColor='#E5E7EA'
                                        placeholder=' Email '
                                        textColor='#E5E7EA'
                                        placeholderTextColor={"#E5E7EA"}
                                        autoFocus = {true}
                                        onChangeText = {onChange}
                                        keyboardType = 'email-address'
                                        value = {value}
                                    />

                                )}
                            />
                            {errors.email && <Text style = {styles.labelError}>{errors.email?.message}</Text>}



                                <Controller
                                    control = { control }
                                    name = "password"
                                    render = {({ field: { onChange, value } }) => (
                                        <TextInput 
                                        style = {[styles.input, {
                                                borderWidth: errors.password && 1,
                                                borderColor: errors.password && '#ff375b'
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

                                <Controller
                                    control = { control }
                                    name = "confPass"
                                    render = {({ field: { onChange, value } }) => (
                                        <TextInput 
                                        style = {[styles.input, {
                                                borderWidth: errors.password && 1,
                                                borderColor: errors.password && '#ff375b'
                                            }
                                        ]}
                                        placeholder=' Confirme a Senha '
                                        textColor='#E5E7EA'
                                        placeholderTextColor={"#E5E7EA"}
                                        secureTextEntry = {!(showConfPass)}
                                        value = {value}
                                        onChangeText = {onChange}
                                        activeUnderlineColor='#E5E7EA'
                                        right = {
                                            <TextInput.Icon 
                                                size={17}
                                                style={{opacity: 0.5}}
                                                icon = {showConfPass ? 'eye' : 'eye-off'} 
                                                color = "#E5E7EA"
                                                onPress={() => setShowConfPass(!showConfPass)}
                                            />
                                        }

                                />

                                

                                    )}
                                />
                                {errors.confPass && <Text style = {styles.labelError}>{errors.confPass?.message}</Text>}
                                <View style = {styles.buttonView}>
                                    <TouchableOpacity style = {styles.button} onPress={handleSubmit(handleSignUp)}>
                                        <Text style = {styles.buttonText}>Concluir cadastro</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style = {styles.buttonTwo} onPress={() => navigation.navigate('SignInScreen')}>
                                        <Text style = {styles.buttonTwo}>Voltar</Text>
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
        logoImg:{ 
            marginTop: 50,
            marginBottom: 40,
            width: 240,
            height:40,
            justifyContent: "center",
        },
        button:{
            backgroundColor:"#E5E7EA",
            height: 40,
            width: '80%',
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            marginBottom: 20,
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
            backgroundColor:"transparent",
            height: 40,
            width: "100%",
            justifyContent: "center",
            borderRadius: 10,
            marginBottom: 12,
            borderBottomWidth: 1,
            borderBottomColor: "#E5E7EA",
            color: "#E5E7EA",
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
        buttonTwo:{
            color: "#E5E7EA",
        },
        buttonView:{
            justifyContent: 'center',
            alignItems: 'center',
        },
    
    })