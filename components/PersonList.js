import { View, Text, Image, Pressable } from 'react-native';
import { formatDate } from '../utils/utils';
import { Ionicons } from '@expo/vector-icons'; 


export default function PersonList({data, navigation}){

return (
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
        style={{backgroundColor:"red"}}
        // onPress={()=>console.log("clicked")}  
        onPress={()=>navigation.navigate("IdeaScreen")}  
      >
        <Ionicons name="ios-gift" size={24} color="black" />
      </Pressable>
    </View>
  </View>
)
}