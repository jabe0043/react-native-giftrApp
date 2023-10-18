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
  const { personId } = route.params   //accessing the personId route param passed by the FAB.
  const [people, savePerson, removePerson, getGifts, gifts, saveGifts] = usePeople(); //using context

  console.log(personId);
  console.log(route.params);

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
      console.log("No Camera Access Permission Given.");  //modal
      return;
    }
    const opts ={
      quality: 0.8, 
      zoom: 0.2,
      imageType: 'jpg',
      skipProcessing: false,
    }
    camera.takePictureAsync()
    .then(pic =>{
      let w = screenWidth * 0.5;
      let h = (w * 3) / 2;
      console.log("w,pic width, pic height", w, pic.width, pic.height)
      console.log('PIC DIMENSION:', w, h)
      setImg({uri: pic.uri, width: w, height: h})
    })
    .catch(err => console.log(err.message));
  }

  //create the gift model and save it through context
  function createAndSaveGift(personId){
    if( giftName === "" ){
      console.warn("MISSING DATA")
    } else{
      const giftModel = {
        giftId: Crypto.randomUUID(),
        giftName: giftName,
        img: img.uri,
        width: img.width,
        height: img.height
      }
      saveGifts(personId, giftModel)
      .then(()=>navigation.navigate("IdeaScreen", {
        personId: personId 
      }))
    }
  }


  return (
      <View style={[styles.container, {paddingVertical: img ? 40 : 0}]}>
      <View>
        { hasPermission ? (
          <>
            <Camera 
              style={{width: screenWidth, height: img ? screenHeight * 0 : screenHeight * 0.75}}
              type={type} 
              ref={(r)=>{camera= r}}>
              </Camera>
          </>
          ) : (<Text style={styles.txt}>Please allow Camera Access.</Text>)
        }
      </View> 
      <View>
        {img ? (
          <View style={{alignSelf:"center", alignItems:"center", width:"95%"}}>
            <Image source={{uri: img.uri}} style={{ width: 300, height: (300 * 3)/2, marginBottom:50 }}/>
            <Text style={{alignSelf:"flex-start"}}>Gift Name</Text>
              <TextInput
                  style={styles.input}
                  onChangeText={setGiftName}
                  value={giftName}
                  autoCorrect={false}
                  enterKeyHint='done'
              />
            <View style={{flexDirection:"row",gap:10, paddingTop:15}}>
              <Pressable 
                style={[styles.btn, styles.btnSecondary]}
                onPress={()=>navigation.navigate("IdeaScreen", {
                  personId: personId 
                })}
              >
                <Text style={styles.btnTextStyle}>Cancel</Text>
              </Pressable>
                <Pressable 
                  style={styles.btn}
                  onPress={()=> createAndSaveGift(personId)}
                  >
                    <Text style={styles.btnTextStyle}>Save</Text>
                </Pressable>
              </View> 
      </View>
        ) : (
          <View style={{height:"100%", backgroundColor:"#5dbaab",}}>
            <Pressable style={{display: "flex", alignItems:"center", paddingTop:10}} 
              onPress={()=>{ takePhoto() }}
            >
              <View style={{backgroundColor:"#eb7474", borderColor:"#fff", borderWidth:5, alignItems:'center', justifyContent:"center", borderRadius:50, width:75, height:75}}>
                <MaterialIcons name="camera-alt" size={35} color="white"/>
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
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor:'#80808077',
    borderRadius:7,
    backgroundColor:"#fff",
    paddingLeft:10,
  },
  container: {
    flex: 1,
    // paddingVertical: 40 //see inline styling
    // paddingHorizontal: 20,
  },
  txt:{
    fontSize: 20
  },

  btn:{
    height:50, 
    width:"49%", 
    backgroundColor:"#5dbaab", 
    display:"flex", 
    justifyContent:"center", 
    alignItems:"center", 
    borderRadius:7
  },

  btnSecondary:{
    backgroundColor:"#eb7474"
  },

  btnTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});