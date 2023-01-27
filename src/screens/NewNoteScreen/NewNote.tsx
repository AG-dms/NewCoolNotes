import NoteTitle from '@components/inputs/NoteTitle';
import { useAppSelector } from '@hooks/storeHook';
import { HomeNavigatorParamList } from '@navigation/HomeNavigator';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { themes } from '@themes/themes';
import { backGroundColors, fontSize, textColors } from '@utils/common';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator, IconButton, Menu } from 'react-native-paper';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import { SafeAreaView } from 'react-native-safe-area-context';
import uuid from 'react-native-uuid';

export const NewNoteScreenName = 'NewNoteScreen' as const;

type NewNoteScreenProps = NativeStackScreenProps<HomeNavigatorParamList, typeof NewNoteScreenName>;

const NewNoteScreen: React.FC<NewNoteScreenProps> = ({ navigation, route }) => {
  const noteId = route.params?.noteId;
  const folderName = route.params?.folderName;
  const userId = useAppSelector(state => state.auth.user?.id);
  const { t } = useTranslation();

  const richText = React.useRef<RichEditor | null>(null);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  const [activeTextColor, setActiveTextColor] = useState<string | null>(null);
  const [textColorVisible, setTextColorVisible] = useState(false);
  const openTextColorMenu = () => setTextColorVisible(true);
  const closeTextColorMenu = () => {
    setTextColorVisible(false);
    setActiveTextColor(null);
  };

  const [activeBackTextColor, setActiveBackTextColor] = useState<string | null>(null);
  const [textBackColorVisible, setTextBackColorVisible] = useState(false);
  const openTextBackColorMenu = () => setTextBackColorVisible(true);
  const closeTextBackColorMenu = () => {
    setTextBackColorVisible(false);
    setActiveBackTextColor(null);
  };

  const [activeFontSize, setActiveFontSize] = useState<string | null>(null);
  const [fontSizeVisible, setFontSizeVisible] = useState(false);
  const openFontSizeMenu = () => setFontSizeVisible(true);
  const closeFontSizeMenu = () => {
    setFontSizeVisible(false);
    setActiveFontSize(null);
  };

  const uniqId = uuid.v4();

  const handleCreateNote = (): void => {
    const note = {
      id: noteId ? noteId : uniqId,
      title: title,
      noteText: text,
      created_at: new Date(),
    };
    firestore()
      .collection('Notes')
      .doc(`${userId}`)
      .collection(folderName ? folderName : 'unfolder')
      .doc(noteId ? noteId : uniqId)
      .set(note);

    navigation.goBack();
  };

  const handleFontSize = useCallback((size: any) => {
    richText.current?.setFontSize(size);
  }, []);

  const handleForeColor = useCallback((color: string) => {
    richText.current?.setForeColor(color);
  }, []);

  const handleHiliteColor = useCallback((backgroundColor: string) => {
    richText.current?.setHiliteColor(backgroundColor);
  }, []);

  const getNote = async () => {
    setLoading(true);
    await firestore()
      .collection('Notes')
      .doc(`${userId}`)
      .collection(`${folderName}`)
      .doc(`${noteId}`)
      .get()
      .then(response => {
        setTitle(response.data()?.title);
        setText(response.data()?.noteText);
      })
      .catch(error => setLoading(false));

    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      if (folderName && noteId) {
        getNote();
      } else {
        setLoading(false);
      }
      return () => {
        setTitle('');
        richText.current?.setContentHTML('');
        navigation.setParams({ folderName: null, noteId: null });
      };
    }, [noteId, folderName]),
  );

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerLeft: () => {
        return (
          <IconButton
            icon={'keyboard-backspace'}
            iconColor="#fff"
            onPress={() => {
              navigation.goBack();
            }}
          />
        );
      },
      headerRight: () => {
        return <IconButton icon={'content-save'} iconColor="#fff" onPress={handleCreateNote} />;
      },
      headerStyle: {
        backgroundColor: themes.colors.primaryBackground,
      },
    });
  }, [title, text]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: themes.colors.primaryBackground, paddingTop: 12 }}
    >
      {/* {visible && (
        <RichToolbar
          editor={richText}
          selectedIconTint={'#2095F2'}
          disabledIconTint={'#bfbfbf'}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.setStrikethrough,
            actions.heading1,
            actions.heading2,
            actions.heading3,
            actions.Button,
          ]}
          iconMap={{
            [actions.heading1]: ({ tintColor }) => <Text style={[{ color: tintColor }]}>H1</Text>,
            [actions.heading2]: ({ tintColor }) => <Text style={[{ color: tintColor }]}>H2</Text>,
            [actions.heading3]: ({ tintColor }) => <Text style={[{ color: tintColor }]}>H3</Text>,
            [actions.Button]: ({ tintColor }) => <Text style={[{ color: tintColor }]}>But</Text>,
          }}
        />
      )} */}

      {loading && (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size={60} color={themes.colors.indicator} />
        </View>
      )}
      {!loading && (
        <>
          <NoteTitle onChangeText={setTitle} value={title} />

          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            style={{
              flex: 1,
            }}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <RichEditor
              style={{ flexGrow: 1 }}
              initialContentHTML={text}
              editorStyle={{
                backgroundColor: themes.colors.primaryBackground,
                caretColor: themes.colors.primaryText,
                color: themes.colors.primaryText,
                contentCSSText: 'green',
              }}
              ref={richText}
              placeholder={t('forms:note.title')}
              onChange={descriptionText => {
                setText(descriptionText);
              }}
              pasteAsPlainText={true}
            />
          </KeyboardAwareScrollView>

          <RichToolbar
            editor={richText}
            selectedIconTint={'#2095F2'}
            disabledIconTint={'#bfbfbf'}
            actions={[
              actions.undo,
              actions.redo,
              actions.insertImage,
              actions.checkboxList,
              actions.insertOrderedList,
              actions.insertBulletsList,
              actions.blockquote,
              actions.alignLeft,
              actions.alignCenter,
              actions.alignRight,
              actions.fontSize,
              actions.hiliteColor,
              'foreColor',
            ]}
            //TODO add image picker
            onPressAddImage={() => {
              console.log('add image');
            }}
            iconMap={{
              [actions.foreColor]: ({ tintColor }) => (
                <Menu
                  visible={textColorVisible}
                  onDismiss={closeTextColorMenu}
                  anchor={<IconButton onPress={openTextColorMenu} icon="format-color-text" />}
                  contentStyle={styles.textColorMenu}
                >
                  {textColors.map(color => (
                    <Pressable
                      onPress={() => {
                        setActiveTextColor(color);
                        handleForeColor(color);
                      }}
                      key={color}
                      style={[
                        styles.textColorPicker,
                        { backgroundColor: color },
                        activeTextColor === color ? styles.activeTextColor : null,
                      ]}
                    />
                  ))}
                </Menu>
              ),
              [actions.hiliteColor]: ({ tintColor }) => (
                <Menu
                  visible={textBackColorVisible}
                  onDismiss={closeTextBackColorMenu}
                  anchor={<IconButton onPress={openTextBackColorMenu} icon="format-color-fill" />}
                  contentStyle={styles.textColorMenu}
                >
                  {backGroundColors.map(color => (
                    <Pressable
                      onPress={() => {
                        setActiveBackTextColor(color);
                        handleHiliteColor(color);
                      }}
                      key={color}
                      style={[
                        styles.textColorPicker,
                        { backgroundColor: color },
                        activeBackTextColor === color ? styles.activeTextColor : null,
                      ]}
                    />
                  ))}
                </Menu>
              ),
              [actions.fontSize]: ({ tintColor }) => (
                // <ScrollView horizontal={true}>
                <Menu
                  visible={fontSizeVisible}
                  onDismiss={closeFontSizeMenu}
                  anchor={
                    <IconButton onPress={openFontSizeMenu} icon="format-font-size-decrease" />
                  }
                  contentStyle={{ width: 50 }}
                  // style={{ height: 200 }}
                >
                  {fontSize.map(size => (
                    <Pressable
                      style={styles.fontSizePickerContainer}
                      onPress={() => {
                        setActiveFontSize(size.string);
                        handleFontSize(size.size);
                      }}
                      key={size.string}
                    >
                      <Text style={styles.fontSize}>{size.string}</Text>
                    </Pressable>
                  ))}
                </Menu>
                // </ScrollView>
              ),
            }}
            fontSize={handleFontSize}
            foreColor={handleForeColor}
            hiliteColor={handleHiliteColor}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textColorMenu: {
    flexDirection: 'row',
    display: 'flex',
  },
  textColorPicker: {
    width: 25,
    height: 25,
    borderRadius: 25,
    marginHorizontal: 4,
  },
  fontSizePickerContainer: {
    paddingHorizontal: 4,
  },
  fontSize: {
    marginVertical: 4,
  },
  activeTextColor: {
    borderWidth: 2,
    borderBottomColor: themes.colors.primaryBackground,
  },
});

export default React.memo(NewNoteScreen);
