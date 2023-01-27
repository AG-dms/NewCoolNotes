import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { List } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { NotesData } from '@store/slices/notesSlice/types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import NewNoteScreen, { NewNoteScreenName } from '@screens/NewNoteScreen/NewNote';
import { HomeNavigatorParamList } from '@navigation/HomeNavigator';
import { themes } from '@themes/themes';

type Props = {
  folderName: string;
  userId: string;
};

const Folder: React.FC<Props> = ({ folderName, userId }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<NotesData>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp<HomeNavigatorParamList>>();

  const getNotes = async () => {
    setLoading(true);
    await firestore()
      .collection('Notes')
      .doc(userId)
      .collection(folderName)
      .get()
      .then(response => {
        const notes = response.docs.map(doc => {
          const note = {
            id: doc.id,
            title: doc.data().title,
            text: doc.data().text,
            created_at: doc.data()?.created_at,
          };
          return note;
          // return doc.data();
        });
        setData(notes);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (open) {
      // console.log('test');
      getNotes();
    }
  }, [open]);

  return (
    <List.Accordion
      onPress={() => {
        setOpen(!open);
      }}
      expanded={open}
      style={styles.container}
      titleStyle={styles.title}
      left={() => (
        <>
          <List.Icon
            color={themes.colors.primaryText}
            icon={!open ? 'chevron-right' : 'chevron-down'}
          />
          <List.Icon
            style={{ marginHorizontal: 8 }}
            color={themes.colors.primaryText}
            icon="folder"
          />
        </>
      )}
      right={() => null}
      title={folderName}
      id={folderName}
    >
      {!loading &&
        data.map(item => (
          <List.Item
            style={styles.itemContainer}
            onPress={() =>
              navigation.navigate(NewNoteScreenName, { noteId: item.id, folderName: folderName })
            }
            key={item.title}
            title={item.title}
            titleStyle={styles.title}
            left={() => (
              <List.Icon color={themes.colors.primaryText} icon={'file-document-outline'} />
            )}
          />
        ))}
    </List.Accordion>
  );
};

export default React.memo(Folder);

const styles = StyleSheet.create({
  container: {
    backgroundColor: themes.colors.primaryBackground,
    borderBottomColor: themes.colors.secondBackground,
    borderBottomWidth: 1,
    paddingHorizontal: 8,
  },
  title: {
    color: themes.colors.primaryText,
  },
  itemContainer: {
    paddingLeft: 40,
  },
});
