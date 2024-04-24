import{ useState } from 'react'
import{TinderSenha} from './src/components/modal'
import{ View, Text, StyleSheet, Image, TouchableOpacity, Modal} from 'react-native'

export default function App(){
  const[modalVisible, setModalVisible] = useState(false);

  function saberClicou(){
    setModalVisible(true);
  }

  return(
    <View style = {styles.container}>
      <Image
      source={require("./src/assets/reyna.png")}
      style={styles.logo}
      />
      <Text style={styles.logo}>
        Valorant Tinder
      </Text>
      <TouchableOpacity style ={styles.button} onPress={saberClicou}>
        <Text style ={styles.buttonText}> Entrar </Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="fade" transparente={true}>
        <TinderSenha/>
      </Modal>

    </View>
    )
  }

  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: "white",
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo:{
      marginBottom: 30,
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
    }

  })
