import { View, Text, TextInput, StyleSheet, Pressable, KeyboardAvoidingView, SafeAreaView, Modal, ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import DatePicker from 'react-native-modern-datepicker';
import { usePeople } from '../context/PeopleContext';
import * as Crypto from 'expo-crypto';
// import ScreenHeaders from '../components/ScreenHeaders';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/*TODO:
validation modal window
add trim(), capitalize names + cleaning/formatting fn, ln and dob.
KEYBOARDAVOIDINGVIEW 
*/

export default function AddPersonScreen({navigation, route}) {
  const insets = useSafeAreaInsets(); //TODO:
  const [dob, setDob] = useState("");
  // const [firstName, setFirstName] = useState("")
  // const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [people, savePerson] = usePeople() //importing the savePerson function from context provider. 
  const [visibleDateModal, setVisibleDateModal] = useState(false);

  function avatarBg(){
    const colorArr = ["#fac273", "#83a3d3", "#eb7474", "#5dbaab","#625583" ]
    const bgColor = Math.floor(Math.random() * (colorArr.length + 1))
    return colorArr[bgColor]
  }

  let bgColor = avatarBg();

  // function createPerson(fn, ln, dob){
    function createPerson(name, dob){
    // if(fn === "" || ln === "" || dob === "" ){
    //   console.warn("MISSING DATA")
    if( name === "" || dob === "" ){
      console.warn("MISSING DATA")
    } else {
      console.log(bgColor)
      const initials = name.trim() //new
      const personModel = {
        id: Crypto.randomUUID(),
        // initials: `${fn.slice(0, 1)} ${ln.slice(0,1)}`,
        // initials: `${initials[0].slice(0,1)} ${initials[1].slice(0,1)} `,
        initials: initials.split(" ").length > 1 ? `${initials[0].slice(0,1)} ${initials[1].slice(0,1)}` : `${initials[0].slice(0,1)}`,
        bgColor: bgColor ? bgColor : "#fac273",
        // name: `${fn} ${ln}`,
        name: name,
        dob: dob,    
        ideas:[]
      }
      savePerson(personModel)   //saving through context.
      .then(() => navigation.navigate("PeopleScreen"))
    }
  }


  return (
  <SafeAreaView style={{ flex: 1 }}>

    <ImageBackground source={require('../assets/relationship-heart-stipple-illustrations.png')} resizeMode="cover" style={styles.image}>
      <View style={styles.headerOverlay}>
        <Text style={styles.heroTitle}>Add a New {'\n'}Giftee</Text>
      </View>
    </ImageBackground>

    <View style={styles.formContainer}>
      <View style={styles.nameInputFlex}>
        
        <View style={styles.testFormInputContainer}>
          <View style={styles.testName}>
            <Text>Name</Text>
            <TextInput style={styles.nameInput}
              onChangeText={setName}
              value={name}
              // autoCapitalize='words'
            />
          </View>

          <View style={styles.testDob}>
            <Text>Date of Birth</Text>
            <TextInput style={styles.testDobInput}
              onChangeText={setDob}
              value={dob}
              placeholder='dob'
              
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

    <View style={styles.centeredView}>
      <Modal
        animationType="slide-down"
        transparent={true}
        visible={visibleDateModal}
        >
        <View style={styles.centeredView}>
          <DatePicker 
            onSelectedChange={date => setDob(date.replaceAll("/", "-"))}
            style={{borderTopLeftRadius:20, borderTopRightRadius:20}}
            mode="calendar"
            current={'2000-01-01'}
            options={styles.datePicker}
          /> 
          <View style={styles.modalBtnContainer}>
            <Pressable style={styles.modalButton}
              onPress={() => setVisibleDateModal(!visibleDateModal)}>
              <Text style={styles.textStyle}>Return</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>

    <View style={styles.btnContainer}>
      <Pressable style={[styles.btn, styles.btnSecondary]}
        onPress={()=> navigation.navigate("PeopleScreen")}
        >
        <Text style={{color:"#fff", fontWeight:"600"}}> Cancel </Text>
      </Pressable>

      <Pressable style={styles.btn}
        // onPress={()=> createPerson(firstName, lastName, dob)}
        onPress={()=> createPerson(name, dob)}
        >
        <Text style={{color:"#fff", fontWeight:"600"}}> Save </Text>
      </Pressable>
    </View>

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

  //****TEST
  nameInputFlex:{
    display:"flex",
    width:"100%",
    flexDirection:"row",
    justifyContent:"flex-start",
  },

    testFormInputContainer:{
      flex:1,
    width:"100%",
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:20
  },

  testName:{
    width:"65%",
  },

  testDob:{
    width:"33%",
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

  testDobInput:{
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

  //** END TEST */

  // save and del btn container
  btnContainer:{
    alignSelf:"center",
    width:"95%",
    paddingBottom:25,
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:"center",
    // backgroundColor:"red",
  },  

  //save btn (primary btn)
  btn:{
    height:50, 
    width:"49%", 
    backgroundColor:"#5dbaab", 
    display:"flex", 
    justifyContent:"center", 
    alignItems:"center", 
    borderRadius:7
  },

  //cancel btn
  btnSecondary:{
    backgroundColor:"#eb7474"
  },

  dobInput:{
    height: 45,
    width: 250,
    borderWidth: 1,
    borderRadius:5,
    backgroundColor:"#fff",
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
    marginTop: 110
  },

  modalButton: {
    borderRadius: 7,
    padding: 15,
    backgroundColor:'#5dbaab',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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

/******* */
  image: {
    flex: 1,
    backgroundColor:"#5dbaab", 
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  heroTitle: {
    color: 'white',
    fontSize: 42,
    lineHeight: 40,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 50
  },

  headerOverlay:{
    width:"100%", 
    height:"100%", 
    display:"flex", 
    justifyContent:"center",
    backgroundColor: '#00000040',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20
  }
});