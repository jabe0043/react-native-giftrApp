import { PeopleProvider } from './context/PeopleContext'
import { StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PeopleScreen from './screens/PeopleScreen'
import AddPersonScreen from './screens/AddPersonScreen'
import IdeaScreen from './screens/IdeaScreen'
import AddIdeaScreen from './screens/AddIdeaScreen'

/*TODO: 
- Application's state context goes after the SafeAreaProvider
- State manager
- conditional render for ios header "add" link vs android FAB btn. may need to make a header componenet rather than using the stack.screen header prop. 
*/
/*
#fac273
#83a3d3
#eb7474
#5dbaab
#625583
#706aa6
*/

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PeopleProvider>
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
                options={{title:"Gifts"}}
              />
              <Stack.Screen 
                name="AddIdeaScreen" 
                component={AddIdeaScreen} 
                options={{title:"Add Gift"}}
              />
            </Stack.Navigator>
          </NavigationContainer>
      </SafeAreaProvider>
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
