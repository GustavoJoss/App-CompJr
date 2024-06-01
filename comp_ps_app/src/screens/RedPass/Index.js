import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import {useState} from 'react';

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/Index"

import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default function RedPass () {

    const navigation = useNavigation();

    const [email, setEmail] = useState ();

    function replacePass(){
        if(email !== '') {
            sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Foi enviado um email para: " + email + ". Verifique sua caixa de entrada")
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert("Ops! Alguma coisa não deu certo. " + errorMessage + ". Tente novamente ou pressione voltar");
                return;
            });
        } else{
            alert("É preciso informar um e-mail valido para efetuar a redefinicao de senha");
            return;
        }
    }
    return(
            <View style = {styles.container}>
                <Text style = {styles.title}>Redefinição de senha</Text>
                <AntDesign name="mail" size={90} color="#E5E7EA" />

                <Text style = {styles.subTitle}> Insira o email com o qual você realizou o cadastro, será enviada uma notificação para a redefinição de senha</Text>
                <View style = {styles.formContainer}>

                    <TextInput 
                        style = {styles.input}
                        placeholder=' Email '
                        placeholderTextColor={"#E5E7EA"}
                        keyboardType='email-adress'
                        autoCapitalize='none'
                        autoComplete='email'
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TouchableOpacity style = {styles.button} onPress={replacePass}>
                        <Text style = {styles.buttonText}>Enviar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.buttonTwo} onPress={() => navigation.navigate('SignInScreen')}>
                        <Text style = {styles.buttonTwo}>Voltar</Text>
                    </TouchableOpacity>


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
        height: deviceHeight/6,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent:  'center',
    },
    input:{
        backgroundColor:"transparent",
        height: 40,
        width: "100%",
        justifyContent: "center",
        borderRadius: 10,
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EA",
        color: "#E5E7EA",
        fontSize: 15,

    },
    title:{
        color: "#E5E7EA",
        alignItems: 'center',
        fontSize: 25,
        marginBottom: 10,
    },
    subTitle:{
        color: '#E5E7EA',
        fontSize: 16,
        marginHorizontal:'10%',
        marginBottom: '2.5%',
        marginTop: '2.5%',
    },
    button:{
        backgroundColor:"#E5E7EA",
        width: "80%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        marginBottom: 20,
    },
    buttonTwo:{
        color: "#E5E7EA",
    },
    buttonText:{
        color: "#0C1F3F",
        fontSize: 20,
    },
    

})