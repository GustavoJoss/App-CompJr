
import React, { Component} from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Modal } from 'react-native';

export default class ModalAddUser extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            nome: '',
            email: '',
            idade: '',
            matricula: ''
        };
    }

    handleInputChange = (field, value) => {
        this.setState({ [field]: value });
    }

    handleAddUser = () => {
        const { nome, email, idade, matricula } = this.state;
        if (nome && email && idade && matricula) {
            console.log('typeof onAddUser é', typeof this.props.onAddUser);
            if (typeof this.props.onAddUser === 'function') {
                console.log('Chamando onAddUser com', this.state);
                this.props.onAddUser(this.state);
                this.setState({
                    nome: '',
                    email: '',
                    idade: '',
                    matricula: ''   
                });
                this.props.onClose();
            }
        } else {
            console.log("nao esta preenchido");
        }
    }


    render() {
        const { visible, onClose } = this.props;
        return (
            <Modal
                transparent={true}
                visible={visible}
                animationType="slide"
            >

                <View style = {styles.modalContainer}>

                    <View style = {styles.content}>

                        <Text style = {styles.modalTitle}>Adicionar Membro</Text>

                        <TextInput
                            style = {styles.input}
                            placeholder = "Nome"
                            value = {this.state.nome}
                            onChangeText = {value => this.handleInputChange('nome', value)}
                        />

                        <TextInput style = {styles.input} 
                            placeholder = "email"
                            autoFocus = {true}
                            keyboardType =  'email-address'
                            value = {this.state.email}
                            onChangeText = {value => this.handleInputChange('email', value)}
                        />

                        <TextInput
                            style = {styles.input}
                            placeholder = "Idade"
                            keyboardType = "numeric"
                            value = {this.state.idade}
                            onChangeText = {value => this.handleInputChange('idade', value)}
                        />

                        <TextInput
                            style = {styles.input}
                            placeholder = "Matricula"
                            keyboardType = "numeric"
                            value = {this.state.matricula}
                            onChangeText = {value => this.handleInputChange('matricula', value)}
                        />

                        <View style = {styles.textContent}>

                            <TouchableOpacity style = {styles.addButton} onPress = {this.handleAddUser}>
                                <Text style = {styles.addButtonText}>Adicionar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.addButton} onPress = {this.props.onClose}>
                                <Text style = {styles.addButtonText}>Cancelar</Text>
                            </TouchableOpacity>

                        </View>

                    </View>

                </View>

            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content:{
        width: '80%',
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    textContent:{
        marginLeft:'2%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: '5%',
    },
    modalTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        justifyContent:'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        width: 200,
        height: 50,
    },
    addButton:{
        
        backgroundColor: '#0C1F3F',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: '40%',
        flexDirection: 'row',
        marginLeft: 10,
    },
    addButtonText:{
        color: "#E5E7EA",
        fontWeight: 'bold',
    },
});