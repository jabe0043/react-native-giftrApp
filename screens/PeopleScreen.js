import { View, Text, Image, FlatList } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePeople } from '../context/PeopleContext';
import PersonList from '../components/PersonList';

//TODO: add sort month/day for flatlist

export default function PeopleScreen({navigation, route}) {
  const insets = useSafeAreaInsets();
  const [people, savePerson, removePerson, getGifts] = usePeople([]);






  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>People Screen</Text>
      {people.length === 0 && 
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image 
            source={require("../assets/woman.png")} 
            style={{width:250, height:250}}
          />
          <Text>Add friends and family to your list of giftees!</Text>
        </View>
      }

      <View style={{flex:1, width:"85%"}}>
        <FlatList
          style={{display:"flex", flexDirection:"column"}}
          data = {people}
          renderItem={({item}) => <PersonList data={item} navigation={navigation} remove={removePerson} /> }
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
}
