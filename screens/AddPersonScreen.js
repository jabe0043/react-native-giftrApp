import { View, Text, TextInput, StyleSheet, Pressable, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import DatePicker from 'react-native-modern-datepicker';
import { usePeople } from '../context/PeopleContext';
import * as Crypto from 'expo-crypto';


/*TODO:
validation modal window
add trim(), capitalize names + cleaning/formatting fn, ln and dob.
add avatar to person model
*/

export default function AddPersonScreen({navigation, route}) {
  const insets = useSafeAreaInsets(); //TODO:
  const [dob, setDob] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("");
  const [people, savePerson] = usePeople() //importing the savePerson function from context provider. 

  let bgColor = avatarBg();

  function avatarBg(){
    const colorArr = ["#fac273", "#83a3d3", "#eb7474", "#5dbaab","#625583" ]
    const bgColor = Math.floor(Math.random() * (colorArr.length + 1))
    return colorArr[bgColor]
  }

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
  <View style={{ flex: 1, alignItems: 'center', backgroundColor:"#625583" }}>
    
    <View style={{backgroundColor:"#625583", width:"100%", height:75, display:"flex", justifyContent:"center", padding:20}}>
      <Text style={{color:"#fff"}}>Header Comp</Text>
    </View>

    <DatePicker 
      onSelectedChange={date => setDob(date)}
      mode="calendar"
      style={{ borderBottomLeftRadius: 25, borderBottomRightRadius:25}}
      options={{
        backgroundColor: '#83a3d3',
        textHeaderColor: '#fff',
        textDefaultColor: '#fff',
        selectedTextColor: '#fff',
        mainColor: '#625583',
        textSecondaryColor: '#fff',
        borderColor: 'rgba(122, 146, 165, 0.1)',
        flex:1
      }}
    /> 
    {/* *TODO: CHECK KEYBOARDAVOIDINGVIEW  */}

  <View style={{paddingTop:25}}>    
    <KeyboardAvoidingView> 
      {/* <View style={{paddingTop:25}}> */}
        <Text style={{color:"#fff"}}>First Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setFirstName}
          value={firstName}
          // placeholder="First Name"
        />
      {/* </View> */}
    </KeyboardAvoidingView>
  </View>

      <View>
      <KeyboardAvoidingView> 
        <Text style={{color:"#fff"}}>Last Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLastName}
          value={lastName}
          // placeholder="Last Name"
        />
            </KeyboardAvoidingView>
      </View>

      <View style={{display:"flex", flexDirection:"row", justifyContent:"space-around", paddingTop:15}}>
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

    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:25,
    backgroundColor:"#fff"
  },
});