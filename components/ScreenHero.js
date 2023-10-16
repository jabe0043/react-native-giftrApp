import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeProvider';



export default function ScreenHeaders({screenName}){
  const theme = useTheme();

  switch (screenName){
    case "AddPersonScreen":
      return(
        // <ImageBackground
        //   source={require('../assets/relationship-stipple-illustrations.png')} resizeMode="cover"
        // >
          <View style={theme.container}>
            <Text style={{fontSize:theme.text.large}}>Add a New  {'\n'}Giftee</Text>
          </View>
        // </ImageBackground>
      )
      case "IdeaScreen":

    default: 
      return null
  }
}
