import{ View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Initial(){

    const navigation = useNavigation();

    return(

            <View style = {styles.container}>
                <Image
                    source={require("../../../assets/Group1338.png")}
                    style={styles.logoImg}
                />
                <Text style={styles.logoTextFirst}>
                    IDENTIFIER
                </Text>
                
                    <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('SignInScreen')}>
                        <Text style = {styles.buttonText}> Entrar </Text>
                    </TouchableOpacity>
                
            </View>
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
        height: 40,
        justifyContent: "center",
    },
    logoTextFirst:{
        marginBottom: 50,
        color: "#E5E7EA",
        fontSize: 20,
    },
    button:{
        backgroundColor:"#E5E7EA",
        width:'60%',
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
    },
    buttonText:{
        color: "#0C1F3F",
        fontSize: 20,
    },
    buttonTextTwo:{
        color: "#E5E7EA",
    },

})