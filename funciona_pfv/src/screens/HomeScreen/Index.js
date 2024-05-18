import{ View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView,FlatList} from 'react-native';
import * as React from 'react';
import { GestureHandlerRootView} from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import {useState} from 'react';

import {FontAwesome6} from '@expo/vector-icons'

import Header from '../../components/Header/Index'
import Buttom from '../../components/Buttom/Index'
import ModalAddUser from '../../components/ModalAddUser/Index';
import ModalRemoveUser from '../../components/ModalRemoveUser/Index';


export default function HomeScreen(){

    const [users, setUsers] = useState([]);
    const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);
    const [isRemoveUserModalVisible, setIsRemoveUserModalVisible] = useState(false);
    const [userToRemove, setUserToRemove] = useState(null);

    const addUser = newUser => {
        setUsers(prevUsers => [...prevUsers, newUser]);
        setIsAddUserModalVisible(false); // Fechar o modal após adicionar um usuário
    };
    const confirmRemoveUser = user => {
        setUserToRemove(user); // Define o usuário que será removido
        setIsRemoveUserModalVisible(true); // Abre o modal de confirmação
    };

    const removeUser = () => {
        setUsers(prevUsers => prevUsers.filter(user => user !== userToRemove));
        setIsRemoveUserModalVisible(false);
        setUserToRemove(null);
    };
    


    return(
        <View style = {styles.container}>
            <Header/>
            <FlatList
                data={users}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.userItem}>
                        <View style = {styles.userInfo}>
                            <Text style = {styles.userInfoText}>Nome: {item.nome}</Text>
                            <Text style = {styles.userInfoText}>Idade: {item.idade}</Text>
                            <Text style = {styles.userInfoText}>Email: {item.email}</Text>
                            <Text style = {styles.userInfoText}>Matrícula: {item.matricula}</Text>
                        </View>
                        <TouchableOpacity style={styles.userRemove} onPress={() => confirmRemoveUser(item)}>
                            <FontAwesome6 name="trash-can" size={24} color="red" />
                        </TouchableOpacity>
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
    },

    userRemove: {
        padding: 5,
    },

})
