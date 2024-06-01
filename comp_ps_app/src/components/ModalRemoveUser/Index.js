import React, { Component} from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

export default class ModalRemoveUser extends Component {
    render() {
        const {visible, onConfirm, onCancel} = this.props;
        return (
            <Modal
                transparent = {true}
                visible = {visible}
                animationType = "slide"
                onRequestClose={onCancel}
            >
                <View style = {styles.Container}>

                    <View style = {styles.Content}>

                        <Text style = {styles.Title}>Confirmar remoção</Text>

                        <Text>Você tem certeza que deseja remover esse membro?</Text>
                        <View style = {styles.buttonContainer}>

                            <TouchableOpacity style={styles.button} onPress={onConfirm}>
                                <Text style={styles.buttonText}>Sim</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button} onPress={onCancel}>
                                <Text style={styles.buttonText}>Não</Text>
                            </TouchableOpacity>

                        </View>

                    </View>

                </View>

            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    Container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    Content:{
        width: '80%',
        backgroundColor: '#FFF',
        padding: 20,
        borderRadious: 20,
        alignItems: 'center',
    },

    Title:{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    ConfirmationMessage:{
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',

    },

    button:{
        backgroundColor: '#0C1F3F',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: '40%',
        marginLeft: 10,
    },
    buttonContainer:{
        flexDirection: 'row',
        marginTop: 10,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
    },



})