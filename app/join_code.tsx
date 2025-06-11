import { View, Text } from 'react-native'
import { Image } from '@/components/ui/image'
import { Divider } from '@/components/ui/divider'
import { Input, InputField, InputSlot, InputIcon } from '@/components/ui/input'
import { useState } from 'react'
import { CustomButton } from '@/components/Button'
import { Link, LinkText } from '@/components/ui/link'
import { useRouter } from 'expo-router'
export default function CodeScreen() {
  const [code, setCode] = useState('')
  const router = useRouter()
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
                  Код приглашения
                </Text>
              </View>
              <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30">
                <InputField
                  className="text-typography-1"
                  placeholder="Код"
                  value={code}
                  onChangeText={(text: string) => {
                    setCode(text)
                  }}
                />
              </Input>
              <CustomButton
                color="blue"
                buttonText="Войти"
                className="w-full"
                classNameText="text-background-1"
                isDisabled={code.length !== 8}
                onPress={() => {
                  router.push({
                    pathname: '/register/[code]',
                    params: { code: code },
                  });
                }}/>
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
                  У вас уже есть аккаунт?
                </Text>
                <Link onPress={() => router.push('/login')}>
                  <LinkText className="text-primary-0">Войдите.</LinkText>
                </Link>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
