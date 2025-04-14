import { View, Text } from "react-native";
import { Image } from "@/components/ui/image";
import { Divider } from "@/components/ui/divider";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import React from "react";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { CustomButton } from "@/components/Button";
import { Link, LinkText } from "@/components/ui/link";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = React.useState(false)
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }
  const router = useRouter();
  return (
    <View className="bg-primary-0 w-full h-full flex items-center justify-center">
      <View className="bg-background-1 w-[80%] h-[80%] rounded-custom flex items-center justify-evenly shadow-md">
        <Image
          size="lg"
          source={require('../assets/images/mobile_logo_blue.png')}
          alt="image"
          className="aspect-[1280/473] w-full"/>
        <View className="w-[90%] flex justify-between gap-3">
          <View className="w-[90%] flex justify-end items-start gap-2">
            <Text className="font-extrabold text-l text-start text-primary-0">Регистрация</Text>
          </View>
          <Input className="rounded-custom border-typography-1">
            <InputField placeholder="Фамилия"/>
          </Input>
          <Input className="rounded-custom border-typography-1">
            <InputField placeholder="Имя"/>
          </Input>
          <Input className="rounded-custom border-typography-1">
            <InputField placeholder="Отчество"/>
          </Input>
          <Input className="rounded-custom border-typography-1">
            <InputField placeholder="Почта"/>
          </Input>
          <Input className="rounded-custom border-typography-1">
            <InputField placeholder="Пароль" type={showPassword ? "text" : "password"} />
            <InputSlot className="pr-3" onPress={handleState}>
              <InputIcon className="text-typography-1/50 w-5 h-5" as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
          <Input className="rounded-custom border-typography-1">
            <InputField placeholder="Повторить пароль" type={showPassword ? "text" : "password"} />
            <InputSlot className="pr-3" onPress={handleState}>
              <InputIcon className="text-typography-1/50 w-5 h-5" as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
          <CustomButton color="blue" buttonText="Зарегистрироваться" className="w-full" classNameText="text-background-1"/>
        </View>
        <View className="w-full flex gap-3">
          <View className="flex-row justify-center items-center gap-2">
            <Divider className="w-[35%] my-0.5 bg-typography-1/50" orientation="horizontal"/>
              <Text className="text-primary-0 font-bold text-s">ИЛИ</Text>
            <Divider className="w-[35%] my-0.5 bg-typography-1/50" orientation="horizontal"/>
          </View>
          <View className="flex-row justify-center items-start gap-1">
            <Text className="text-typography-1">
              У вас уже есть аккаунт?
            </Text>
            <Link onPress={() => router.push("/login")}>
              <LinkText className="text-typography-1">Войдите.</LinkText>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}