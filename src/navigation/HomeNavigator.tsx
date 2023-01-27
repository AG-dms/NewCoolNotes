import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FoldersScreen, { FoldersScreenName } from '@screens/FoldersScreen/FoldersScreen';
import HomeScreen, { HomeScreenName } from '@screens/Home/HomeScreen';
import NewNoteScreen, { NewNoteScreenName } from '@screens/NewNoteScreen/NewNote';
import SearchScreen, { SearchScreenName } from '@screens/SearchScreen/SearchScreen';
import SettingsScreen, { SettingsScreenName } from '@screens/SettingsScreen/SettingsScreen';
import { themes } from '@themes/themes';
import React, { useEffect, useState } from 'react';
import { Keyboard, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MainNavigatorParamList } from './MainNavigator';
import SearchIcon from 'react-native-vector-icons/Ionicons';
import { IconButton } from 'react-native-paper';

export type HomeNavigatorParamList = {
  [HomeScreenName]: undefined;
  [FoldersScreenName]: undefined;
  [NewNoteScreenName]: {
    noteId?: string | null;
    folderName?: string | null;
  };
  [SettingsScreenName]: undefined;
  [SearchScreenName]: undefined;
};

export const HomeNavigatorName = 'HomeNavigator';
const Tab = createBottomTabNavigator<HomeNavigatorParamList>();

// type HomeNavigatorProps = NativeStackNavigationProp<
//   MainNavigatorParamList,
//   typeof HomeNavigatorName
// >;

// TODO fix type
// export const HomeNavigator: React.FC<HomeNavigatorProps> = () => {
export const HomeNavigator: React.FC = () => {
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [keyboardStatus]);

  return (
    <Tab.Navigator
      backBehavior="history"
      initialRouteName={HomeScreenName}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: themes.colors.secondBackground,
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: themes.colors.primaryText,
        tabBarInactiveTintColor: themes.colors.secondaryText,
        tabBarShowLabel: false,
        tabBarIcon: ({ color, focused, size }) => {
          if (route.name === HomeScreenName) {
            return (
              <Icon
                name={focused ? 'note' : 'note-outline'}
                size={size}
                color={focused ? themes.colors.primaryText : themes.colors.secondaryText}
              />
            );
          }
          if (route.name === FoldersScreenName) {
            return (
              <Icon
                name={focused ? 'folder' : 'folder-outline'}
                size={size}
                color={focused ? themes.colors.primaryText : themes.colors.secondaryText}
              />
            );
          }
          if (route.name === NewNoteScreenName) {
            return (
              <View
                style={{
                  width: 35,
                  aspectRatio: 1,
                  marginBottom: 0,
                  backgroundColor: themes.colors.buttonPrimary,
                  padding: 5,
                  borderRadius: 40,
                  borderColor: themes.colors.primaryBackground,

                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="plus" color={themes.colors.primaryBackground} size={25} />
              </View>
            );
          }
          if (route.name === SearchScreenName) {
            return (
              <SearchIcon
                name="search"
                size={size}
                color={focused ? themes.colors.primaryText : themes.colors.secondaryText}
              />
            );
          }
          if (route.name === SettingsScreenName) {
            return (
              <Icon
                name={focused ? 'account' : 'account-outline'}
                size={size}
                color={focused ? themes.colors.primaryText : themes.colors.secondaryText}
              />
            );
          }
          return null;
        },
      })}
    >
      <Tab.Screen name={HomeScreenName} component={HomeScreen} />
      <Tab.Screen name={FoldersScreenName} component={FoldersScreen} />
      <Tab.Screen name={NewNoteScreenName} component={NewNoteScreen} />
      <Tab.Screen name={SearchScreenName} component={SearchScreen} />
      <Tab.Screen name={SettingsScreenName} component={SettingsScreen} />
    </Tab.Navigator>
  );
};
