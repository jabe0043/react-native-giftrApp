import { View, Text, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { usePeople } from '../context/PeopleContext';
import FAB from '../components/FAB';

  /*TODO: if I do const[gifts, getGifts] = usePeople() to get the "gifts" state and the getGifts function directly from here, it breaks my app.
  Instead, I have const[people, savePerson, removePerson, getGifts] = usePeople([]); in my PeopleScreen. 
  I then pass the getGifts function to the PersonList and call the function in the onPress(). 
  WHY?????? 
  */

export default function IdeaScreen({route, navigation}) {
  const insets = useSafeAreaInsets();

  const { person, personId } = route.params   //being passed from the PersonList
  console.log(personId) //the person's id
  
  const [people, savePerson, removePerson, getGifts, gifts] = usePeople(); //using context
  // console.log('gifts IdeaScreen', gifts)

  useEffect(()=>{
    console.log("get gifts called")
    getGifts(personId);
  })




  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Idea Screen</Text>
      {gifts.length === 0 && 
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image 
          source={require("../assets/shopping-man.png")} 
          style={{width:250, height:250}}
        />
        <Text>add gifts for {person.name}</Text>
      </View>
      }
    <FAB personId={personId} navigation={navigation}>

    </FAB>
    </View>
  );
}