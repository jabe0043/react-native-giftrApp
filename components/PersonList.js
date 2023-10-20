import { StyleSheet, View, Text, Image, Pressable, TouchableHighlight } from 'react-native';
// import { correctDateStrOffset } from '../utils/utils';
import { useState } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import Swipeable from 'react-native-gesture-handler/Swipeable';
import CustomModal from './CustomModal'




export default function PersonList({data, navigation, remove, DateOffset}){
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProps, setModalProps] = useState({});

  // called from pressable that triggers the modal
    const showModal = () => {
      setModalVisible(true);
    };
  
    // called from modal's pressable that hides the modal (ie: cancel)
    const hideModal = () => {
      setModalVisible(false);
    };

    //handle delete person confirmation 
    function handleConfirm(){  
      showModal();
      setModalProps({
        visible: modalVisible, 
        onClose: hideModal, 
        onConfirm: removePerson,
        msg:`Remove ${data.name} from your list of people?`, 
        btnInfo:{qty:2, text:"Remove", color:"#eb7474", text2:"Cancel"}})
    }

    const removePerson = () => {
      remove(data)  //The reference to removePerson in context. Passed from PeopleScreen
      .catch(() =>{
      setModalProps({
        visible: modalVisible, 
        onConfirm: hideModal, 
        msg:"Something went wrong. User could not be removed.",
        btnInfo: {qty:1, text:"Return", color:"#eb7474"} ,
      }),
      showModal()})
    }

  function formatDate(date){
    let options = {
      month: 'long',
      day: 'numeric',
    };
    let dateString = new Intl.DateTimeFormat('en-CA', options).format(DateOffset(date))
    return dateString
  }


  //right-side swipeable component (renders delete button)
  const renderRightActions = (progress, dragX) => {
    return (
      <View style={styles.deleteSwipeBtn}>
        <Pressable 
          onPress= {handleConfirm}>
          <View>
            <MaterialIcons name="delete" size={35} color="#fff" />
          </View>
        </Pressable>
      </View>
    );
  };


return (
  <Swipeable renderRightActions={renderRightActions} rightOpenValue={-100}>
    <View style={styles.cardContainer}>
      <View style={styles.cardInfoContainer}>
        <View style={[styles.cardAvatar, {backgroundColor:`${data.bgColor}`}]}>
          <Text style={styles.initials}>
            {data.initials}
          </Text>
        </View>
      
        <View>
          <Text style={styles.title}>
            {data.name}
          </Text>
          <Text style={styles.subTitle}>
            {formatDate(data.dob)}
          </Text>
        </View>
      </View>

      <View>
          <Pressable style={styles.btnPrimary} 
            onPress={()=> {
              navigation.navigate( "IdeaScreen", { 
                person: data, 
                personId: data.id, 
              });
            }} 
          >
            <Ionicons name="ios-gift" style={styles.icon} />
          </Pressable>
      </View>

      <CustomModal 
          visible= {modalVisible} 
          onClose= {modalProps.onClose}
          onConfirm={modalProps.onConfirm}
          msg={modalProps.msg}
          btnInfo={modalProps.btnInfo}
      />

    </View>
  </Swipeable>
)}



const styles = StyleSheet.create({
  cardContainer:{
    flex:1, 
    height:100, 
    display:"flex", 
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

  cardAvatar: {
    borderRadius:50, 
    width:75,
    height:75, 
    marginLeft:10, 
    justifyContent:"center", 
    alignItems:"center"
  },

  initials: {
    color:"#fff",
    // fontSize: "20",
    fontWeight:"500"
  },

  title:{
    color: "#212427",
    // fontSize: "17",
    fontWeight:"500",
    paddingBottom:5
  },

  subTitle:{
    color: "#808080",
  },

  btnPrimary:{
    backgroundColor:'#5dbaab88',
    // backgroundColor:'#5dbaab',
    marginRight: 10,
    padding: 10,
    borderRadius:7,
  },

  icon:{
    fontSize: 22,
    color:"#fff",
    padding:0,
  },

  deleteSwipeBtn:{
    display:"flex", 
    justifyContent:"center", 
    alignItems:"center", 
    backgroundColor:"#eb7474",
    marginTop: 7,
    height:100,
    width:90,
    borderRadius: 7,
  }
  
});