import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { themes } from '@themes/themes';

interface ButtonProps extends PressableProps {
  disabled?: boolean;
  text?: string;
  onPress?: () => void;
  loading?: boolean;
  color?: string;
  small?: boolean;
  outlined?: boolean;
}

const BUTTON_HEIGHT = 48;
const BUTTON_WIDTH = '100%';
const BUTTON_HEIGHT_SM = 40;
const BUTTON_BORDER_RADIUS = 10;

const CustomPressable: React.FC<ButtonProps> = ({
  disabled,
  text,
  hitSlop,
  color,
  small,
  loading,
  onPress,
  outlined,
  ...props
}) => {
  return (
    <View
      style={[
        styles.container,
        small ? styles.smallContainer : styles.defaultButtonContainer,
        outlined ? styles.outlined : null,
        color ? { backgroundColor: color } : { backgroundColor: themes.colors.buttonPrimary },
        { overflow: 'hidden' },
      ]}
    >
      <Pressable
        onPress={onPress}
        style={[
          styles.container,
          small ? styles.smallContainer : styles.defaultContainer,
          outlined ? styles.outlined : null,
          color ? { backgroundColor: color } : { backgroundColor: themes.colors.buttonPrimary },
          { overflow: 'hidden' },
        ]}
        hitSlop={hitSlop}
        android_ripple={{
          color: themes.colors.rippleColor,
          foreground: true,
          // borderless: true,
          // radius: 0,
        }}
      >
        <View>
          <Text style={styles.text}>{text}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CustomPressable;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BUTTON_BORDER_RADIUS,
    marginVertical: 15,
  },
  defaultContainer: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    padding: 10,
  },
  defaultButtonContainer: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
  },
  smallContainer: {
    maxWidth: BUTTON_WIDTH,
    height: BUTTON_HEIGHT_SM,
    paddingHorizontal: 4,
  },
  outlined: {
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
});
