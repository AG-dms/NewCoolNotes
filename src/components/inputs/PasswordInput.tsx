import {
  TextInputProps as NativeTextInputProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  TextInput as NativeTextInput,
  View,
  Text,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { themes } from '@themes/Themes';

export interface TextInputProps extends NativeTextInputProps {
  hasError?: boolean;
  title?: string;
  errorText?: string;
  placeholderText?: string;
  titleStyle?: StyleProp<TextStyle>;
  errorTextStyle?: StyleProp<TextStyle>;
  titleWrapperStyle?: StyleProp<TextStyle>;
  showPlaceholder?: boolean;
  type?: string;
}

const HEIGHT = 46;
const TITLE_SIZE = 12;

export type PasswordInput = NativeTextInput;

const PasswordInput: React.FC<TextInputProps> = ({
  value,
  hasError = false,
  errorText,
  style,
  title,
  titleStyle,
  titleWrapperStyle,
  placeholder,
  showPlaceholder,
  type,
  placeholderTextColor,
  errorTextStyle,
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
      paddingHorizontal: 12,
      marginVertical: 20,
      borderColor: hasError ? themes.colors.errorBorder : themes.colors.defaultBorder,
      borderBottomWidth: 2,
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

  const placeholderText = !placeholder && title && !value ? title : placeholder;
  const titleText = title ? title : placeholder;
  const showTitle = Boolean(title || (placeholder && value));

  const [passwordShow, setPasswordShow] = useState<boolean>(true);

  return (
    <View style={styles.wrapper}>
      {showTitle ? (
        <View style={[styles.titleWrapper, titleWrapperStyle]}>
          <Text style={[styles.title, titleStyle]} numberOfLines={1} ellipsizeMode="tail">
            {titleText}
          </Text>
        </View>
      ) : null}
      <NativeTextInput
        secureTextEntry={passwordShow}
        value={value}
        numberOfLines={1 /** https://github.com/facebook/react-native/issues/30437 */}
        multiline={false}
        placeholder={showPlaceholder ? placeholderText : ''}
        placeholderTextColor={
          placeholderTextColor ? placeholderTextColor : themes.colors.defaultBorder
        }
        // textAlignVertical={textAlignVertical}
        style={[styles.textInput, style]}
        {...props}
      />
      <Pressable hitSlop={10} onPress={() => setPasswordShow(!passwordShow)}>
        <TapGestureHandler>
          <Icon
            size={25}
            color={themes.colors.defaultBorder}
            name={!passwordShow ? 'eye-outline' : 'eye-off-outline'}
          />
        </TapGestureHandler>
      </Pressable>
      {errorText && hasError ? (
        <View style={[styles.errorWrapper, titleWrapperStyle]}>
          <Text style={[styles.title, titleStyle]} numberOfLines={1} ellipsizeMode="tail">
            {errorText}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default PasswordInput;
