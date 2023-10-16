// import { View, Text, ImageBackground, StyleSheet } from 'react-native';




// export default function ScreenHeaders({screenName}){

//   switch (screenName){
//     case "AddPersonScreen":
//       return(
//         <ImageBackground source={require('../assets/relationship-stipple-illustrations.png')} resizeMode="cover" style={styles.image}>
//           <View style={styles.headerOverlay}>
//             <Text style={styles.heroTitle}>Add a New  {'\n'}Giftee</Text>
//           </View>
//         </ImageBackground>
//       )
//       case "IdeaScreen":

//     default: 
//       return null
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   image: {
//     flex: 1,
//     // justifyContent: 'flex-end',
//     backgroundColor:"#5dbaab", 
//     borderBottomRightRadius: 20,
//     borderBottomLeftRadius: 20,
//   },
//   heroTitle: {
//     color: 'white',
//     fontSize: 42,
//     lineHeight: 40,
//     fontWeight: 'bold',
//     paddingLeft: 20,
//     paddingTop: 50
//   },

//   headerOverlay:{
//     width:"100%", 
//     height:"100%", 
//     display:"flex", 
//     justifyContent:"center",
//     backgroundColor: '#00000040',
//     borderBottomRightRadius: 20,
//     borderBottomLeftRadius: 20
//   }
// });