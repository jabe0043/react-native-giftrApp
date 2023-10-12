import { PeopleProvider } from './context/PeopleContext'
import { StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import PeopleScreen from './screens/PeopleScreen'
import AddPersonScreen from './screens/AddPersonScreen'
import IdeaScreen from './screens/IdeaScreen'
import AddIdeaScreen from './screens/AddIdeaScreen'

/*TODO: 
- Application's state context goes after the SafeAreaProvider
- State manager
- conditional render for ios header "add" link vs android FAB btn. may need to make a header componenet rather than using the stack.screen header prop. 
*/

//https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/installation //handler gesture

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PeopleProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen 
                  name="PeopleScreen" 
                  component={PeopleScreen}
                  options={({ navigation }) => ({
                    title: "Giftees",
                    headerRight: () => (
                      <Button
                        onPress={() => navigation.navigate('AddPersonScreen')}
                        title="Add"
                      />
                    )
                  })}
                />
                <Stack.Screen 
                  name="AddPersonScreen" 
                  component={AddPersonScreen} 
                  options={({ navigation }) => ({
                    title: "Add Giftee",
                  })}
                />
                <Stack.Screen 
                  name="IdeaScreen" 
                  component={IdeaScreen} 
                  options={({ navigation }) => ({
                    title:"Gifts",
                    headerRight: () => (
                      <Button
                        onPress={() => navigation.navigate('AddIdeaScreen')}
                        title="Add Gifts"
                      />
                    )
                })}
                />
                <Stack.Screen 
                  name="AddIdeaScreen" 
                  component={AddIdeaScreen} 
                  options={{title:"Add Gift"}}
                />
              </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </PeopleProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
