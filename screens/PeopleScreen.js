import { View, Text, FlatList, ImageBackground, SafeAreaView} from 'react-native';
import { usePeople } from '../context/PeopleContext';
import PersonList from '../components/PersonList';
import FAB from '../components/FAB';
import { useTheme } from '../context/ThemeProvider';


export default function PeopleScreen({navigation, route}) {
  const [people, ,removePerson] = usePeople([]);
  const theme = useTheme();


// convert yyyy-mm-dd string to a date object while accounting for user timezone offset
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
        <View style={theme.heroContainer}>
          <ImageBackground source={require('../assets/fun.png')} resizeMode="contain" style={theme.bgImage}>
            <View style={theme.headerOverlay}>
              <Text style={theme.heroTitle} >Welcome to {'\n'}Gift'r</Text>
            </View>
          </ImageBackground>
        </View>

      {people.length === 0 && 
        <View style={{ flex: .25, display:"flex", alignItems:"center", marginTop:40 }}>
          <Text style={{color:theme.colors.gray, fontSize: theme.types.text}}>
            Add friends and family to your list of giftees!
          </Text>
        </View>
      }

      <View style={{flex:1, width:"95%"}}>
        <FlatList
          data = {sortDates(people)}
          renderItem={({item}) => <PersonList data={item} DateOffset={correctDateStrOffset} navigation={navigation} remove={removePerson} /> }
          keyExtractor={item => item.id}
        />
      </View>

      <FAB navigation={navigation} page={"AddPersonScreen"}/>
    </SafeAreaView>
    
  );
}