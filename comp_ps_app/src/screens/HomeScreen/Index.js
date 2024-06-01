import{ View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView,FlatList} from 'react-native';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import {useState} from 'react';
import { useEffect } from 'react';

import {FontAwesome6} from '@expo/vector-icons'

import Header from '../../components/Header/Index'
import Buttom from '../../components/Buttom/Index'
import ModalAddUser from '../../components/ModalAddUser/Index';
import ModalRemoveUser from '../../components/ModalRemoveUser/Index';

import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc} from 'firebase/firestore';
import { firestore } from '../../config/Index';
import { auth } from '../../config/Index';



export default function HomeScreen(){

    const navigation = useNavigation();

    const [users, setUsers] = useState([]);
    const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);
    const [isRemoveUserModalVisible, setIsRemoveUserModalVisible] = useState(false);
    const [userToRemove, setUserToRemove] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'users'));
            const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(usersList);
        };
        fetchUsers();
    }, []);

    const addUser = async (newUser) => {
        try {
            const docRef = await addDoc(collection(firestore, 'users'), newUser);
            setUsers(prevUsers => [...prevUsers, { ...newUser, id: docRef.id }]);
            setIsAddUserModalVisible(false);
        } catch (e) {
            console.error("Erro ao adicionar documento: ", e);
        }
    };
    const confirmRemoveUser = user => {
        setUserToRemove(user);
        setIsRemoveUserModalVisible(true);
    };

    const removeUser = async () => {
        try {
            const userDoc = doc(firestore, 'users', userToRemove.id);
            await deleteDoc(userDoc);
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userToRemove.id));
            setIsRemoveUserModalVisible(false);
            setUserToRemove(null);
        } catch (e) {
            console.error("Erro ao remover documento: ", e);
        }
    };

    const updateUser = async (updatedUser) => {
        if (!updatedUser || !updatedUser.id || !updatedUser.matricula) {
            console.error("Updated user data is missing required fields", updatedUser);
            return;
        }
    
        try {
            const userDocRef = doc(firestore, 'users', updatedUser.id);
            await updateDoc(userDocRef, updatedUser);
            setUsers(prevUsers =>
                prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user))
            );
        } catch (e) {
            console.error("Erro ao atualizar documento: ", e);
        }
    };
    


    return(
        <View style = {styles.container}>
            <Header/>
            <FlatList
                data={users}
                renderItem={({ item }) => (
                    
                    <TouchableOpacity style={styles.userItem} onPress={() => navigation.navigate('MemberProfile', { user: item , onUpdateUser: updateUser})}>
                        <View style={styles.userInfoContainer}>
                            <View style = {styles.userInfo}>
                                <Text style = {styles.userInfoText}>Nome: {item.nome}</Text>
                                <Text style = {styles.userInfoText}>Idade: {item.idade}</Text>
                                <Text style = {styles.userInfoText}>Email: {item.email}</Text>
                                <Text style = {styles.userInfoText}>Matrícula: {item.matricula}</Text>
                            </View>
                            <View style={styles.userPhoto}>
                                {item.photo ? (
                                    <Image source={{ uri: item.photo }} style={styles.photo} />
                                ) : (
                                    <Image source={require('../../../assets/placeholder.png')} style={styles.photo} />
                                )}
                            </View>
                        </View>
                        
                        <View style = {styles.trashCan}>
                            <TouchableOpacity style={styles.userRemove} onPress={() => confirmRemoveUser(item)}>
                                <FontAwesome6 name="trash-can" size={20} color="#ff375b"/>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <Buttom onAddUser={addUser}
            style = {{ bottom: 80, right: 60}}/>
            {isAddUserModalVisible && <ModalAddUser onClose={() => setIsAddUserModalVisible(false)} onAddUser={addUser} />}
            {isRemoveUserModalVisible && (
                <ModalRemoveUser
                    visible={isRemoveUserModalVisible}
                    onConfirm={removeUser}
                    onCancel={() => setIsRemoveUserModalVisible(false)}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#E5E7EA",
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

    },
    userItem:{
        backgroundColor: '#E5E7EA',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    userInfo:{
        flex: 1,
        paddingRight: 10,
    },

    userInfoText: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },

    userRemove: {
        padding: 5,
    },
    userPhoto:{
        width: 80,
        height: 80,
        borderRadius: 50,
        marginBottom: 20,
    },
    photo:{
        width: "130%",
        height: '130%',
        borderRadius: 50,
        marginBottom: 20,
    },
    userInfoContainer:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginRight:'20%',
        marginBottom:'2%',

    },
    trashCan:{
        width:'100%',
        backgroundColor: '#E5E7EA',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 0,
    },


})
