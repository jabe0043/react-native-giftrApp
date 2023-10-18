
import { Modal, View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { useState } from 'react';


export default function CustomModal({ visible, onClose, onConfirm, name, type }){


  return (
    <Modal transparent visible={visible} onRequestClose={onClose} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalBox}>
          <Image source={require('../assets/delete-stipple-illustrations.png')} style={styles.modalImg}/>
          <Text>Delete {name} from your list of {type === "person" ? "people" : "gift ideas"}?</Text>
          <View style={styles.modalBtnContainer}>
            <Pressable onPress={onClose} style={styles.modalBtn}>
              <Text>Cancel</Text>
            </Pressable>
            <Pressable onPress={onConfirm} style={[styles.modalBtn, styles.modalBtnPrimary]}>
              <Text style={{color:"#fff"}}>Delete</Text>
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
    paddingHorizontal: 30,
    paddingVertical: 20,
    margin:30,
    alignItems:"center",
    justifyContent:"space-between",
    height: 275,
    borderRadius:7
},

  modalImg:{
    width:125,
    height:125,
  },

  modalBtnContainer:{
    flexDirection:"row",
    gap:50,
  },

  modalBtn:{
    padding:10,
  },

  modalBtnPrimary:{
    backgroundColor:"#eb7474",
    borderRadius:"7",
  }


})

