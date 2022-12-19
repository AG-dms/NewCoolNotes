import CustomPressable from '@components/buttons/CustomPresable';
import TextInput from '@components/inputs/TextInput';
import { AuthNavigatorParamList } from '@navigation/AuthNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { themes } from '@themes/themes';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PasswordInput from '@components/inputs/PasswordInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SignInScreenName } from './SignInScreen';
import auth from '@react-native-firebase/auth';
export const SignUpScreenName = 'SignUpScreen' as const;

type SignUpScreenProps = NativeStackScreenProps<AuthNavigatorParamList, typeof SignUpScreenName>;

export interface FormState {
  login: string;
  password: string;
  repeatPassword: string;
}

const validationSchema = yup
  .object({
    login: yup.string().required('Обязательное поле'),
    password: yup.string().required('Обязательное поле').min(6, 'Минимум 6 символов'),
    repeatPassword: yup
      .string()
      .required('Обязательное поле')
      .oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
  })
  .required();

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const { control, handleSubmit } = useForm<FormState>({
    defaultValues: {
      login: '',
      password: '',
      repeatPassword: '',
    },
    // TODO add validation schema
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data: FormState) => {
    auth()
      .createUserWithEmailAndPassword(data.login, data.password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={{
          flex: 1,
        }}
        contentContainerStyle={styles.contentContainer}
        pagingEnabled={true}
        centerContent={true}
      >
        <View>
          <Text>Регистрация</Text>
        </View>
        <Controller
          name="login"
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <TextInput
              title="Login"
              hasError={!!fieldState.error?.message}
              errorText={fieldState.error?.message}
              onBlur={onBlur}
              showPlaceholder={true}
              onChangeText={text => onChange(text)}
              value={value}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <PasswordInput
              title="Password"
              hasError={!!fieldState.error?.message}
              errorText={fieldState.error?.message}
              onBlur={onBlur}
              showPlaceholder={true}
              onChangeText={text => onChange(text)}
              value={value}
            />
          )}
        />
        <Controller
          name="repeatPassword"
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <PasswordInput
              title="Repeat password"
              hasError={!!fieldState.error?.message}
              errorText={fieldState.error?.message}
              onBlur={onBlur}
              showPlaceholder={true}
              onChangeText={text => onChange(text)}
              value={value}
            />
          )}
        />

        <CustomPressable onPress={handleSubmit(onSubmit)} text="Регистрация" />
        <Pressable onPress={() => navigation.replace(SignInScreenName)}>
          <Text style={styles.link}>Вход</Text>
        </Pressable>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.primaryBackground,
  },

  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    // fontFamily: themes.font.fontFamily,
    fontWeight: '400',
    color: themes.colors.linkTextColor,
  },
});
