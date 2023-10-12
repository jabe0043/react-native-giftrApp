import { useState, useEffect, useRef } from 'react';
import {useWindowDimensions, View, ScrollView, Pressable, Image, KeyboardAvoidingView, TextInput, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera, CameraType } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons'; 
import { usePeople } from '../context/PeopleContext';
import * as Crypto from 'expo-crypto';






export default function AddIdeaScreen({route, navigation}) {
  const insets = useSafeAreaInsets();
  const [giftName, setGiftName] = useState("");
  const screen = useWindowDimensions();
  const screenWidth = screen.width;
  const screenHeight = screen.height;
  let camera = useRef();
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [status, requestPermission] = Camera.useCameraPermissions();
  const [img, setImg] = useState(null)
  const { personId, person } = route.params   //accessing the personId route param passed by the FAB.
  const [people, savePerson, removePerson, getGifts, gifts, saveGifts] = usePeople(); //using context


  useEffect(()=>{
    requestPermission().then(perm => {
      if(perm.status === 'granted'){
        setHasPermission(true)
      }
    })
    .catch()//TODO:
  }, []) 

  function takePhoto(){
    if(!hasPermission){
      console.log("No Camera Access Permission Given.");
      return;
    }
    const opts ={
      quality: 0.8, // 0 - 1
      zoom: 0.2, // 0 - 1 
      imageType: 'jpg',
      skipProcessing: false,
    }
    camera.takePictureAsync()
    .then(pic =>{
      // console.log(pic.uri)
      // console.log(pic.width)
      // console.log(pic.height)
      let w = screenWidth * 0.8;
      let h = (w/pic.width) * pic.height
      setImg({uri: pic.uri, width: w, height: h})
    })
    .catch(err => console.log(err.message));
  }

  //create the gift model and save it through context
  function createAndSaveGift(personId){
    const giftModel = {
      giftId: Crypto.randomUUID(),
      giftName: giftName,
      img: img.uri,
      width: img.width,
      height: img.height
    }
    // console.log("Gift model:", giftModel)
    saveGifts(personId, giftModel)
    .then(()=>navigation.navigate("IdeaScreen", {
      person: person, 
      personId: personId 
    }))
  }


  return (
      <View style={[styles.container, {paddingVertical: img ? 40 : 0}]}>
      <View>
        {
          hasPermission ? (
          <>
            <Camera 
              style={{width: screenWidth, height: img ? screenHeight * 0 : screenHeight * 0.8}}
              type={type} 
              ref={(r)=>{camera= r}}>
              </Camera>
          </>
          ) : (<Text style={styles.txt}>Please allow Camera </Text>)
        }
      </View>
      <View>
        {img ? (
          <View style={{alignSelf:"center"}}>
            <Image source={{uri: img.uri}} style= {{ width: img.width, height: img.height}}/>
            <View >
              <KeyboardAvoidingView> 
                <Text>Gift Name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setGiftName}
                  value={giftName}
                  // placeholder="Last Name"
                />
              </KeyboardAvoidingView>
              <View style={{display:"flex", flexDirection:"row", justifyContent:"space-around", paddingTop:15}}>
                <Pressable 
                    style={{height:40, width:80, backgroundColor:"#eb7474", display:"flex", justifyContent:"center", alignItems:"center", borderRadius:20}}
                    onPress={()=> console.log("cancel and go back to idea screen")}
                >
                  <Text>Cancel</Text>
                </Pressable>
                <Pressable 
                  style={{height:40, width:80, backgroundColor:"#5dbaab", display:"flex", justifyContent:"center", alignItems:"center", borderRadius:20}}
                  onPress={()=> createAndSaveGift(personId)}
                  >
                    <Text>Save</Text>
                </Pressable>
              </View> 
            </View>
          </View>
        ) : (
          <View style={{display: "flex", alignItems:"center", justifyContent:"center"}}>
            {/* <Text style={styles.txt}>No images taken yet.</Text> */}
            <Pressable onPress={()=>{ takePhoto() }}>
              <View style={{backgroundColor:'black', flex:1, alignItems:'center'}}>
                <MaterialIcons name="camera-alt" size={50} color="white"/>
              </View>
            </Pressable>
          </View>
        )}
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
    // paddingVertical: 40 //see inline styling
    // paddingHorizontal: 20,
  },
  txt:{
    fontSize: 20
  }
});