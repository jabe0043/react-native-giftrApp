import { View, Text, TextInput, StyleSheet, Pressable, KeyboardAvoidingView, SafeAreaView, Modal, ImageBackground } from 'react-native';
import { useState } from 'react';
import DatePicker from 'react-native-modern-datepicker';
import { usePeople } from '../context/PeopleContext';
import { useTheme } from '../context/ThemeProvider';
import * as Crypto from 'expo-crypto';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomModal from '../components/CustomModal';


export default function AddPersonScreen({navigation, route}) {
  const [people, savePerson] = usePeople() 
  const theme = useTheme();
  const [dob, setDob] = useState("");
  const [name, setName] = useState("");
  const [visibleDateModal, setVisibleDateModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProps, setModalProps] = useState({}) 

  function avatarBg(){
    const colorArr = ["#fac273", "#83a3d3", "#eb7474", "#5dbaab","#625583" ]
    const bgColor = Math.floor(Math.random() * (colorArr.length + 1))
    return colorArr[bgColor]
  }
  let bgColor = avatarBg();

  const showModal = () => {
    setModalVisible(true);
  };

  function handleConfirm(){
    setModalVisible(false);
  }

  function createPerson(name, dob){
    const personModel = {
      id: Crypto.randomUUID(),
      initials: name.trim().split(" ").map(word => word.slice(0, 1).toUpperCase()).join(" "),
      bgColor: bgColor ? bgColor : "#fac273",
      name: name,
      dob: dob,    
      ideas:[]
    }
    savePerson(personModel)   
    .then(() => navigation.navigate("PeopleScreen"))
    .catch(() =>{
      setModalProps({
        visible: modalVisible, 
        onConfirm: handleConfirm, 
        msg:"Something went wrong. User could not be saved.",
        btnInfo: {qty:1, text:"Return", color:"#5dbaab"} ,
      }),
      showModal()});
    }

  return (
  <SafeAreaView style={{ flex: 1 }}>
    <ImageBackground source={require('../assets/relationship-heart-stipple-illustrations.png')} resizeMode="cover" style={theme.bgImage}>
      <View style={theme.headerOverlay}>
        <Text style={theme.heroTitle}>
          Add a New {'\n'}Giftee
        </Text>
      </View>
    </ImageBackground>

    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View style={styles.formContainer}>
        <View style={styles.nameInputFlex}>
          <View style={styles.formInputContainer}>
            <View style={styles.nameContainer}>
              <Text style={{color:theme.colors.gray, fontSize:theme.types.smtext}}>
                Name
              </Text>
              <TextInput style={styles.nameInput}
                placeholder='Full Name'
                onChangeText={setName}
                value={name}
                autoCorrect={false}
                enterKeyHint='done'
                autoCapitalize='words'
              />
            </View>

            <View style={styles.dobContainer}>
              <Text style={{color:theme.colors.gray, fontSize:theme.types.smtext}}>
                Date of Birth
              </Text>
              <TextInput style={styles.dobInput}
                placeholder='yyyy-mm-dd'
                onChangeText={setDob}
                value={dob}
                editable={false}
              />
              <Pressable onPress={() => setVisibleDateModal(true)}>
                <View style={ styles.iconContainer}>
                  <MaterialCommunityIcons name="calendar-month-outline" size={24} color="#F9F6EE" />
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>


    <View style={theme.btnContainer}>
      <Pressable style={[theme.btn, theme.btnSecondary]}
        onPress={()=> navigation.navigate("PeopleScreen")}
        >
        <Text style={theme.btnTextStyle}> Cancel </Text>
      </Pressable>

      <Pressable 
        disabled={(name === "" || dob === "") ? true : false}
        style={[theme.btn, (name === "" || dob === "") ? theme.btnDisabled : null]}
        onPress={()=> createPerson(name, dob)}
        >
        <Text style={theme.btnTextStyle}> Save </Text>
      </Pressable>
    </View>

      <Modal
        animationType="slide"
        transparent
        visible={visibleDateModal}
      >
        <View style={styles.centeredView}>
          <DatePicker 
            onSelectedChange={date => setDob(date.replaceAll("/", "-"))}
            style={{borderTopLeftRadius:20, borderTopRightRadius:20}}
            mode="calendar"
            current={'2000-01-01'}
            selected="2000-01-01"
            options={styles.datePicker}
          /> 
          <View style={styles.modalBtnContainer}>
            <Pressable style={styles.modalButton}
              onPress={() => setVisibleDateModal(!visibleDateModal)}>
              <Text style={theme.btnTextStyle}>Return</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <CustomModal 
          visible= {modalVisible} 
          onConfirm={modalProps.onConfirm}
          msg={modalProps.msg}
          btnInfo={modalProps.btnInfo}
      />
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  formContainer:{
    width:"95%",
    alignSelf: "center",
    margin:20,
    display:"flex",
    justifyContent:"center",
    justifyContent:"space-between",
    alignItems:"space-between",
    gap:50,
    paddingTop:30,
  },

  formInputContainer:{
    width:"100%",
    display:"flex",
    gap:5,
  },

  input: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor:'#80808077',
    borderRadius:7,
    backgroundColor:"#fff",
    paddingLeft:10,
  },

  nameInputFlex:{
    display:"flex",
    width:"100%",
    flexDirection:"row",
    justifyContent:"flex-start",
  },

    formInputContainer:{
    flex:1,
    width:"100%",
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:20
  },

  nameContainer:{
    width:"65%",
    gap:5,
  },

  dobContainer:{
    width:"33%",
    gap:5
  },

  nameInput: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor:'#80808077',
    borderRadius:7,
    backgroundColor:"#fff",
    paddingLeft:10,
  },

  dobInput:{
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor:'#80808077',
    borderRadius:7,
    backgroundColor:"#fff",
    paddingLeft:10,
  },

    iconContainer:{
      display:"flex",
      alignItems:"center",
      padding:5,
      marginTop:5,
      backgroundColor:'#5dbaab88',
      backgroundColor:"#fac273",
      borderRadius: 7,
    },

  datePicker:{
    backgroundColor: '#fff',
    textHeaderColor: '#000',
    textDefaultColor: '#000',
    selectedTextColor: '#fff',
    mainColor: '#5dbaab',
    textSecondaryColor: '#000',
    borderColor: '#fff',
  },

  //MODAL
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#0000005f",    
    flex:1,
  },

  modalButton: {
    borderRadius: 7,
    padding: 15,
    backgroundColor:'#5dbaab',
  },

  modalBtnContainer:{
    display:"flex", 
    flexDirection:"row", 
    justifyContent:"flex-end", 
    backgroundColor:"#fff", 
    width:"100%", 
    paddingHorizontal:15, 
    paddingBottom:15, 
    borderBottomRightRadius:20, 
    borderBottomLeftRadius:20
  },
});