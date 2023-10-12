import { useState } from 'react';
// import { View, Text, TextInput,KeyboardAvoidingView, StyleSheet, Pressable } from 'react-native';
import {View,Pressable, KeyboardAvoidingView,TextInput,StyleSheet,Text,Platform,TouchableWithoutFeedback,Button,Keyboard} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



export default function AddIdeaScreen({route, navigation}) {
  const insets = useSafeAreaInsets();
  const [giftName, setGiftName] = useState("");

  console.log(giftName)

  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
      <View>
        <KeyboardAvoidingView> 
          <Text>Gift Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setGiftName}
            value={giftName}
          />
        </KeyboardAvoidingView>
      </View>

      <View style={{display:"flex", flexDirection:"row", justifyContent:"space-around", paddingTop:15}}>
        <Pressable 
          style={{height:40, width:80, backgroundColor:"#5dbaab", display:"flex", justifyContent:"center", alignItems:"center", borderRadius:20}}
          onPress={()=> createPerson(firstName, lastName, dob)}
          >
          <Text>Save</Text>
        </Pressable>
        <Pressable 
            style={{height:40, width:80, backgroundColor:"#eb7474", display:"flex", justifyContent:"center", alignItems:"center", borderRadius:20}}
            onPress={()=> navigation.navigate("PeopleScreen")}
        >
          <Text>Cancel</Text>
        </Pressable>
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
  container: {
    flex: 1,
  }
});