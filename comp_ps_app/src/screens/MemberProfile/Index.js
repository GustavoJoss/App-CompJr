import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import Header from '../../components/Header/Index';
import * as ImagePicker from 'expo-image-picker';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();


import firestore from '@react-native-firebase/firestore';
import { doc, getDoc, runTransaction } from 'firebase/firestore';

export default function MemberProfile({ route, navigation }) {
    const { user, onUpdateUser } = route.params;
    const [nome, setNome] = useState(user?.nome || '');
    const [idade, setIdade] = useState(user?.idade || '');
    const [email, setEmail] = useState(user?.email || '');
    const [matricula, setMatricula] = useState(user?.matricula || '');
    const [photo, setPhoto] = useState(user?.photo || null);

    useEffect(() => {
        setNome(user?.nome || '');
        setIdade(user?.idade || '');
        setEmail(user?.email || '');
        setMatricula(user?.matricula || '');
        setPhoto(user?.photo || null);
    }, [user]);

        useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={handleSave}>
                    <Text style={styles.saveButton}>Salvar</Text>
                </TouchableOpacity>
            ),
        });
    }, [nome, idade, email, matricula, photo]);

    const handleSave = async () => {
        let userId = user?.id;
    
        if (!userId) {
            const userCounterRef = doc(firestore, 'counters', 'userCounter');
        
            try {
                await runTransaction(firestore, async (transaction) => {
                    const docSnap = await transaction.get(userCounterRef);
                    if (!docSnap.exists()) {
                    transaction.set(userCounterRef, { count: 1 });
                    userId = '1';
                    } else {
                        const newId = docSnap.data().count + 1;
                        transaction.update(userCounterRef, { count: newId });
                        userId = newId.toString();
                    }
                });
            } catch (error) {
            console.error("Transaction failed: ", error);
            return;
            }
        }
    
    const updatedUser = { ...user, id: userId, nome, idade, email, matricula, photo };
    
    if (!updatedUser.id || !updatedUser.matricula) {
        console.error("Missing required fields before calling updateUser", updatedUser);
    } else {
        onUpdateUser(updatedUser);
        navigation.goBack();
    }
};

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        } else {
            alert('Você não selecionou uma  imagem');
        }
    };

    return (
        <View style={styles.container}>
        <Header />
        <View style={styles.content}>
            <TouchableOpacity onPress={pickImageAsync}>
            <Image
                source={photo ? { uri: photo } : require('../../../assets/placeholder.png')}
                style={styles.photo}
            />
            </TouchableOpacity>

            <Text>Nome:</Text>
            <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            />
            <Text>Idade:</Text>
            <TextInput
            style={styles.input}
            value={idade}
            onChangeText={setIdade}
            keyboardType="numeric"
            />
            <Text>Email:</Text>
            <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            />
            <Text>Matrícula:</Text>
            <TextInput
            style={styles.input}
            value={matricula}
            onChangeText={setMatricula}
            />
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
}

const styles = StyleSheet.create ({
    container:{
        flex: 1,
        backgroundColor: "#E5E7EA",

    },
    content:{
        flex: 1,
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        width: "100%",
        height: 50,
    },
    button:{
        backgroundColor:"#0C1F3F",
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        marginBottom: 20,
    },
    buttonText:{
        color: "#E5E7EA",
    },
    photo:{
        width: 80,
        height: 80,
        borderRadius: 50,
        marginBottom: 20,
    }
})