import {View, Image, Text, Pressable} from 'react-native'


export default function GiftItemList({data, navigation}){
  const { giftName, height, width, img, giftId } = data






  return(
    <View style={{ gap:20, height:100, display:"flex", flexDirection:"row", backgroundColor:"grey", marginBottom:15, alignItems:"center", justifyContent:"space-between"}}>
      <View>
        <Image 
          source={{uri: img}} 
          style={{width:100, height:100}}
        />
      </View>

      <View>
        <Text>{giftName === "" ? "No Validation for Gift name yet" : giftName}</Text>
      </View>

      <View>
        <Pressable>
          <Text>delete</Text>
        </Pressable>
      </View>
    </View>
  )
}