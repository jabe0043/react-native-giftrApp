import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PeopleContext = createContext();

// CONTEXT PROVIDER
function PeopleProvider(props){
  const asKey = "people_askey_jabe0043"            
  const [people, setPeople] = useState([]); 
  const [gifts, setGifts] = useState([]);   

  // Get the list of people from async storage on initial app load. If the list != empty, update people state with the retrieved list. 
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

  //GET a person's list of gifts from their id.
  function getGifts(id){
    let person = people.filter((person) => person.id === id)
    let giftList = person[0].ideas 
    setGifts(giftList);
  }

  //SAVE a person's gift.
  async function saveGifts(personId, gift){
    console.log("save gifts called from context. Person for which gifts are being saved:", personId)
    let matchingPerson = people.filter((person)=> person.id === personId);
    matchingPerson[0].ideas.push(gift);
    try{
      updatePerson(personId, matchingPerson);
    } catch(e){
      console.log(e)
    }
  }

  //Update and save pre-existing person with new gifts or deleted gifts. Add it to SaveGifts function
  async function updatePerson(personId, updatedPerson){
    let filteredList = people.filter((person) => person.id !== personId);
    let newList = [...updatedPerson, ...filteredList]
    setPeople(newList);
    try{
      await AsyncStorage.setItem(asKey, JSON.stringify(newList))
      console.log("Saved list with updated gift list. AsyncStorage Updated.")
    } catch (e){
      console.log(e)
    }
  }

  //Delete gift for person
  async function removeGift(personId, giftId){
    console.log("gift removed");
    let matchingPerson = people.filter((person)=> person.id === personId);
    let updatedGiftList = matchingPerson[0].ideas.filter((gift) => gift.giftId !== giftId );
    matchingPerson[0].ideas = updatedGiftList;
    try{
      updatePerson(personId, matchingPerson );
    } catch(e){
      console.log(e)
    }
  }

  return <PeopleContext.Provider value={[people, savePerson, removePerson, getGifts, gifts, saveGifts, removeGift]} {...props} />;
}

// HOOK to access the people context globally
function usePeople() {
  const context = useContext(PeopleContext);
  if (!context) throw new Error("You can only access the People Context from components within the provider.");
  return context;
}

export { usePeople, PeopleProvider };



