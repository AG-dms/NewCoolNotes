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
import { SignUpScreenName } from './SignUpScreen';
import auth from '@react-native-firebase/auth';
import { useTranslation } from 'react-i18next';
export const SignInScreenName = 'SignInScreen' as const;

type SignInScreenProps = NativeStackScreenProps<AuthNavigatorParamList, 'SignInScreen'>;

export interface FormState {
  login: string;
  password: string;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const validationSchema = yup
    .object({
      login: yup.string().required(t<string>('forms:auth.validation.required')),
      password: yup
        .string()
        .required(t<string>('forms:auth.validation.required'))
        .min(6, t<string>('forms:auth.validation.minLengthPassword')),
    })
    .required();
  const { control, handleSubmit } = useForm<FormState>({
    defaultValues: {
      login: '',
      password: '',
    },
    // TODO add validation schema
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data: FormState) => {
    auth().signInWithEmailAndPassword(data.login, data.password);
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
          <Text>Вход</Text>
        </View>
        <Controller
          name="login"
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <TextInput
              title={t('forms:auth.titles.login')}
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
              title={t('forms:auth.titles.password')}
              hasError={!!fieldState.error?.message}
              errorText={fieldState.error?.message}
              onBlur={onBlur}
              showPlaceholder={true}
              onChangeText={text => onChange(text)}
              value={value}
            />
          )}
        />

        <CustomPressable onPress={handleSubmit(onSubmit)} text={t('action:signIn')} />
        <Pressable onPress={() => navigation.replace(SignUpScreenName)}>
          <Text style={styles.link}>{t('action:linkToSignUp')}</Text>
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
