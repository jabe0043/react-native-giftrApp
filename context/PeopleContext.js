import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PeopleContext = createContext();

function PeopleProvider(props){
  const asKey = "people_askey_jabe0043"            
  const [people, setPeople] = useState([]); 
  const [gifts, setGifts] = useState([]);   

  // Get the list of people from async storage on initial app load. If the list != empty, update people state with the list. 
  useEffect(() => {
    AsyncStorage.getItem(asKey)
      .then((peopleList) =>{
        if (peopleList === null){ 
          return AsyncStorage.setItem(asKey, JSON.stringify([]));
        } else {
          setPeople(JSON.parse(peopleList));
        }
      })
      .catch((e) =>{
        console.warn(e.message)
        throw e;
      });
  }, []);


  //SAVE a person in state and update async storage      
  async function savePerson(person){
    person = Array.isArray(person) ? person : [person]
    let newPeopleList = [...person, ...people]
    try{
      await AsyncStorage.setItem(asKey, JSON.stringify(newPeopleList)) 
      setPeople(newPeopleList) 
    } catch (e){
      throw e;
    }
  }

  //DELETE a person from state and update async storage
  async function removePerson(person){
    let newList = people.filter((item) => item.id !== person.id);
    try{
      await AsyncStorage.setItem(asKey, JSON.stringify(newList));
      setPeople(newList);
    } catch(e){
      throw(e);
    }
  }

  //Get a person's list of gifts from their id and put it in its own state.
  function getGifts(id){
    let person = people.filter((person) => person.id === id)
    let giftList = person[0].ideas 
    setGifts(giftList);
  }

  //SAVE a person's gift.
  async function saveGifts(personId, gift){
    let matchingPerson = people.filter((person)=> person.id === personId);
    matchingPerson[0].ideas.push(gift);
    try{
      await updatePerson(personId, matchingPerson);
    } catch(e){
      throw(e)
    }
  }

  //Update and save pre-existing person with new gifts or deleted gifts. Add it to SaveGifts function
  async function updatePerson(personId, updatedPerson){
    let filteredList = people.filter((person) => person.id !== personId);
    let newList = [...updatedPerson, ...filteredList]
    try{
      await AsyncStorage.setItem(asKey, JSON.stringify(newList))
      setPeople(newList);
    } catch (e){
      throw(e);
    }
  }

  //Delete gift for person
  async function removeGift(personId, giftId){
    let matchingPerson = people.filter((person)=> person.id === personId);
    let updatedGiftList = matchingPerson[0].ideas.filter((gift) => gift.giftId !== giftId );
    matchingPerson[0].ideas = updatedGiftList;
    try{
      await updatePerson(personId, matchingPerson );
    } catch(e){
      throw(e);
    }
  }

  return <PeopleContext.Provider value={[people, savePerson, removePerson, getGifts, gifts, saveGifts, removeGift]} {...props} />;
}

// Access the people context globally
function usePeople() {
  const context = useContext(PeopleContext);
  if (!context) throw new Error("You can only access the People Context from components within the provider.");
  return context;
}

export { usePeople, PeopleProvider };



