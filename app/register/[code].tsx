import { View, Text, Alert } from 'react-native'

import { Image } from '@/components/ui/image'
import { Divider } from '@/components/ui/divider'
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input'
import { useState, useCallback } from 'react'
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon'
import { CustomButton } from '@/components/Button'
import { Link, LinkText } from '@/components/ui/link'
import { signUp, signUpInv, StInfoByCode } from '@/services/user'
import { useLocalSearchParams, useFocusEffect, useRouter } from 'expo-router'
import { InfoByCode } from '@/types/types'

export default function RegisterScreen() {
  const { code } = useLocalSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [patronymic, setPatronymic] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [isEmailAndPasswordDisabled, setIsEmailAndPasswordDisabled] =
    useState(false)
  const [isNameDisabled, setIsNameDisabled] = useState(false)
  const router = useRouter()

  async function getStInfo() {
    if (code !== 'new') {
      const inviteCode = Array.isArray(code) ? code[0] : code
      const data = await StInfoByCode(inviteCode)
      if (!data) {
        router.push('/login')
        return
      }
      setIsNameDisabled(true)
      setFirstName(data.student.first_name)
      setLastName(data.student.last_name)
      setPatronymic(data.student.patronymic)
      if (data.invitation.is_used) {
        setIsEmailAndPasswordDisabled(true)
        Alert.alert(
          'Пользователь уже зарегистрирован',
          'Перейдите на страницу входа'
        )
      }
    }
  }
  function isDataCorrect() {
    const isName = firstName.length !== 0 || firstName.length !== 0
    const isPassword = password !== confPassword || password.length !== 0
    const isEmail = email.length !== 0
    if (!isName) {
      Alert.alert('Предупреждение', 'Введите фамилию и имя')
    }
    if (!isPassword) {
      Alert.alert(
        'Предупреждение',
        'Поля паролей должны быть не пустыми и должны совпадать'
      )
    }
    if (!isEmail) {
      Alert.alert('Предупреждение', 'Введите почту')
    }
    return isName || isPassword || isEmail
  }
  function register() {
    if (isDataCorrect() && code === 'new') {
      signUp(
        {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          password: password,
          confirm_password: confPassword,
          patronymic: patronymic.trim(),
        },
        router
      )
    } else if (isDataCorrect() && code !== 'new') {
      const inviteCode = Array.isArray(code) ? code[0] : code
      signUpInv(
        {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          password: password,
          confirm_password: confPassword,
          patronymic: patronymic.trim(),
          invite_code: inviteCode,
        },
        router
      )
    }
  }
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }
  useFocusEffect(
    useCallback(() => {
      getStInfo()
      return () => {
        setFirstName('')
        setLastName('')
        setPatronymic('')
        setEmail('')
        setPassword('')
        setConfPassword('')
      }
    }, [])
  )
  return (
    <View className="w-full h-full bg-background-1 relative">
      <View className="w-full h-1/3 bg-primary-0 rounded-b-custom-big flex justify-center items-center"></View>
      <View className="w-full h-2/3 bg-background-1"></View>
      <View className="z-40 absolute w-full h-full flex justify-around items-center">
        <View className="bg-background-1 w-[90%] h-[80%] rounded-custom-big flex items-center justify-evenly shadow-md">
          <Image
            size="lg"
            source={require('../../assets/images/mobile_logo_blue.png')}
            alt="image"
            className="aspect-[1280/473] w-full"
          />
          <View className="w-[90%] flex justify-between gap-3">
            <View className="w-[90%] flex justify-end items-start gap-2">
              <Text className="font-extrabold text-l text-start text-primary-0">
                Регистрация
              </Text>
            </View>
            <Input
              className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30"
              isDisabled={isNameDisabled}
            >
              <InputField
                className="text-typography-1"
                placeholder="Фамилия"
                value={lastName}
                onChangeText={(text: string) => {
                  setLastName(text)
                }}
              />
            </Input>
            <Input
              className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30"
              isDisabled={isNameDisabled}
            >
              <InputField
                className="text-typography-1"
                placeholder="Имя"
                value={firstName}
                onChangeText={(text: string) => {
                  setFirstName(text)
                }}
              />
            </Input>
            <Input
              className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30"
              isDisabled={isNameDisabled}
            >
              <InputField
                className="text-typography-1"
                placeholder="Отчество"
                value={patronymic}
                onChangeText={(text: string) => {
                  setPatronymic(text)
                }}
              />
            </Input>
            <Input
              className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30"
              isDisabled={isEmailAndPasswordDisabled}
            >
              <InputField
                className="text-typography-1"
                placeholder="Почта"
                value={email}
                keyboardType="email-address"
                onChangeText={(text: string) => {
                  setEmail(text)
                }}
              />
            </Input>
            <Input
              className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30"
              isDisabled={isEmailAndPasswordDisabled}
            >
              <InputField
                placeholder="Пароль"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChangeText={(text: string) => {
                  setPassword(text)
                }}
              />
              <InputSlot className="pr-3" onPress={handleState}>
                <InputIcon
                  className="text-typography-1/50 w-5 h-5"
                  as={showPassword ? EyeIcon : EyeOffIcon}
                />
              </InputSlot>
            </Input>
            <Input
              className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30"
              isDisabled={isEmailAndPasswordDisabled}
            >
              <InputField
                placeholder="Повторить пароль"
                type={showPassword ? 'text' : 'password'}
                value={confPassword}
                onChangeText={(text: string) => {
                  setConfPassword(text)
                }}
              />
              <InputSlot className="pr-3" onPress={handleState}>
                <InputIcon
                  className="text-typography-1/50 w-5 h-5"
                  as={showPassword ? EyeIcon : EyeOffIcon}
                />
              </InputSlot>
            </Input>
            <CustomButton
              color="blue"
              buttonText="Зарегистрироваться"
              className="w-full"
              classNameText="text-background-1"
              onPress={register}
              isFontSizeChangable={false}
            />
          </View>
          <View className="w-full flex gap-3">
            <View className="flex-row justify-center items-center gap-2">
              <Divider
                className="w-[35%] my-0.5 bg-typography-1/50"
                orientation="horizontal"
              />
              <Text className="text-primary-0 font-bold text-s">ИЛИ</Text>
              <Divider
                className="w-[35%] my-0.5 bg-typography-1/50"
                orientation="horizontal"
              />
            </View>
            <View className="flex-row justify-center items-start gap-1">
              <Text className="text-typography-1">У вас уже есть аккаунт?</Text>
              <Link onPress={() => router.push('/login')}>
                <LinkText className="text-primary-0">Войдите.</LinkText>
              </Link>
            </View>
            {code === 'new' ? (
              <View className="flex-row justify-center items-start gap-1">
                <Text className="text-typography-1">
                  У вас есть код приглашения?
                </Text>
                <Link onPress={() => router.push('/join_code')}>
                  <LinkText className="text-primary-0">
                    Войдите по коду.
                  </LinkText>
                </Link>
              </View>
            ) : (
              ''
            )}
          </View>
        </View>
      </View>
    </View>
  )
}
