import { useState, useEffect, useRef } from 'react';
import {useWindowDimensions, View, SafeAreaView, Pressable, Image, KeyboardAvoidingView, TextInput, StyleSheet, Text } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons'; 
import { usePeople } from '../context/PeopleContext';
import { useTheme } from '../context/ThemeProvider';
import * as Crypto from 'expo-crypto';
import CustomModal from '../components/CustomModal';
import ImagePreviewModal from '../components/ImagePreviewModal';


export default function AddIdeaScreen({route, navigation}) {
  const [giftName, setGiftName] = useState("");
  const screen = useWindowDimensions();
  const screenWidth = screen.width;
  const screenHeight = screen.height;
  let camera = useRef();
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [status, requestPermission] = Camera.useCameraPermissions();
  const [img, setImg] = useState(null)
  const [imagePreview, setImagePreview] = useState(null) 
  const { personId } = route.params   
  const [, , , , , saveGifts] = usePeople(); 
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const [imgModalVisible, setImgModalVisible] = useState(false); //Displays the fullscreen image preview from clicking on thumbnail.
  
  useEffect(()=>{
    requestPermission().then(perm => {
      if(perm.status === 'granted'){
        setHasPermission(true)
      }
    })
    .catch()
  }, []) 

  const hideModal = () => {
    setImgModalVisible(false);
  };

  function handleConfirm(){
    setModalVisible(false);
  }

  function takePhoto(){
    if(!hasPermission){
      setModalVisible(true);
      setModalProps({
        visible: modalVisible, 
        onConfirm: handleConfirm, 
        msg:"Please allow camera access.",
        btnInfo: {qty:1, text:"Ok", color:"#5dbaab"} ,
      })
      return; 
    }
    camera.takePictureAsync()
    .then(pic =>{
      let w = screenWidth * 0.5;
      let h = (w * 3) / 2;
      setImagePreview({uri: pic.uri, width: w, height: h})
    })
    .catch(err => console.warn(err.message));
  }

  function createAndSaveGift(personId){
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
      .catch(() =>{
        setModalProps({
          visible: modalVisible, 
          onConfirm: handleConfirm, 
          msg:"Something went wrong. Gift idea could not be saved.",
          btnInfo: {qty:1, text:"Return", color:"#5dbaab"} ,
        })
        setModalVisible(true);
      });
  }

  return (
      <SafeAreaView style={[styles.container, {paddingVertical: img ? 40 : 0}, {backgroundColor: img ? null : "#5dbaab"}]}>
      <View>
        { hasPermission ? (
          <>{!imagePreview ? ( 
            <Camera 
              style={{width: screenWidth, height: img ? screenHeight * 0 : screenHeight * 0.75}}
              type={type} 
              ref={(r)=>{camera= r}}>
              </Camera>) :
              <Image source={{uri: imagePreview.uri}} style={{width: screenWidth, height: img ? screenHeight * 0 : screenHeight * 0.75 }}/>
              }
          </>
          ) : (
            <View style={{width: screenWidth, height: screenHeight * 0.75, backgroundColor:"black", justifyContent:"center"}}>
              <Text style={{color:"#fff", alignSelf:"center"}}>
                Please allow camera access.
              </Text>
              <CustomModal 
                visible= {modalVisible} 
                onClose= {modalProps.onClose}
                onConfirm={modalProps.onConfirm}
                msg={modalProps.msg}
                btnInfo={modalProps.btnInfo}
              />
          </View>)
        }
      </View> 
      <View>
        {img ? (
          //when img is true, display the screen with textInput so the user can save.
          <View style={{alignSelf:"center", alignItems:"center", paddingVertical:20, width:"95%", gap:10}}>
            <KeyboardAvoidingView behavior="padding" style={{width:"90%"}}>
            <Text style={{alignSelf:"flex-start", color:theme.colors.gray, fontSize:theme.types.smtext}}>
              Gift Name
            </Text>
              <TextInput
                  style={styles.input}
                  onChangeText={setGiftName}
                  value={giftName}
                  autoCorrect={false}
                  enterKeyHint='done'
              />
            </KeyboardAvoidingView>
            <Pressable 
            onPress={()=>(setImgModalVisible(true))}>
              <Image source={{uri: img.uri}} style={{ width: 325, height: (325 * 3)/2}}/>
            </Pressable>
            <View style={{flexDirection:"row",gap:10, paddingTop:15}}>
              <Pressable 
                style={[theme.btn, theme.btnSecondary]}
                onPress={()=>navigation.navigate("IdeaScreen", {
                  personId: personId 
                })}
              >
                <Text style={theme.btnTextStyle}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable 
                disabled={(giftName === "") ? true : false}
                style={[theme.btn, (giftName === "") ? theme.btnDisabled : null]}
                onPress={()=> createAndSaveGift(personId)}
                >
                  <Text style={theme.btnTextStyle}>Save</Text>
              </Pressable>
              </View> 
      </View>
        ) : (
          // when img is false, display the live camera screen. When user takes pic, set imgPreview as true. When user hits next, setImg(imgPreview)
          <View style={{flexDirection:"row", justifyContent:"space-between", backgroundColor:theme.colors.primary,}}>
            <Pressable style={[styles.cameraBtns, {flexDirection:"row"}]}
              onPress={()=> setImagePreview(null)}>
              <MaterialIcons name="refresh" size={26} style={theme.btnTextStyle} />
              <Text style={[theme.btnTextStyle]}>
                Retake
              </Text>
            </Pressable>

            <Pressable style={{display: "flex", alignItems:"center", paddingTop:10}} 
              onPress={()=>{ !imagePreview && takePhoto() }}  
            >
              <View style={{backgroundColor:"#eb7474", borderColor:"#fff", borderWidth:5, alignItems:'center', justifyContent:"center", borderRadius:50, width:75, height:75}}>
                <MaterialIcons name="camera-alt" size={35} color="white"/>
              </View>
            </Pressable>

            <Pressable style={styles.cameraBtns}
              onPress={()=> setImg(imagePreview)}>
              <MaterialIcons name="chevron-right" size={26} style={theme.btnTextStyle} />
              <Text style={theme.btnTextStyle}>
                Next
              </Text>
            </Pressable>
          </View>
        )}
      </View>

      <CustomModal 
          visible= {modalVisible} 
          onClose= {modalProps.onClose}
          onConfirm={modalProps.onConfirm}
          msg={modalProps.msg}
          btnInfo={modalProps.btnInfo}
      />

    <ImagePreviewModal isVisible={imgModalVisible} onClose={hideModal} img={img && img.uri} />
    </SafeAreaView>
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
  },

  txt:{
    fontSize: 20
  },

  cameraBtns:{
    flexDirection:"row-reverse",
    justifyContent:"center",
    alignItems:"center",
    padding:10,
    gap:5,
  }
});