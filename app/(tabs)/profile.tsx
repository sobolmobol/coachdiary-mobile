import { Alert, Text, View } from 'react-native'
import { CustomButton } from '@/components/Button'
import { Image } from '@/components/ui/image'
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon'
import { get, patch, getErrorMessage, put } from '@/services/utils'
import { ProfileResponse, DetailRequest, PaswordRequest } from '@/types/types'
import { logout } from '@/services/user'
import { useRouter } from 'expo-router'

export default function Profile() {
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [patronymic, setPatronymic] = useState('')
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [currentEmail, setCurrentEmail] = useState('')
  const [displayLastName, setDisplayLastName] = useState('')
  const [displayPatronymic, setDisplayPatronymic] = useState('')
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const router = useRouter()

  useEffect(() => {
    if(!isProfileLoaded) getProfile()
  }, [isProfileLoaded])
  async function changeDetails() {
    try{
      const req: DetailRequest = {
        first_name: name.trim(),
        last_name: lastName.trim(),
        patronymic: patronymic.trim()
      }
      const response = await patch('/profile/change_details/', req)
      if(response.ok){
        Alert.alert('Данные успешно обновлены!')
        setDisplayName(name);
        setDisplayLastName(lastName);
        setDisplayPatronymic(patronymic);
      }else{
        Alert.alert(getErrorMessage(response.json()))
      }
    } catch{
      Alert.alert('Ошибка подключения')
    }
  }
  async function logOut(){
    await logout(router);
  }
  async function changeEmail() {
    try{
      const req = {
        email: email.trim()
      }
      const response = await patch('/profile/change_email/', req)
      if(response.ok){
        Alert.alert('Почта успешно обновлена!')
        setCurrentEmail(email)
      }else{
        Alert.alert(getErrorMessage(response.json()))
      }
    } catch{
      Alert.alert('Ошибка подключения')
    }
  }
  async function changePassword() {
    try{
      const req: PaswordRequest = {
        current_password: oldPassword,
        new_password: password,
        confirm_new_password: confPassword,
      }
      const response = await put('/profile/change_password/', req)
      if(response.ok){
        Alert.alert('Пароль успешно обновлен!')
        setOldPassword('')
        setConfPassword('')
        setPassword('')
      }else{
        Alert.alert(getErrorMessage(response.json()))
      }
    } catch{
      Alert.alert('Ошибка подключения')
    }
  }
  async function getProfile() {
    try{
      const response = await get('/profile/')
      if(response.ok){
        const data: ProfileResponse = await response.json()
        setName(data.first_name)
        setLastName(data.last_name)
        setPatronymic(data.patronymic)
        setEmail(data.email)
        setDisplayName(data.first_name);
        setDisplayLastName(data.last_name);
        setDisplayPatronymic(data.patronymic);
        setCurrentEmail(data.email)
        setIsProfileLoaded(true);
      }else{
        Alert.alert(getErrorMessage(response.json()))
      }
    } catch{
      Alert.alert('Ошибка подключения')
    }
  }
  const handlePaswordState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }
  const handleOldPaswordState = () => {
    setShowOldPassword((showState) => {
      return !showState
    })
  }
  const isNameDisabled = () => {
    return name.trim().length === 0 || lastName.trim().length === 0 || 
    (name === displayName && lastName === displayLastName && patronymic === displayPatronymic)
  }

  const isEmailDisabled = () => {
    return email.trim().length === 0 || email === currentEmail
  }
  const isPasswordDisabled = () => {
    return password.trim().length === 0 || confPassword.trim().length === 0 || oldPassword.trim().length === 0
  }
  return (
    <View className="w-full h-full bg-background-1 relative">
      <View className="w-full h-1/3 bg-primary-0 rounded-b-custom-big flex justify-center items-center"></View>
      <View className="w-full h-2/3 bg-background-1"></View>
      <View className="z-40 absolute w-full h-full flex justify-evenly items-center">
        <View className="w-[90%] h-[95%] bg-background-1 shadow-lg rounded-custom-big flex justify-center items-center gap-1 px-2">
          <View className="w-full pt-5 flex items-center">
            <Image
              size="lg"
              source={require('@/assets/images/mobile_logo_blue.png')}
              alt="image"
              className="aspect-[1280/473] w-full"
            />
          </View>
          <View>
            <Text className="text-l text-primary-0 font-extrabold">
              {`${displayLastName} ${displayName} ${displayPatronymic}`}
            </Text>
            <Text className="text-s text-secondary-0/80 text-center">
              учитель физической культутры
            </Text>
          </View>
          <CustomButton 
            color='blue' 
            buttonText='Выйти' 
            classNameText='text-background-1' 
            size='xs'
            onPress={() => logOut()}/>
          <View className="py-6 w-full flex justify-evenly items-center">
              <View className='flex gap-1 my-1'>
                <View className="w-full flex-row justify-evenly items-center p-1 gap-2">
                  <Text className="text-typography-1 w-[30%]">Почта</Text>
                  <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30 w-[60%]">
                    <InputField
                      className="text-typography-1"
                      value={email}
                      onChangeText={text => setEmail(text)}
                    />
                  </Input>
                </View>
                <View className='flex items-end pr-1'>
                  <CustomButton
                    buttonText="Изменить"
                    color="orange"
                    className='w-[30%]'
                    classNameText="text-background-1"
                    size="xs"
                    isDisabled={isEmailDisabled()}
                    onPress={async() => await changeEmail()}
                    />
                </View>
              </View>
            <View className='flex gap-1 my-1'>
              <View className="w-full flex-row justify-evenly items-center p-1 gap-2">
                <Text className="text-typography-1 w-[30%]">Фамилия</Text>
                <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30 w-[60%]">
                  <InputField 
                    className="text-typography-1" 
                    value={lastName} 
                    onChangeText={text => setLastName(text)}/>
                </Input>
              </View>
              <View className="w-full flex-row justify-evenly items-center p-1 gap-2">
                <Text className="text-typography-1 w-[30%]">Имя</Text>
                <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30 w-[60%]">
                  <InputField 
                    className="text-typography-1" 
                    value={name} 
                    onChangeText={text => setName(text)}/>
                </Input>
              </View>
              <View className="w-full flex-row justify-evenly items-center p-1 gap-2">
                <Text className="text-typography-1 w-[30%]">Отчество</Text>
                <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30 w-[60%]">
                  <InputField 
                    className="text-typography-1" 
                    value={patronymic} 
                    onChangeText={text => setPatronymic(text)}/>
                </Input>
              </View>
              <View className='flex items-end pr-1'>
                <CustomButton
                  buttonText="Изменить"
                  color="orange"
                  className='w-[30%]'
                  classNameText="text-background-1"
                  size="xs"
                  isDisabled={isNameDisabled()}
                  onPress={async() => await changeDetails()}
                  />
              </View>
            </View>
            <View className='flex gap-1 my-1'>
              <View className="w-full flex-row justify-evenly items-center p-1 gap-2">
                <Text className="text-typography-1 w-[30%]">
                  Старый пароль
                </Text>
                <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30 w-[60%]">
                  <InputField
                    className="text-typography-1"
                    type={showOldPassword ? 'text' : 'password'}
                    value={oldPassword}
                    onChangeText={text => setOldPassword(text)}
                  />
                  <InputSlot className="pr-3" onPress={ handleOldPaswordState }>
                    <InputIcon
                      className="text-typography-1/50 w-5 h-5"
                      as={showOldPassword ? EyeIcon : EyeOffIcon}
                    />
                  </InputSlot>
                </Input>
              </View>
              <View className="w-full flex-row justify-evenly items-center p-1 gap-2">
                <Text className="text-typography-1 w-[30%]">Пароль</Text>
                <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30 w-[60%]">
                  <InputField
                    className="text-typography-1"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChangeText={text => setPassword(text)}
                  />
                  <InputSlot className="pr-3" onPress={ handlePaswordState }>
                    <InputIcon
                      className="text-typography-1/50 w-5 h-5"
                      as={showPassword ? EyeIcon : EyeOffIcon}
                    />
                  </InputSlot>
                </Input>
              </View>
              <View className="w-full flex-row justify-evenly items-center p-1 gap-2">
                <Text className="text-typography-1 w-[30%]">
                  Повторить пароль
                </Text>
                <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30 w-[60%]">
                  <InputField
                    className="text-typography-1"
                    type={showPassword ? 'text' : 'password'}
                    value={confPassword}
                    onChangeText={text => setConfPassword(text)}
                  />
                  <InputSlot className="pr-3" onPress={ handlePaswordState }>
                    <InputIcon
                      className="text-typography-1/50 w-5 h-5"
                      as={showPassword ? EyeIcon : EyeOffIcon}
                    />
                  </InputSlot>
                </Input>
              </View>
              <View className='flex items-end pr-1'>
                <CustomButton
                  buttonText="Изменить"
                  color="orange"
                  className='w-[30%]'
                  classNameText="text-background-1"
                  size="xs"
                  isDisabled={isPasswordDisabled()}
                  onPress={async () => await changePassword()}
                  />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
