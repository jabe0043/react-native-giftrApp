import { PeopleProvider } from './context/PeopleContext'
import { ThemeProvider } from './context/ThemeProvider';
import { Button, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PeopleScreen from './screens/PeopleScreen'
import AddPersonScreen from './screens/AddPersonScreen'
import IdeaScreen from './screens/IdeaScreen'
import AddIdeaScreen from './screens/AddIdeaScreen'



const Stack = createNativeStackNavigator();

export default function App() {
  const OS = Platform.OS;

  return (
    <PeopleProvider>
      <ThemeProvider>
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
                      OS === "ios" && 
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
                />
              </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
      </ThemeProvider>
    </PeopleProvider>
  );
}

