import { Modal, View, Text, Pressable, Image, StyleSheet } from 'react-native';


export default function ImagePreviewModal({ isVisible, onClose, img }){

  return (
    <Modal
      visible={isVisible}  
      transparent={true}
      onRequestClose={onClose} 
      animationType="fade" 
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalBox}>
          <Image source={{uri: img}} style={styles.modalFullImg}/>
          <View >
            <Pressable onPress={onClose} style={styles.modalBtn}>
              <Text>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalContainer:{
    backgroundColor:"#0000005f",
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },

  modalBox:{ 
    backgroundColor: 'white', 
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems:"center",
    justifyContent:"space-between",
    height: "auto",
    borderRadius:7
},

  modalFullImg:{
    width: 350, 
    height: (350 * 3) / 2 , 
    borderRadius:7,
  },

  modalBtn:{
    paddingTop:10,
  },

})