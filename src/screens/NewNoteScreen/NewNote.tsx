import { HomeNavigatorParamList } from '@navigation/HomeNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { actions, RichEditor, RichToolbar, RichEditorProps } from 'react-native-pell-rich-editor';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { themes } from '@themes/themes';

export const NewNoteScreenName = 'NewNoteScreen' as const;

type NewNoteScreenProps = NativeStackScreenProps<HomeNavigatorParamList, typeof NewNoteScreenName>;

const NewNoteScreen: React.FC<NewNoteScreenProps> = () => {
  const richText = React.useRef<RichEditor | null>(null);

  const [visible, setVisible] = useState(false);
  const handleFontSize = useCallback(size => {
    // 1=  10px, 2 = 13px, 3 = 16px, 4 = 18px, 5 = 24px, 6 = 32px, 7 = 48px;

    richText.current?.setFontSize(size);
  }, []);

  const handleForeColor = useCallback((color: string) => {
    richText.current?.setForeColor(color);
  }, []);
  const handleHiliteColor = useCallback(color => {
    richText.current?.setHiliteColor(color);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {visible && (
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
      )}
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={{
          flex: 1,
        }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <RichEditor
          style={{ flexGrow: 1 }}
          editorStyle={{
            backgroundColor: themes.colors.primaryBackground,
            caretColor: themes.colors.primaryText,
            color: themes.colors.primaryText,
            contentCSSText: 'green',
          }}
          ref={richText}
          onFocus={() => setVisible(true)}
          onPointerDownCapture={() => console.log('first')}
          onPointerUpCapture={() => console.log('first2')}
          onCustomMenuSelection={() => {
            return (
              <View>
                <Text>Hello</Text>
              </View>
            );
          }}
          onPointerCancelCapture={() => console.log('first4')}
          placeholder={'Начните запись здесь...'}
          onChange={descriptionText => {
            console.log('descriptionText:', descriptionText);
          }}
          pasteAsPlainText={true}
        />
      </KeyboardAwareScrollView>

      <RichToolbar
        editor={richText}
        // iconTint={color}
        selectedIconTint={'#2095F2'}
        disabledIconTint={'#bfbfbf'}
        // iconSize={24}
        // iconGap={10}

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
          [actions.foreColor]: ({ tintColor }) => <Text>FC</Text>,
          [actions.hiliteColor]: ({ tintColor }) => (
            <Text style={[{ color: tintColor, backgroundColor: 'red' }]}>BC</Text>
          ),
          [actions.fontSize]: ({ tintColor }) => <Text>Size</Text>,
        }}
        fontSize={handleFontSize}
        foreColor={handleForeColor}
        hiliteColor={handleHiliteColor}
      />
    </SafeAreaView>
  );
};

export default NewNoteScreen;
