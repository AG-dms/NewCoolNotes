import {
  StyleSheet,
  Text,
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  View,
} from 'react-native';

import { themes } from '@themes/themes';
import React from 'react';

export interface TextInputProps extends NativeTextInputProps {
  hasError?: boolean;
  title?: string;
  errorText?: string;
  type?: string;
  showPlaceholder?: boolean;
}

const HEIGHT = 46;
const TITLE_SIZE = 12;

export type TextInput = NativeTextInput;

const TextInput: React.FC<TextInputProps> = ({
  hasError = false,
  errorText,
  title,
  type,
  showPlaceholder = true,
  ...props
}) => {
  const styles = StyleSheet.create({
    wrapper: {
      paddingTop: 6,
      paddingBottom: 2,
      marginBottom: 25,
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
      borderBottomWidth: 2,
      paddingHorizontal: 12,
      marginVertical: 10,
      borderColor: hasError ? themes.colors.errorBorder : themes.colors.defaultBorder,
    },
    textInput: {
      flex: 1,
      color: themes.colors.defaultBorder,
      fontSize: 18,
      alignSelf: 'stretch',
      margin: 0,
      padding: 0,
      includeFontPadding: false,
    },

    titleWrapper: {
      // backgroundColor: theme.colors.surface,
      paddingVertical: 0,
      paddingHorizontal: 4,
      position: 'absolute',
      left: 10,
      top: -TITLE_SIZE / 2,
      maxWidth: 250,
    },
    errorWrapper: {
      // backgroundColor: theme.colors.surface,
      paddingVertical: 0,
      paddingHorizontal: 4,
      position: 'absolute',
      left: 10,
      bottom: -TITLE_SIZE - 8,
      maxWidth: 250,
    },
    title: {
      // ...fonts.medium,
      color: hasError ? themes.colors.errorBorder : themes.colors.defaultBorder,
      fontSize: TITLE_SIZE,
      lineHeight: TITLE_SIZE,
    },
  });

  const titleText = title ? title : props.placeholder;
  const showTitle = props.value;

  return (
    <View style={styles.wrapper}>
      {showTitle ? (
        <View style={[styles.titleWrapper]}>
          <Text style={[styles.title]} numberOfLines={1} ellipsizeMode="tail">
            {titleText}
          </Text>
        </View>
      ) : null}
      <NativeTextInput
        numberOfLines={1 /** https://github.com/facebook/react-native/issues/30437 */}
        multiline={false}
        placeholder={showPlaceholder ? titleText : ''}
        // textAlignVertical={textAlignVertical}
        style={[styles.textInput]}
        {...props}
      />
      {errorText && hasError ? (
        <View style={[styles.errorWrapper]}>
          <Text style={[styles.title]} numberOfLines={1} ellipsizeMode="tail">
            {errorText}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default TextInput;
