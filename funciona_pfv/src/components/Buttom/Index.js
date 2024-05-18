import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Animated, Modal} from 'react-native';
import {AntDesign, Entypo} from '@expo/vector-icons'
import ModalAddUser from '../ModalAddUser/Index';

export default class Buttom extends Component {

    state = {
        isModalVisible: false,
    };


    animation = new Animated.Value(0);
    open = false;

    toggleMenu = () => {
        const toValue = this.open ? 0 : 1

        Animated.spring(this.animation, {
            toValue,
            friction: 6,
            useNativeDriver: false
        }).start();

        this.open = !this.open;
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    handleAddUser = newUser => {
        this.props.onAddUser(newUser);
        this.toggleModal(); // Fechar o modal após adicionar um usuário
    };

    render(){

        const addUserGroupStyle = {
            transform: [
                { scale: this.animation },
                {
                    translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [80, -55]
                    })
                }
            ]
        }

        const rotation = {
            transform: [
                {
                    rotate: this.animation.interpolate({
                        inputRange:[0, 1],
                        outputRange: ["0deg", "45deg"]
                    })
                }
            ]
        }
        return(
            <View style = {[styles.container, this.props.style]}>

                <TouchableWithoutFeedback onPress={this.toggleModal}>
                    <Animated.View style = {[styles.buttom, styles.submenu, addUserGroupStyle]}>
                        <AntDesign name = "addusergroup" size = {20} color = "#FFF"/> 
                    </Animated.View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress = {this.toggleMenu}>
                    <Animated.View style = {[styles.buttom, styles.menu, rotation]}>
                        <AntDesign name = "plus" size = {24} color = "#FFF"/>
                    </Animated.View>
                </TouchableWithoutFeedback>

                {this.state.isModalVisible && (
                    <ModalAddUser onClose={this.toggleModal} onAddUser={this.handleAddUser} />
                )}


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        position: "absolute",

    },
    buttom:{
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 10,
        shadowColor: '#00213B',
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 10,
        }
    },
    menu:{
        backgroundColor: '#00213B',
    },
    submenu:{
        width: 48,
        height:48,
        borderRadius: 48/2,
        backgroundColor: '#00213B',
    }
})