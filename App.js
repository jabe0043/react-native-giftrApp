import { PeopleProvider } from './context/PeopleContext'
import { Button, Platform, Pressable, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PeopleScreen from './screens/PeopleScreen'
import AddPersonScreen from './screens/AddPersonScreen'
import IdeaScreen from './screens/IdeaScreen'
import AddIdeaScreen from './screens/AddIdeaScreen'
// import { ThemeProvider } from './context/ThemeProvider';

/*TODO: 
- Application's state context goes after the SafeAreaProvider
- State manager
- conditional render for ios header "add" link vs android FAB btn. may need to make a header componenet rather than using the stack.screen header prop. 
*/

const Stack = createNativeStackNavigator();

export default function App(route, navigation) {
  const OS = Platform.OS;
  console.log(OS);

  return (
    <PeopleProvider>
      {/* <ThemeProvider> */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerStyle: {backgroundColor: '#468b80', border:"none"},
                  headerTintColor: 'white',
                  headerShadowVisible: false
                }}
              >
                <Stack.Screen 
                  name="PeopleScreen" 
                  component={PeopleScreen}
                  options={({ navigation }) => ({
                    title: "Giftees",
                    headerRight: () => (
                      OS === "ios" && 
                      <Button
                        onPress={() => navigation.navigate('AddPersonScreen')}
                        title="Add"
                        color="#fff"
                      />
                    )
                  })}
                />
                <Stack.Screen 
                  name="AddPersonScreen" 
                  component={AddPersonScreen} 
                  options={({ navigation }) => ({
                    title: "Add a Giftee",
                  })}
                />
                <Stack.Screen 
                  name="IdeaScreen" 
                  component={IdeaScreen} 
                options={({ navigation, route }) => ({
                  title: "Gift Ideas",
                  headerRight: () => (
                      <Button
                        title="Add Idea"
                        color="#fff"
                        onPress={() => {
                            navigation.navigate("AddIdeaScreen", 
                                route.params,
                            );
                        }}
                      >
                      </Button>
                  )})}
                  />
                <Stack.Screen 
                  name="AddIdeaScreen" 
                  component={AddIdeaScreen} 
                  options={{title:"Add an Idea"}}
                  // options={{title:"Add Gift"}}
                />
              </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
      {/* </ThemeProvider> */}
    </PeopleProvider>
  );
}

