import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function AddIdeaScreen() {

  const insets = useSafeAreaInsets();
  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Add Idea Screen</Text>
    </View>
  );
}