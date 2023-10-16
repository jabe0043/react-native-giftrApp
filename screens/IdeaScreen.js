import { View, Text, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { usePeople } from '../context/PeopleContext';
import FAB from '../components/FAB';
import { FlatList } from 'react-native-gesture-handler';
import GiftItemList from '../components/GiftItemList';

  /*TODO: if I do const[gifts, getGifts] = usePeople() to get the "gifts" state and the getGifts function directly from here, it breaks my app.
  Instead, I have const[people, savePerson, removePerson, getGifts] = usePeople([]); in my PeopleScreen. 
  I then pass the getGifts function to the PersonList and call the function in the onPress(). 
  WHY?????? 
  */

export default function IdeaScreen({route, navigation}) {
  const insets = useSafeAreaInsets();

  const { person, personId } = route.params   //being passed from the PersonList
  // console.log(person, personId)
  const [people, savePerson, removePerson, getGifts, gifts] = usePeople(); //using context

  useEffect(()=>{
    getGifts(personId);
  })

  //pictureSize: sizes && sizes.length > 0 ? sizes[2] : '300x400',



  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Idea Screen</Text>
      {/* <View><Text>{`Gifts for ${person.name}`}</Text></View> */}
      {gifts.length === 0 && 
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image 
          source={require("../assets/shopping-man.png")} 
          style={{width:250, height:250}}
        />
        {/* <Text>add gifts for {person.name}</Text> */}
      </View>
      }
      {gifts.length > 0 && 
      <FlatList
        data = {gifts}
        renderItem = {({item}) => <GiftItemList data={item} personId={personId} navigation={navigation} /> }
        keyExtractor={(item) => item.giftId}
      />
      }
      {/* <FlatList
        data = {gifts}
        renderItem = {({item}) => <GiftItemList data={item} personId={personId} navigation={navigation} /> }
        keyExtractor={(item) => item.giftId}
      /> */}
    <FAB personId={personId} person={person} navigation={navigation}>

    </FAB>
    </View>
  );
}