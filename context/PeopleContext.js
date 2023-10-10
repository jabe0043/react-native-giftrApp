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
      .then((list) => {
        list = list === null ? [] : JSON.parse(list);
        setPeople(list);
        console.log("initial load context:", list)
      });
  }, []);


  //SAVE a Person in context and update state
  async function savePerson(person){
    person = Array.isArray(person) ? person : [person]
    let updatedPeople = [...person, ...people]
    setPeople(updatedPeople)
    try{
      updatedPeople = JSON.stringify(updatedPeople);
      await AsyncStorage.setItem(asKey, updatedPeople)
    } catch (e){
      console.log (e)
    }
  }


  return <PeopleContext.Provider value={[people, savePerson]} {...props} />;
}

// HOOK
function usePeople() {
  const context = useContext(PeopleContext);
  if (!context) throw new Error("You can only access the People Context from components within the provider.");
  return context;
}

export { usePeople, PeopleProvider };



