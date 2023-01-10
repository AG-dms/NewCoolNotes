import {
  StyleSheet,
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  View,
} from 'react-native';

import { themes } from '@themes/themes';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface TextInputProps extends NativeTextInputProps {
  type?: string;
}

export type TextInput = NativeTextInput;

const NoteTitle: React.FC<TextInputProps> = ({
  type,

  ...props
}) => {
  const styles = StyleSheet.create({
    wrapper: {
      marginBottom: 15,
      flexDirection: 'row',
      flexWrap: 'nowrap',
      // alignItems: 'center',
      // borderBottomWidth: 2,
      paddingHorizontal: 10,
      // borderColor: themes.colors.defaultBorder,
    },
    textInput: {
      flex: 1,
      color: themes.colors.defaultBorder,
      fontSize: 26,
      alignSelf: 'stretch',
      margin: 0,
      padding: 0,
      // includeFontPadding: false,
    },
  });

  const { t } = useTranslation();

  return (
    <View style={styles.wrapper}>
      <NativeTextInput
        numberOfLines={1}
        multiline={false}
        placeholder={t('forms:note.title')}
        placeholderTextColor={themes.colors.placeholder}
        style={[styles.textInput]}
        {...props}
      />
    </View>
  );
};

export default NoteTitle;
