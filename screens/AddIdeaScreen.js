import { useState, useEffect, useRef } from 'react';
import {useWindowDimensions, View, SafeAreaView, Pressable, Image, KeyboardAvoidingView, TextInput, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera, CameraType } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons'; 
import { usePeople } from '../context/PeopleContext';
import * as Crypto from 'expo-crypto';
import CustomModal from '../components/CustomModal';
import ImagePreviewModal from '../components/ImagePreviewModal';




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
  const [imagePreview, setImagePreview] = useState(null) //displayed when user snaps a pic. 
  const { personId } = route.params   
  const [people, savePerson, removePerson, getGifts, gifts, saveGifts] = usePeople(); //using context
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const [imgModalVisible, setImgModalVisible] = useState(false); //Displays the fullscreen image preview from clicking on thumbnail.
  
  

  useEffect(()=>{
    requestPermission().then(perm => {
      if(perm.status === 'granted'){
        setHasPermission(true)
      }
    })
    .catch()//TODO: add modal for no camera
  }, []) 


  const hideModal = () => {
    setImgModalVisible(false);
  };

  // const showModal = () => {
  //   setModalVisible(true);
  // };

  function handleConfirm(){
    setModalVisible(false);
  }

  function takePhoto(){
    if(!hasPermission){
      console.log("No Camera Access Permission Given.");  //TODO:modal
      setModalVisible(true);
      setModalProps({
        visible: modalVisible, 
        onConfirm: handleConfirm, 
        msg:"Please allow camera access.",
        btnInfo: {qty:1, text:"Ok", color:"#5dbaab"} ,
      })
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
      setImagePreview({uri: pic.uri, width: w, height: h}) //for previewing the image (whether he wants to hit next or retake)
      // setImg({uri: pic.uri, width: w, height: h})
    })
    .catch(err => console.log(err.message));
  }

  //create the gift model and save it through context
  function createAndSaveGift(personId){
    if( giftName === "" ){
      // showModal()
      setModalVisible(true);
      setModalProps({
        visible: modalVisible, 
        onConfirm: handleConfirm, 
        msg:"You must name the gift before saving it.",
        btnInfo: {qty:1, text:" Ok ", color:"#5dbaab"} ,
      })
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
              <Text style={{color:"#fff", alignSelf:"center"}}>Please allow camera access.</Text>
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
          <View style={{alignSelf:"center", alignItems:"center", paddingVertical:30, width:"95%", gap:10}}>
            <Text style={{alignSelf:"flex-start"}}>Gift Name</Text>
              <TextInput
                  style={styles.input}
                  onChangeText={setGiftName}
                  value={giftName}
                  autoCorrect={false}
                  enterKeyHint='done'
              />
            <Pressable 
            onPress={()=>(setImgModalVisible(true))}>
              <Image source={{uri: img.uri}} style={{ width: 300, height: (300 * 3)/2}}/>
            </Pressable>
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
                disabled={(giftName === "") ? true : false}
                style={[styles.btn, (giftName === "") ? styles.btnDisabled : null]}
                onPress={()=> createAndSaveGift(personId)}
                >
                  <Text style={styles.btnTextStyle}>Save</Text>
              </Pressable>
              </View> 
      </View>
        ) : (
          // when img is false, display the live camera screen. When user takes pic, set imgPreview as true. When user hits next, setImg(imgPreview)
          <View style={{ backgroundColor:"#5dbaab",flexDirection:"row", justifyContent:"space-between"}}>
            <Pressable style={[styles.cameraBtns, {flexDirection:"row"}]}
              onPress={()=> setImagePreview(null)}>
              <MaterialIcons name="refresh" size={26} style={styles.btnTextStyle} />
              <Text style={styles.btnTextStyle}>Retake</Text>
            </Pressable>

            <Pressable style={{display: "flex", alignItems:"center", paddingTop:10}} 
              onPress={()=>{ !imagePreview && takePhoto() }} //can only take picture if !imagePreview (he hasnt taken a pic yet).  
            >
              <View style={{backgroundColor:"#eb7474", borderColor:"#fff", borderWidth:5, alignItems:'center', justifyContent:"center", borderRadius:50, width:75, height:75}}>
                <MaterialIcons name="camera-alt" size={35} color="white"/>
              </View>
            </Pressable>

            <Pressable style={styles.cameraBtns}
              onPress={()=> setImg(imagePreview)}>
              <MaterialIcons name="chevron-right" size={26} style={styles.btnTextStyle} />
              <Text style={styles.btnTextStyle}>Next</Text>
            </Pressable>
          </View>
        )}
      </View>



      {/* <CustomModal 
        visible={modalVisible} 
        onConfirm={handleConfirm} 
        msg={"You must name the gift before saving it."} 
        btnInfo={{qty:1, text:" ok ", color:"#5dbaab"}} 
      /> */}

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

  btnDisabled: {
    backgroundColor:"#5dbaab55", 
  },

  btnTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  cameraBtns:{
    flexDirection:"row-reverse",
    justifyContent:"center",
    alignItems:"center",
    padding:10,
    gap:5,
  }
});