import{ View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import{Ionicons} from '@expo/vector-icons'
import { useForm } from 'react-hook-form'
import React, { useEffect, Alert } from 'react';
import * as yup from 'yup';
export function TinderSenha(){

    const fieldsValidationSchema = yup.object().shape({
        email: yup
        .string()
        .required('O email não pode ser vazio')
        .email('Digite um email válido'),
        password: yup
        .string()
        .required('A senha não pode ser vazia')
        .min(6, 'A senha deve conter pelo menos 6 dígitos')
    })

    const { register, setValue, handleSubmit, errors} = useForm({ validationSchema: fieldsValidationSchema });

    const onSubmit = (data) => Alert.alert('Title', `Email: ${data.email}, Password: ${data.password}`);
    useEffect(() => {
        register('email')
        register('password')
    }, [register])


    return(
        <View style={styles.container}>
            <View style={styles.content}>
                <TextInput
                style={styles.input}
                placeholder=" Insira seu Email"
                onChangeText={text => setValue('email', text)}
                />
            </View>
            <View style={styles.content}>
                <TextInput 
                style={styles.input}
                placeholder=" Insira sua Senha"
                onChangeText={text => setValue('password', text)}
                />
            </View>

            <View style={styles.contentButton}>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} text={'Continuar'}>
                        <Text style={styles.buttonText}>Fazer LogIn</Text>
                    </TouchableOpacity>
                </View>
            <View>
                <TouchableOpacity>
                    <Text style={styles.anotherButtonText}>Criar conta</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#FFF",
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',

    },

    content:{
        flexDirection: 'row',
        width: "80%",
        backgroundColor: "lightgrey",
        marginBottom: 24,
    },

    contentButton:{
        flexDirection: 'row',
        width: "80%",
        marginBottom: 24,
        justifyContent: 'center',
    },


    title:{
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 24,
    },
    button:{
        backgroundColor: "blue",
        width: "60%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    buttonText:{
        color: "#FFF",
    },
    anotherButtonText:{
        color: "#000"
    },
    input:{
        borderRadius: 8,
    },
    backButton:{

    }

})