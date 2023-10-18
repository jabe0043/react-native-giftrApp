import { View, Text, Image, FlatList, StyleSheet, ImageBackground} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePeople } from '../context/PeopleContext';
// import { correctDateStrOffset } from '../utils/utils';
import PersonList from '../components/PersonList';
import FAB from '../components/FAB';


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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.heroContainer}>
          <ImageBackground source={require('../assets/fun.png')} resizeMode="contain" style={styles.image}>
            <View style={styles.headerOverlay}>
              <Text style={styles.heroTitle} >Welcome to {'\n'}Gift'r</Text>
            </View>
          </ImageBackground>
        </View>

      {people.length === 0 && 
        <View style={{ flex: .25, display:"flex", alignItems:"center", marginTop:40 }}>
          <Image 
            source={require("../assets/woman.png")} 
            style={{width:250, height:250}}
          />
          <Text>Add friends and family to your list of giftees!</Text>
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
    </View>
    
  );
}


const styles = StyleSheet.create({

  heroContainer:{ 
    flex:.5,
    width:"100%", 
    backgroundColor:"#468b80", 
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },

  image: {
    flex: 1,
    backgroundColor:"#5dbaab", 
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },

  headerOverlay:{
    width:"100%", 
    height:"100%", 
    display:"flex", 
    justifyContent:"center",
    backgroundColor: '#00000040',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20
  },

  heroTitle: {
    color: 'white',
    fontSize: 42,
    lineHeight: 40,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 50
  },
  
});