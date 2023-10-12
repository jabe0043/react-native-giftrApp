import { View, Text, Image, Pressable } from 'react-native';
import { formatDate } from '../utils/utils';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import Swipeable from 'react-native-gesture-handler/Swipeable';



export default function PersonList({data, navigation, remove, getGifts}){

  //right swipeable component (renders delete button)
  const renderRightActions = (progress, dragX) => {
    return (
      <View 
        style={{
          display:"flex", 
          justifyContent:"center", 
          alignItems:"center", 
          backgroundColor:"#eb7474",
          height:100,
          width:90
        }}>
        <Pressable 
          onPress={() => remove(data)}>
          <View style={{ textAlign: 'center'}}>
            <MaterialIcons name="delete" size={35} color="#fff" />
          </View>
        </Pressable>
      </View>
    );
  };


return (
  <Swipeable renderRightActions={renderRightActions} rightOpenValue={-100}>
    <View style={{flex:1, height:100, display:"flex", flexDirection:"row", gap:30, backgroundColor:"grey", marginBottom:15, alignItems:"center", justifyContent:"space-between"}}>
      <View style={{backgroundColor:`${data.bgColor}`, borderRadius:50, width:70, height:70, display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Text>{data.initials}</Text>
      </View>
      <View style={{display:"flex"}}>
        <Text>{data.name}</Text>
        <Text>{formatDate(data.dob)}</Text>
      </View>
      <View>
        <Pressable 
          onPress={()=> {
            // getGifts(data.id)
            navigation.navigate( "IdeaScreen", { 
              person: data, 
              personId: data.id 
            });
          }}
          style={{paddingRight:15}}  
        >
          <Ionicons name="ios-gift" size={30} color="#fff" />
        </Pressable>
      </View>
    </View>
  </Swipeable>
)
}