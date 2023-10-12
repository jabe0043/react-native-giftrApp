import { View, Text, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

  /*TODO: if I do const[gifts, getGifts] = usePeople() to get the "gifts" state and the getGifts function directly from here, it breaks my app.
  Instead, I have const[people, savePerson, removePerson, getGifts] = usePeople([]); in my PeopleScreen. 
  I then pass the getGifts function to the PersonList and call the function in the onPress(). 
  WHY?????? 
  */

export default function IdeaScreen({route, navigation}) {
  const insets = useSafeAreaInsets();

  const { person, personId } = route.params   //being passed from the PersonList
  // console.log(person) //the full person object
  // console.log(personId) //the person's id
  
  const [giftIdeas, setGiftIdeas] = useState([])




  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Idea Screen</Text>
      {giftIdeas.length === 0 && 
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image 
          source={require("../assets/shopping-man.png")} 
          style={{width:250, height:250}}
        />
        <Text>add gifts for {person.name}</Text>
      </View>
      }
    </View>
  );
}