import {View, Image, Text, Pressable, StyleSheet} from 'react-native'
import { usePeople } from '../context/PeopleContext';
import { MaterialIcons } from '@expo/vector-icons'; 
import CustomModal from './CustomModal'
import { useState } from 'react';
import ImagePreviewModal from './ImagePreviewModal';




export default function GiftItemList({personId, data, navigation}){
  const { giftName, height, width, img, giftId } = data
  const [people, savePerson, removePerson, getGifts, gifts, saveGifts, removeGift] = usePeople(); //using context

  const [modalVisible, setModalVisible] = useState(false);
  const [imgModalVisible, setImgModalVisible] = useState(false);

  // called from pressable that triggers the modal
  const showModal = (modal) => {
    modal === "del" ? setModalVisible(true) : setImgModalVisible(true)
  };

  // called from modal's pressable that hides the modal (ie: cancel)
  const hideModal = () => {
    setModalVisible(false);
    setImgModalVisible(false);
  };

  // called from modal's pressable that confirms the action (del, submit etc.)
  function handleConfirm(){
    removeGift(personId, giftId)
  }


  return(
    <View style={{flex:1, width:"100%"}}>
      <View style={styles.cardContainer}>
        <View>
          <Pressable onPress={()=>(showModal("img"))}>
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
          <Pressable style={styles.btnPrimary}
          onPress={()=>showModal("del")}
          >
            <View>
              <MaterialIcons name="delete" size={35} style={styles.icon} />
            </View>
          </Pressable>
        </View>
      </View>

      <CustomModal visible={modalVisible} onClose={hideModal} onConfirm={handleConfirm} name={giftName} type={"gift"} />
      <ImagePreviewModal visible={imgModalVisible} onClose={hideModal} img={img} />

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

btnPrimary:{
  backgroundColor:"#eb747488",
  marginRight: 10,
  padding: 10,
  borderRadius:7,
},

})