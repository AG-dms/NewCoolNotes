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
import { themes } from '@themes/themes';

export interface TextInputProps extends NativeTextInputProps {
  hasError?: boolean;
  title?: string;
  errorText?: string;
  showPlaceholder?: boolean;
  type?: string;
}

const HEIGHT = 46;
const TITLE_SIZE = 12;

export type PasswordInput = NativeTextInput;

const PasswordInput: React.FC<TextInputProps> = ({
  hasError = false,
  errorText,
  style,
  title,
  showPlaceholder,
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

  const titleText = title ? title : props.placeholder;
  const showTitle = props.value;

  const [passwordShow, setPasswordShow] = useState<boolean>(true);

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
        secureTextEntry={passwordShow}
        numberOfLines={1}
        multiline={false}
        placeholder={showPlaceholder ? titleText : ''}
        placeholderTextColor={themes.colors.placeholder}
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
        <View style={[styles.errorWrapper]}>
          <Text style={[styles.title]} numberOfLines={1} ellipsizeMode="tail">
            {errorText}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default PasswordInput;
