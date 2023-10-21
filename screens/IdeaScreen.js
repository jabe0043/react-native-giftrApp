import { View, Text, StyleSheet, ImageBackground, FlatList, SafeAreaView } from 'react-native';
import { useEffect } from 'react';
import { usePeople } from '../context/PeopleContext';
import { useTheme } from '../context/ThemeProvider';
import FAB from '../components/FAB';
import GiftItemList from '../components/GiftItemList';

export default function IdeaScreen({route, navigation}) {
  const  theme  = useTheme()
  const { person, personId } = route.params 
  const [people, , , getGifts, gifts] = usePeople(); //using context

  useEffect(()=>{
    getGifts(personId);
  })


  // find the person associated to the gifts via personId from route params
  function findPerson(id){
    const match = people.filter((person) => person.id === id)
    return match[0].name
  }


  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
        <View style={[theme.heroContainer, styles.container]}>
          <ImageBackground source={require("../assets/shopping-man.png")} resizeMode="cover" style={theme.bgImage}>
            <View style={theme.headerOverlay}>
              <Text style={theme.heroTitle} >{`Ideas for ${'\n'}${findPerson(personId)}`}</Text>
            </View>
          </ImageBackground>
        </View>

      {gifts.length === 0 && 
      <View style={{marginTop:"10%"}}>
        <Text style={{color: theme.colors.gray, fontSize: theme.types.text}}>
          Add your first gift idea for {findPerson(personId)}
        </Text>
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

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{ 
    flex:1
  },
});