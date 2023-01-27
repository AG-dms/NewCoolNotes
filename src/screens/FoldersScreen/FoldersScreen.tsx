import Folder from '@components/folders/Folder';
import { useAppSelector } from '@hooks/storeHook';
import { HomeNavigatorParamList } from '@navigation/HomeNavigator';
import firestore from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { themes } from '@themes/themes';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import AnimatedHeader from 'react-native-animated-header';
import { ActivityIndicator, IconButton } from 'react-native-paper';

export const FoldersScreenName = 'FoldersScreen' as const;

type FoldersScreenProps = NativeStackScreenProps<HomeNavigatorParamList, typeof FoldersScreenName>;

const FoldersScreen: React.FC<FoldersScreenProps> = () => {
  const userId = useAppSelector(state => state.auth.user.id);
  const [folders, setFolders] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const getNote = async () => {
    setLoading(true);
    const dataNote = (await firestore().collection('Notes').doc(userId).get()).data();
    // console.log('data', dataNote.folders);
    setFolders(dataNote?.folders);
    setLoading(false);
  };

  useEffect(() => {
    getNote();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {!loading && (
        <AnimatedHeader
          style={styles.headerContainer}
          title="Папки"
          renderLeft={() => <IconButton icon="arrow-left" size={26} />}
          renderRight={() => (
            <IconButton
              onPress={() => console.log('tetst')}
              iconColor="green"
              size={26}
              icon="plus"
            />
          )}
          backStyle={{ marginLeft: 10 }}
          backTextStyle={{ fontSize: 14, color: '#000' }}
          titleStyle={{ fontSize: 22, left: 20, bottom: 20, color: '#000' }}
          headerMaxHeight={200}
          toolbarColor="#FFF"
          disabled={false}
        >
          <ScrollView>
            {folders &&
              folders.map(item => <Folder userId={userId} key={item} folderName={item} />)}
          </ScrollView>
        </AnimatedHeader>
      )}

      {loading && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={60} color={themes.colors.buttonPrimary} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.primaryBackground,
  },

  headerContainer: {
    flex: 1,
    backgroundColor: themes.colors.primaryBackground,
    paddingHorizontal: 8,
  },
});

export default FoldersScreen;
