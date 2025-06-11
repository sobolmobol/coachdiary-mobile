import { View, Text } from 'react-native'
import { Image } from '@/components/ui/image'
import { Divider } from '@/components/ui/divider'
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input'
import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon'
import { CustomButton } from '@/components/Button'
import { Link, LinkText } from '@/components/ui/link'
import { useRouter } from 'expo-router'
import { login } from '@/services/user'
import { useLocalSearchParams } from 'expo-router'
export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  function isButtonDisabled() {
    return password.length === 0 || email.length === 0
  }
  async function signIn() {
    await login(email.trim(), password, router)
  }
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }
  return (
    <View className="w-full h-full bg-background-1 relative">
      <View className="w-full h-1/3 bg-primary-0 rounded-b-custom-big flex justify-center items-center"></View>
      <View className="w-full h-2/3 bg-background-1"></View>
      <View className="z-40 absolute w-full h-full flex justify-around items-center">
        <View className="w-[90%] h-[80%] bg-background-1 shadow-md rounded-custom-big flex justify-around">
          <View className="w-full flex justify-start items-center gap-2">
            <Image
              size="lg"
              source={require('../assets/images/mobile_logo_blue.png')}
              alt="image"
              className="aspect-[1280/473] w-full"
            />
            <View className="w-[90%] flex justify-between items-center gap-3">
              <View className="w-[90%] flex justify-end items-start gap-2">
                <Text className="font-extrabold text-l text-start text-primary-0">
                  Вход
                </Text>
              </View>
              <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30">
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
              <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30">
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
              <CustomButton
                color="blue"
                buttonText="Войти"
                className="w-full"
                classNameText="text-background-1"
                disabled={isButtonDisabled()}
                onPress={signIn}
              />
            </View>
            <View className="w-full flex gap-8">
              <View className="flex-row justify-center items-center gap-2">
                <Divider
                  className="w-[38%] my-0.5 bg-typography-1/50"
                  orientation="horizontal"
                />
                <Text className="text-primary-0 font-bold text-s">ИЛИ</Text>
                <Divider
                  className="w-[38%] my-0.5 bg-typography-1/50"
                  orientation="horizontal"
                />
              </View>
              <View className="flex-row justify-center items-start gap-1">
                <Text className="text-typography-1">
                  У вас еще нет аккаунта?
                </Text>
                <Link
                  onPress={() =>
                    router.push({
                      pathname: '/register/[code]',
                      params: { code: 'new' },
                    })
                  }
                >
                  <LinkText className="text-primary-0">
                    Зарегистрируйтесь.
                  </LinkText>
                </Link>
              </View>
            </View>
            <View className="flex-row justify-center items-start gap-1">
              <Text className="text-typography-1">
                У вас есть код приглашения?
              </Text>
              <Link onPress={() => router.push('/join_code')}>
                <LinkText className="text-primary-0">Войдите по коду.</LinkText>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
