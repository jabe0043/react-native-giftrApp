import {View, Image, Text, Pressable, StyleSheet} from 'react-native'
import { usePeople } from '../context/PeopleContext';
import { MaterialIcons } from '@expo/vector-icons'; 
import CustomModal from './CustomModal'
import { useState } from 'react';
import ImagePreviewModal from './ImagePreviewModal';




export default function GiftItemList({personId, data, navigation}){
  const { giftName, height, width, img, giftId } = data
  const [, , , , , , removeGift] = usePeople(); //using context

  const [modalVisible, setModalVisible] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const [imgModalVisible, setImgModalVisible] = useState(false); //Displays the fullscreen image preview from clicking on thumbnail.


  const hideModal = () => {
    setModalVisible(false);
    setImgModalVisible(false);
  };

  function handleConfirm(){
    setModalVisible(true)
    setModalProps({
      visible: modalVisible, 
      onClose: hideModal, 
      onConfirm: remove,
      msg:`Remove ${giftName} from your list of Gifts?`, 
      btnInfo:{qty:2, text:"Remove", color:"#eb7474", text2:"Cancel"}})
  }

  const remove= () => {
    removeGift(personId, giftId)
    .catch(() =>{
      setModalProps({
        visible: modalVisible, 
        onConfirm: hideModal, 
        msg:"Something went wrong. Gift idea could not be removed.",
        btnInfo: {qty:1, text:"Return", color:"#eb7474"} ,
      })
      setModalVisible(true)
    })
  }


  return(
    <View style={{flex:1, width:"100%"}}>
      <View style={styles.cardContainer}>
        <View>
          <Pressable onPress={()=>(setImgModalVisible(true))}>
            <Image 
              source={{uri: img}} 
              style={{ width: 60, height: (60 * 3) / 2 , marginLeft:5, borderRadius:7}}
            />
          </Pressable>
        </View>

        <View style={{flex: 1, marginLeft: 10}}>
          <Text>{giftName}</Text>
        </View>

        <View>
          <Pressable style={styles.delBtn}
            onPress={()=>handleConfirm()}
          >
            <View>
              <MaterialIcons name="delete" size={35} style={styles.icon} />
            </View>
          </Pressable>
        </View>
      </View>

      <ImagePreviewModal isVisible={imgModalVisible} onClose={hideModal} img={img} />
      
      <CustomModal 
        visible= {modalVisible} 
        onClose= {modalProps.onClose}
        onConfirm={modalProps.onConfirm}
        msg={modalProps.msg}
        btnInfo={modalProps.btnInfo}
      />
    </View>
  )
}

const styles = StyleSheet.create({
cardContainer:{
  height:100, 
  width:"100%",
  flexDirection:"row", 
  backgroundColor:"#FFF", 
  marginTop: 7,
  alignItems:"center", 
  justifyContent:"space-between",
  borderRadius: 7,
  borderColor: '#80808077',
  borderWidth: .5,
},

cardInfoContainer:{
  display:"flex", 
  flexDirection:"row", 
  alignItems:"center", 
  gap:20
},


icon:{
  fontSize: 22,
  color:"#fff",
  padding:0,
},

delBtn:{
  backgroundColor:"#eb747488",
  marginRight: 10,
  padding: 10,
  borderRadius:7,
},

})