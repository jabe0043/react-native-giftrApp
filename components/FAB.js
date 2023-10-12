import { Pressable, Text, StyleSheet } from "react-native";

export default function FAB ({person, navigation, personId}){
  return (
      <Pressable style={styles.container}
          onPress={()=>{
            // console.log("FAB", personId)
            // console.log("FAB",person)
            navigation.navigate("AddIdeaScreen", {
              personId: personId
            })
          }}>
          <Text style={styles.title}>add</Text>
      </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
      /* position the content inside the FAB */
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      /* for the FAB itself */
      borderRadius: 10,
      position: 'absolute',
      bottom: 70,
      right: 40,
      backgroundColor: '#26653A',
  },
  title: {
      /* style the text inside the FAB */
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
  },
});