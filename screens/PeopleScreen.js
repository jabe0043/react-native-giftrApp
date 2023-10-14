import { View, Text, Image, FlatList } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePeople } from '../context/PeopleContext';
// import { correctDateStrOffset } from '../utils/utils';
import PersonList from '../components/PersonList';

//TODO: add validation

export default function PeopleScreen({navigation, route}) {
  const insets = useSafeAreaInsets();
  const [people, savePerson, removePerson, getGifts] = usePeople([]);



// convert yyyy-mm-dd string to a date object while accounting for timezone
  function correctDateStrOffset(dateStr){
    let hourOffset = new Date(dateStr).getTimezoneOffset() / 60;    
    let hour = hourOffset >= 0 ? Math.ceil(hourOffset) : 24 - Math.ceil(hourOffset);
    let dateTimeString = `${dateStr}T${hour}:00:00`;
    let dateObj = new Date(dateTimeString);
    return dateObj
  }


  function sortDates(peopleArr){
    peopleArr.sort((a,b)=>{
      let dateA = correctDateStrOffset(a.dob); 
      let dateB = correctDateStrOffset(b.dob);

      if (dateA.getMonth() > dateB.getMonth()) {
        return 1;
      } else if (dateA.getMonth() < dateB.getMonth()) {
        return -1;
      } else {
        return dateA.getDate() > dateB.getDate() ? 1 : -1;
      }
    });
    return peopleArr
  }




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
          data = {sortDates(people)}
          renderItem={({item}) => <PersonList data={item} DateOffset={correctDateStrOffset} navigation={navigation} remove={removePerson} /> }
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
}
