import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PeopleContext = createContext();

// PROVIDER
function PeopleProvider(props){
  const asKey = "people_askey_jabe0043"            
  const [people, setPeople] = useState([]);

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
  }, []);


  //SAVE a person in state and update async storage
  async function savePerson(person){
    console.log("Save person called from context")
    person = Array.isArray(person) ? person : [person]
    let updatedPeople = [...person, ...people]
    setPeople(updatedPeople)
    try{
      await AsyncStorage.setItem(asKey, JSON.stringify(updatedPeople))
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

  //TODO: personGiftList(id) retrieve a person's list of gifts for the idea screen


  return <PeopleContext.Provider value={[people, savePerson, removePerson]} {...props} />;
}

// HOOK
function usePeople() {
  const context = useContext(PeopleContext);
  if (!context) throw new Error("You can only access the People Context from components within the provider.");
  return context;
}

export { usePeople, PeopleProvider };



