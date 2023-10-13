import { View, Text, TextInput, StyleSheet, Pressable, KeyboardAvoidingView, SafeAreaView, Modal, } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import DatePicker from 'react-native-modern-datepicker';
import { usePeople } from '../context/PeopleContext';
import * as Crypto from 'expo-crypto';
import ScreenHeaders from '../components/ScreenHeaders';
import { AntDesign } from '@expo/vector-icons';

/*TODO:
validation modal window
add trim(), capitalize names + cleaning/formatting fn, ln and dob.
KEYBOARDAVOIDINGVIEW 
*/

export default function AddPersonScreen({navigation, route}) {
  const insets = useSafeAreaInsets(); //TODO:
  const [dob, setDob] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("");
  const [people, savePerson] = usePeople() //importing the savePerson function from context provider. 
  const [visibleDateModal, setVisibleDateModal] = useState(false);

  function avatarBg(){
    const colorArr = ["#fac273", "#83a3d3", "#eb7474", "#5dbaab","#625583" ]
    const bgColor = Math.floor(Math.random() * (colorArr.length + 1))
    return colorArr[bgColor]
  }

  let bgColor = avatarBg();

  function createPerson(fn, ln, dob){
    if(fn === "" || ln === "" || dob === "" ){
      console.warn("MISSING DATA")
    } else {
      console.log(bgColor)
      const personModel = {
        id: Crypto.randomUUID(),
        initials: `${fn.slice(0, 1)} ${ln.slice(0,1)}`,
        bgColor: avatarBg(),
        name: `${fn} ${ln}`,
        dob: dob,    
        ideas:[]
      }
      savePerson(personModel)   //saving through context.
      .then(() => navigation.navigate("PeopleScreen"))
    }
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
    
    <ScreenHeaders 
      screenName={"AddPersonScreen"}>
    </ScreenHeaders>

    <View style={{padding:20}}>    
      <KeyboardAvoidingView> 
          <Text>First Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setFirstName}
            value={firstName}
          />
      </KeyboardAvoidingView>
    </View>

    <View style={{padding:20}}>
      <KeyboardAvoidingView> 
        <Text>Last Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLastName}
          value={lastName}
        />
      </KeyboardAvoidingView>
    </View>

    <View style={{padding:20}}>
      <KeyboardAvoidingView> 
        <Text>Date of Birth</Text>
        <View style={{display:"flex", flexDirection:"row"}}>
          <Text style={styles.dobInput}> {dob} </Text>
          <Pressable 
            style={{paddingLeft:12.5, display:"flex", justifyContent:"center"}}
            onPress={() => setVisibleDateModal(true)}
          >
            <AntDesign name="calendar" size={24} color="black" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
            options={{
              backgroundColor: '#fff',
              textHeaderColor: '#000',
              textDefaultColor: '#000',
              selectedTextColor: '#fff',
              mainColor: '#5dbaab',
              textSecondaryColor: '#000',
              borderColor: '#fff',
            }}
          /> 
          <View style={{display:"flex", flexDirection:"row", justifyContent:"flex-end", alignItems:'center', marginTop:-50 ,backgroundColor:"#fff", width:"100%", paddingHorizontal:20, paddingBottom:15, borderBottomRightRadius:20, borderBottomLeftRadius:20}}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setVisibleDateModal(!visibleDateModal)}>
              <Text style={styles.textStyle}>Return</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>

      <View style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
      <KeyboardAvoidingView> 
        <Pressable 
          style={{height:40, width:80, backgroundColor:"#eb7474", display:"flex", justifyContent:"center", alignItems:"center", borderRadius:20}}
          onPress={()=> navigation.navigate("PeopleScreen")}
          >
          <Text> Cancel </Text>
        </Pressable>
        </KeyboardAvoidingView>

        <KeyboardAvoidingView> 
        <Pressable 
          style={{height:40, width:80, backgroundColor:"#5dbaab", display:"flex", justifyContent:"center", alignItems:"center", borderRadius:20}}
          onPress={()=> createPerson(firstName, lastName, dob)}
          >
          <Text> Save </Text>
        </Pressable>
        </KeyboardAvoidingView>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    width: 300,
    borderWidth: 1,
    borderRadius:5,
    backgroundColor:"#fff",
  },

  dobInput:{
    height: 45,
    width: 250,
    borderWidth: 1,
    borderRadius:5,
    backgroundColor:"#fff",
  },

  //MODAL
  centeredView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 110
  },

  button: {
    borderRadius: 20,
    padding: 15,
    // elevation: 2,
  },
  buttonClose: {
    backgroundColor:'#5dbaab',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    // backgroundColor:"red"
  },
});