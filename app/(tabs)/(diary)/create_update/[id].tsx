import { View, Text, Alert } from 'react-native'
import { Input, InputField } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { CustomButton } from '@/components/Button'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { get, patch, getErrorMessage, post } from '@/services/utils'
import {
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioLabel,
  RadioIcon,
} from '@/components/ui/radio'
import { CircleIcon } from '@/components/ui/icon'
import {
  StudentResponse,
  StudentRequest,
  Gender,
  NewStudentRequest,
} from '@/types/types'

export default function CreateOrUpdateStudentScreen() {
  const { id } = useLocalSearchParams()
  const [studentInfoLoading, setStudentInfoLoading] = useState(true)
  const [studentInfo, setStudentInfo] = useState<StudentResponse | null>(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [patronymic, setPatronymic] = useState('')
  const [gender, setGender] = useState<Gender | null>(null)
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [studentClass, setStudentClass] = useState<number | null>(null)
  const [classLetter, setClassLetter] = useState('')
  const formatDateInput = (input: string) => {
    const cleaned = input.replace(/[^\d]/g, '')
    let formatted = cleaned

    if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 4)}-${cleaned.slice(4, 6)}`
      if (cleaned.length > 6) {
        formatted += `-${cleaned.slice(6, 8)}`
      }
    } else if (cleaned.length > 2) {
      formatted = `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`
    }

    return formatted
  }
  const isDisabledUpdate = () => {
    return (
      studentInfo?.birthday === dateOfBirth.trim() &&
      studentInfo?.first_name === firstName.trim() &&
      studentInfo?.last_name === lastName.trim() &&
      studentInfo?.patronymic === patronymic.trim() &&
      studentInfo?.student_class.number === studentClass &&
      studentInfo?.student_class.class_name === classLetter.trim() &&
      studentInfo?.gender === gender
    )
  }
  const isDisabledCreate = () => {
    return (
      dateOfBirth.trim().length === 0 ||
      firstName.trim().length === 0 ||
      lastName.trim().length === 0 ||
      !studentClass ||
      classLetter.trim().length === 0 ||
      !gender
    )
  }
  async function getStudentInfo() {
    try {
      setStudentInfoLoading(true)
      const response = await get(`/students/${id}/`)
      if (response.ok) {
        const studentInfo: StudentResponse = await response.json()
        setStudentInfo(studentInfo)
        setFirstName(studentInfo.first_name)
        setLastName(studentInfo.last_name)
        setPatronymic(studentInfo.patronymic)
        setGender(studentInfo.gender)
        setDateOfBirth(studentInfo.birthday)
        setClassLetter(studentInfo.student_class.class_name)
        setStudentClass(studentInfo.student_class.number)
      } else {
        Alert.alert('Ошибка', getErrorMessage(await response.json()))
      }
    } catch {
      Alert.alert('Ошибка', 'Произошла ошибка во время отправки данных, попробуйте еще раз')
    } finally {
      setStudentInfoLoading(false)
    }
  }
  async function updateStudent() {
    try {
      setStudentInfoLoading(true)
      const request: StudentRequest = {
        id: +id,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        patronymic: patronymic.trim(),
        student_class: {
          class_name: classLetter.trim(),
          number: studentClass ?? 0,
        },
        birthday: dateOfBirth.trim(),
        gender: gender ?? 'f',
      }
      const response = await patch(`/students/${id}/`, request)
      if (response.ok) {
        Alert.alert('Информация об ученике успешно обновлена!')
        const studentInfo: StudentResponse = await response.json()
        setStudentInfo(studentInfo)
        setFirstName(studentInfo.first_name)
        setLastName(studentInfo.last_name)
        setPatronymic(studentInfo.patronymic)
        setGender(studentInfo.gender)
        setDateOfBirth(studentInfo.birthday)
        setClassLetter(studentInfo.student_class.class_name)
        setStudentClass(studentInfo.student_class.number)
      } else {
        console.log(getErrorMessage(response.json()))
      }
    } catch {
      console.log('Ошибка при получении информации об ученике')
    } finally {
      setStudentInfoLoading(false)
    }
  }
  async function createStudent() {
    try {
      const request: NewStudentRequest = {
        first_name: firstName,
        last_name: lastName,
        patronymic: patronymic,
        student_class: {
          class_name: classLetter,
          number: studentClass ?? 0,
        },
        birthday: dateOfBirth,
        gender: gender ?? 'f',
      }
      const response = await post(`/students/`, request)
      if (response.ok) {
        Alert.alert('Успех', 'Ученик создан')
        router.push('/(tabs)/(diary)')
      } else {
        Alert.alert('Ошибка', getErrorMessage(response.json()))
      }
    } catch {
      Alert.alert('Ошибка', 'Произошла ошибка во время отправки данных, попробуйте еще раз')
    }
  }
  useEffect(() => {
    if (id !== 'create') {
      const getAsyncData = async () => {
        await getStudentInfo()
      }
      getAsyncData()
    }
  }, [])
  return (
    <View className="w-full h-full bg-background-1 relative">
      <Stack.Screen
        options={{
          title:
            id === 'create'
              ? 'Создание ученика'
              : studentInfoLoading
                ? 'Загрузка информации об ученике...'
                : `${studentInfo?.last_name} ${studentInfo?.first_name.slice(0, 1)}. ${studentInfo?.patronymic.slice(0, 1)}.`,
          headerStyle: {
            backgroundColor: '#f0f8ff',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#003F50',
        }}
      />
      <View className="w-full h-1/3 bg-primary-0 rounded-b-custom-big flex justify-center items-center"></View>
      <View className="w-full h-2/3 bg-background-1"></View>
      <View className="z-40 absolute w-full h-full flex justify-around items-center">
        <View className="w-[90%] h-[90%] bg-background-1 shadow-md rounded-custom-big flex justify-around">
          <View className="w-full flex justify-between items-center gap-2">
            <View className="w-[90%] flex gap-3">
              <Text className="text-primary-0 text-center text-m font-bold">
                {id !== 'create'
                  ? `${studentInfo?.last_name} ${studentInfo?.first_name.slice(0, 1)}. ${studentInfo?.patronymic.slice(0, 1)}.`
                  : ''}
              </Text>
              <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30">
                <InputField
                  className="text-typography-1"
                  placeholder="Фамилия"
                  value={lastName}
                  onChangeText={(text: string) => {
                    setLastName(text)
                  }}
                />
              </Input>
              <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30">
                <InputField
                  className="text-typography-1"
                  placeholder="Имя"
                  value={firstName}
                  onChangeText={(text: string) => {
                    setFirstName(text)
                  }}
                />
              </Input>
              <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30">
                <InputField
                  className="text-typography-1"
                  placeholder="Отчество"
                  value={patronymic}
                  onChangeText={(text: string) => {
                    setPatronymic(text)
                  }}
                />
              </Input>
            </View>
            <View className="w-[90%] flex p-2 gap-2 border-tertiary-0/50 bg-tertiary-0/30 rounded-custom">
              <Text className="p-1 text-typography-1/60">Пол</Text>
              <RadioGroup value={gender ?? ''} onChange={setGender}>
                <View className="flex-row justify-evenly">
                  <Radio value="f">
                    <RadioIndicator className="border-primary-0 rounded-custom-big">
                      <RadioIcon className="border-primary-0" as={CircleIcon} />
                    </RadioIndicator>
                    <RadioLabel>
                      <Text className="text-typography-1">Женский</Text>
                    </RadioLabel>
                  </Radio>
                  <Radio value="m">
                    <RadioIndicator className="border-primary-0 rounded-custom-big">
                      <RadioIcon className="border-primary-0" as={CircleIcon} />
                    </RadioIndicator>
                    <RadioLabel>
                      <Text className="text-typography-1">Мужской</Text>
                    </RadioLabel>
                  </Radio>
                </View>
              </RadioGroup>
            </View>
            <View className="w-[90%] flex gap-2">
              <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30">
                <InputField
                  className="text-typography-1"
                  placeholder="Дата рождения"
                  value={dateOfBirth}
                  keyboardType="numbers-and-punctuation"
                  onChangeText={(text) => {
                    const formatted = formatDateInput(text)
                    setDateOfBirth(formatted)
                  }}
                />
              </Input>
            </View>
            <View className="w-[90%] flex p-2 gap-2 border-tertiary-0/50 bg-tertiary-0/30 rounded-custom">
              <Text className="p-1 text-typography-1/60">Класс</Text>
              <RadioGroup
                value={studentClass?.toString() ?? ''}
                onChange={(key) => {
                  setStudentClass(+key)
                  console.log(key)
                }}
              >
                <View className="flex-row justify-start flex-wrap gap-2 p-2">
                  {[...Array(11).keys()]
                    .map((i) => i + 1)
                    .map((item) => {
                      return (
                        <Radio value={item.toString()} key={item}>
                          <RadioIndicator className="border-primary-0 rounded-custom-big">
                            <RadioIcon
                              className="border-primary-0"
                              as={CircleIcon}
                            />
                          </RadioIndicator>
                          <RadioLabel>
                            <Text className="text-typography-1">{item}</Text>
                          </RadioLabel>
                        </Radio>
                      )
                    })}
                </View>
              </RadioGroup>
            </View>
            <View className="w-[90%] flex gap-2">
              <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30">
                <InputField
                  className="text-typography-1"
                  placeholder="Буква класса"
                  value={classLetter}
                  onChangeText={(text: string) => {
                    setClassLetter(text.slice(0, 1))
                  }}
                />
              </Input>
            </View>
            <View className="w-[90%]">
              <CustomButton
                color="blue"
                buttonText={id === 'create' ? 'Создать' : 'Сохранить'}
                className="w-full"
                classNameText="text-background-1"
                isFontSizeChangable={false}
                isDisabled={
                  id === 'create' ? isDisabledCreate() : isDisabledUpdate()
                }
                onPress={id === 'create' ? createStudent : updateStudent}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
