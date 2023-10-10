import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function IdeaScreen() {

  const insets = useSafeAreaInsets();


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Idea Screen</Text>
    </View>
  );
}