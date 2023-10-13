import {View, Image, Text, Pressable} from 'react-native'
import { usePeople } from '../context/PeopleContext';


export default function GiftItemList({personId, data, navigation}){
  const { giftName, height, width, img, giftId } = data
  const [people, savePerson, removePerson, getGifts, gifts, saveGifts, removeGift] = usePeople(); //using context







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
        <Pressable
          onPress={()=>removeGift(personId, giftId)}
        >
          <Text>delete</Text>
        </Pressable>
      </View>
    </View>
  )
}