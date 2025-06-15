import { View, Text, Alert, ScrollView } from 'react-native'
import { CustomButton } from '@/components/Button'
import { useState, useEffect, useCallback } from 'react'
import { ActionSheet } from '@/components/ActionSheet'
import { AccordionTable } from '@/components/AccordionClasses'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import {
  StudentValueRequest,
  StandardResponse,
  StudentsValueResponse,
  ClassResponse,
  Gender,
  StudentResponse,
} from '@/types/types'
import { get, del, getErrorMessage } from '@/services/utils'
import { useRouter, useFocusEffect } from 'expo-router'
export default function Classes() {
  const router = useRouter()

  const [levels, setLevels] = useState<number[]>([])
  const [classes, setClasses] = useState<ClassResponse[]>([])
  const [showClasses, setShowClasses] = useState(false)
  const [selectedClass, setSelectedClass] = useState<number>(-1)
  const [currentClasses, setCurrentClasses] = useState<ClassResponse[]>([])
  const [students, setStudents] = useState<StudentResponse[]>([])
  const handleClose = () => setShowClasses(false)
  async function getStudents() {
    try {
      const response = await get('/students/', {
        student_class: selectedClass,
      })
      if (response.ok) {
        const data: StudentResponse[] = await response.json()
        setStudents(data)
      } else {
        Alert.alert('Ошибка', getErrorMessage(response.json()))
      }
    } catch {
      Alert.alert(
        'Ошибка',
        'Произошла ошибка во время отправки данных, попробуйте еще раз'
      )
    }
  }
  const getAsyncData = async () => {
    await getLevels()
  }
  async function getLevels() {
    try {
      const response = await get('/classes/')
      if (response.ok) {
        const classes: ClassResponse[] = await response.json()
        setLevels(Array.from(new Set(classes.map((item) => item.number))))
        setClasses(classes)
      } else {
        Alert.alert('Ошибка', getErrorMessage(response.json()))
      }
    } catch {
      Alert.alert(
        'Ошибка',
        'Произошла ошибка во время отправки данных, попробуйте еще раз'
      )
    }
  }
  function deleteClass(id: number) {
    Alert.alert(
      'Удаление класса',
      'Вы действительно хотите удалить весь класс?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
          onPress: () => {
            return
          },
        },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await del(`/classes/${id}/`)
              if (response.ok) {
                Alert.alert('Успех', 'Класс удален')
                await getAsyncData()
              } else {
                Alert.alert('Ошибка', getErrorMessage(await response.json()))
              }
            } catch {
              Alert.alert(
                'Ошибка',
                'Произошла ошибка во время отправки данных, попробуйте еще раз'
              )
            }
          },
        },
      ],
      { cancelable: true }
    )
  }
  async function downloadQR(id: number) {
    try {
      const response = await get(
        '/students/generate_qr_codes_pdf/',
        {
          class_id: id,
        },
        true
      )

      if (response.ok) {
        const blob = await response.blob()

        const reader = new FileReader()
        reader.onloadend = async () => {
          const base64data = reader.result?.toString().split(',')[1]
          const fileUri = FileSystem.documentDirectory + `qr-codes-${id}.pdf`

          await FileSystem.writeAsStringAsync(fileUri, base64data!, {
            encoding: FileSystem.EncodingType.Base64,
          })

          console.log('Файл сохранен:', fileUri)

          if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(fileUri)
          } else {
            Alert.alert('Скачано', 'Файл сохранен по пути: ' + fileUri)
          }
        }
        reader.readAsDataURL(blob)
      } else {
        const errorText = await response.text()
        Alert.alert('Ошибка', `Ошибка сервера: ${errorText}`)
      }
    } catch (error) {
      console.error('Ошибка при скачивании:', error)
      Alert.alert(
        'Ошибка',
        'Произошла ошибка во время скачивания, попробуйте еще раз.'
      )
    }
  }
  useFocusEffect(
    useCallback(() => {
      getAsyncData()
      return () => {
        setLevels([])
        setSelectedClass(-1)
      }
    }, [])
  )
  useEffect(() => {
    if (selectedClass !== -1) {
      const selectedPar = classes.filter(
        (item) => item.number === selectedClass
      )
      setCurrentClasses(selectedPar ?? [])
    }
  }, [selectedClass, classes])
  useEffect(() => {
    if (selectedClass !== -1) {
      getStudents()
    }
  }, [selectedClass])
  return (
    <View className="bg-background-1 flex-1">
      <View className="w-full flex-row justify-end p-4 gap-2">
        <CustomButton
          classNameText="text-background-1"
          color={selectedClass == -1 ? 'blue' : 'orange'}
          buttonText={
            selectedClass == -1 ? 'Выбрать класс' : `${selectedClass} класс`
          }
          onPress={() => {
            setSelectedClass(-1)
            setShowClasses(true)
          }}
          size="sm"
        />
      </View>
      <ScrollView contentContainerClassName="flex justify-between g-2">
        {currentClasses.length !== 0 ? (
          currentClasses.map((item, idx) => (
            <AccordionTable
              key={`${item.id}_${idx}`}
              stClass={item}
              students={students.filter((st) => st.student_class.id == item.id)}
              onDownloadQR={() => downloadQR(item.id)}
              onDeleteClass={() => deleteClass(item.id)}
            />
          ))
        ) : (
          <View className="w-[90%]">
            <Text className="font-extrabold text-m text-center text-primary-0">
              Здесь появятся выбранные классы
            </Text>
          </View>
        )}
      </ScrollView>
      <ActionSheet
        isYear
        levels={levels}
        handleClose={handleClose}
        isOpen={showClasses}
        onClose={handleClose}
        selectedLevel={selectedClass}
        setSelectedLevel={setSelectedClass}
      />
    </View>
  )
}