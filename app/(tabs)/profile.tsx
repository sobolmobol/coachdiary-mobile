import { Text, View } from "react-native";
import { CustomButton } from "@/components/Button";
import { Image } from "@/components/ui/image";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import React from "react";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
export default function Profile() {
  const [showPassword, setShowPassword] = React.useState(false)
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
        <View className="w-[90%] h-[80%] bg-background-1 shadow-md rounded-custom-big flex justify-start items-center gap-1">
          <View className="w-full py-5 flex items-center">
            <Image
              size="lg"
              source={require('@/assets/images/mobile_logo_blue.png')}
              alt="image"
              className="aspect-[1280/473] w-full"/>
          </View>
          <View>
            <Text className="text-l text-primary-0 pt-5 font-extrabold">Фамилия Имя Отчество</Text>
            <Text className="text-s text-secondary-0/80">учитель физической культутры</Text>
          </View>
          <View className="py-6 w-full flex justify-evenly items-center">
            <View className="w-full flex-row justify-evenly items-center p-1 gap-2">
              <Text className="text-typography-1 w-[20%]">Почта</Text>
              <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30 w-[40%]">
                <InputField className="text-typography-1" value={"fizruk@mail.ru"}/>
              </Input>
              <CustomButton buttonText="Изменить" color="orange" classNameText="text-background-1" size="xs"/>
            </View>
            <View className="w-full flex-row justify-evenly items-center p-1 gap-2">
              <Text className="text-typography-1 w-[20%]">Фамилия</Text>
              <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30 w-[40%]">
                <InputField className="text-typography-1" value={"Фамилия"}/>
              </Input>
              <CustomButton buttonText="Изменить" color="orange" classNameText="text-background-1" size="xs"/>
            </View>
            <View className="w-full flex-row justify-evenly items-center p-1 gap-2">
              <Text className="text-typography-1 w-[20%]" >Имя</Text>
              <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30 w-[40%]">
                <InputField className="text-typography-1" value={"Имя"}/>
              </Input>
              <CustomButton buttonText="Изменить" color="orange" classNameText="text-background-1" size="xs"/>
            </View>
            <View className="w-full flex-row justify-evenly items-center p-1 gap-2">
              <Text className="text-typography-1 w-[20%]">Отчество</Text>
              <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30 w-[40%]">
                <InputField className="text-typography-1" value={"Отчеcтво"}/>
              </Input>
              <CustomButton buttonText="Изменить" color="orange" classNameText="text-background-1" size="xs"/>
            </View>
            <View className="w-full flex-row justify-evenly items-center p-1 gap-2 pt-3">
              <Text className="text-typography-1 w-[20%]">Пароль</Text>
              <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30 w-[40%]">
                <InputField className="text-typography-1" value={"пароль"} type={showPassword ? "text" : "password"}/>
                <InputSlot className="pr-3" onPress={handleState}>
                  <InputIcon className="text-typography-1/50 w-5 h-5" as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
              <View className="w-[26%]"></View>
            </View>
            <View className="w-full flex-row justify-evenly items-center p-1 gap-2">
              <Text className="text-typography-1 w-[20%]">Повторить пароль</Text>
              <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30 w-[40%]">
                <InputField className="text-typography-1" type={showPassword ? "text" : "password"}/>
                <InputSlot className="pr-3" onPress={handleState}>
                  <InputIcon className="text-typography-1/50 w-5 h-5" as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
              <CustomButton buttonText="Изменить" color="orange" classNameText="text-background-1" size="xs"/>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
 