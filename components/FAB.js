import { Pressable, Text, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export default function FAB ({person, navigation, personId, page}){
  
  const OS = Platform.OS;

  return (
    OS === "android" &&
      <Pressable style={styles.containerFAB}
          onPress={()=>{
            if(page === "AddIdeaScreen"){
              navigation.navigate("AddIdeaScreen", {
                personId: personId
              })
            } else {
              navigation.navigate(page);
            }
          }}>
          <AntDesign name="plus" size={28} color="#fff" />
      </Pressable>
  );
};

const styles = StyleSheet.create({
  containerFAB: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderRadius: 50,
      position: 'absolute',
      bottom: 50,
      right: 40,
      backgroundColor: "#5dbaab",
  },
  title: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
  },
});