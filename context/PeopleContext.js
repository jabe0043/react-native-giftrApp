import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PeopleContext = createContext();

// PROVIDER
function PeopleProvider(props){
  const asKey = "people_askey_jabe0043"            
  const [people, setPeople] = useState([]);
  const [gifts, setGifts] = useState([]);

  // load people data from async storage to state on initial app render
  useEffect(() => {
    AsyncStorage.getItem(asKey)
      .then((peopleList) =>{
        // peopleList === null ? AsyncStorage.setItem(asKey, JSON.stringify([])) : setPeople(JSON.parse(peopleList));
        if (peopleList === null){ 
          return AsyncStorage.setItem(asKey, JSON.stringify([]));
        } else {
          console.log("Loading people from AsyncStorage")
          setPeople(JSON.parse(peopleList));
        }
      })
      .catch((e) =>{
        console.warn(e.message)
      });
      // AsyncStorage.clear();
  }, []);


  //SAVE a person in state and update async storage       //TODO: MIX with the UpdatePerson function so it can do either or.
  async function savePerson(person){
    console.log("Save person called from context")
    person = Array.isArray(person) ? person : [person]
    let newPeopleList = [...person, ...people]
    setPeople(newPeopleList)
    try{
      await AsyncStorage.setItem(asKey, JSON.stringify(newPeopleList))
      console.log("User saved. AsyncStorage Updated.")
    } catch (e){
      console.log (e)
    }
  }

  //DELETE a person from state and update async storage
  async function removePerson(person){
    console.log("Remove person called from context")
    let newList = people.filter((item) => item.id !== person.id);
    setPeople(newList);
    try{
      await AsyncStorage.setItem(asKey, JSON.stringify(newList));
      console.log("User deleted. AsyncStorage updated")
    } catch(e){
      console.log(e)
    }
  }

  //GET a person's list of gifts (idea screen)
  function getGifts(id){
    let person = people.filter((person) => person.id === id)
    // console.log(person);
    let giftList = person[0].ideas  //filter returns an array containing the person object. person[0].ideas is the array of gifts for that person.
    setGifts(giftList);
  }

  async function saveGifts(personId, gift){
    console.log("save gifts called from context. Person for which gifts are being saved:", personId)
    let matchingPerson = people.filter((person)=> person.id === personId);
    matchingPerson[0].ideas.push(gift);
    try{
      updatePerson(personId, matchingPerson);
      // savePerson(matchingPerson)
    } catch(e){
      console.log(e)
    }
  }

  async function updatePerson(personId, updatedPerson){
    let filteredList = people.filter((person) => person.id !== personId);
    let newList = [...updatedPerson, ...filteredList]
    // filteredList.push(updatedPerson)
    setPeople(newList);
    try{
      await AsyncStorage.setItem(asKey, JSON.stringify(newList))
      console.log("Saved list with updated gift list. AsyncStorage Updated.")
    } catch (e){
      console.log (e)
    }
  }

  return <PeopleContext.Provider value={[people, savePerson, removePerson, getGifts, gifts, saveGifts]} {...props} />;
}

// HOOK
function usePeople() {
  const context = useContext(PeopleContext);
  if (!context) throw new Error("You can only access the People Context from components within the provider.");
  return context;
}

export { usePeople, PeopleProvider };



