import { View, Text, Image, StyleSheet, ImageBackground, FlatList, Button } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { usePeople } from '../context/PeopleContext';
import FAB from '../components/FAB';
import GiftItemList from '../components/GiftItemList';

export default function IdeaScreen({route, navigation}) {
  // const insets = useSafeAreaInsets();
  const OS = Platform.OS;
  const { person, personId } = route.params   //being passed from PersonList
  // console.log(person, personId);
  const [people, savePerson, removePerson, getGifts, gifts] = usePeople(); //using context

  useEffect(()=>{
    getGifts(personId);
  })

  //TODO: SAFEAREAVIEWS


  //conditionally render ios top-right header
  // useEffect(()=>{
  //   if(OS === "ios"){
  //     navigation.setOptions({
  //       headerRight: () => (
  //         <Button
  //           title="Add Idea"
  //           color="#fff"
  //           onPress={() => navigation.navigate('AddIdeaScreen',{
  //             personId: personId
  //           })}
  //         />
  //       )
  //     })
  //   }
  // },[])


  // find the person associated to the gifts via personId from route params
  function findPerson(id){
    const match = people.filter((person) => person.id === id)
    personName = match[0].name
    return match[0].name
  }


  //pictureSize: sizes && sizes.length > 0 ? sizes[2] : '300x400',


  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={styles.heroContainer}>
          <ImageBackground source={require("../assets/shopping-man.png")} resizeMode="cover" style={styles.image}>
            <View style={styles.headerOverlay}>
              <Text style={styles.heroTitle} >{`Ideas for ${'\n'}${findPerson(personId)}`}</Text>
            </View>
          </ImageBackground>
        </View>

      {gifts.length === 0 && 
      <View style={{marginTop:"10%"}}>
        <Text>Add your first gift idea for {findPerson(personId)}</Text>
      </View>
      }

      <View style={{flex:1, width:"95%"}}>
      <FlatList
        data = {gifts}
        renderItem = {({item}) => <GiftItemList data={item} personId={personId} navigation={navigation} /> }
        keyExtractor={(item) => item.giftId}
      />
      </View>

    <FAB personId={personId} person={person} navigation={navigation} page={"AddIdeaScreen"}/>

    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer:{ 
    flex:1,
    width:"100%", 
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