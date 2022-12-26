import { HomeNavigatorParamList } from '@navigation/HomeNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';

export const SettingsScreenName = 'SettingsScreen' as const;

type SettingsScreenProps = NativeStackScreenProps<
  HomeNavigatorParamList,
  typeof SettingsScreenName
>;

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  return (
    <View>
      <Text>SettingsScree</Text>
    </View>
  );
};

export default SettingsScreen;
