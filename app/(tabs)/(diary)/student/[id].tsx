import { Alert, Text, View } from 'react-native'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { useEffect, useState, useCallback } from 'react'
import { get, post, getErrorMessage, del } from '@/services/utils'
import { CustomButton } from '@/components/Button'
import {
  StudentResponse,
  StudentStandardResponse,
  StudentValueRequest,
  StandardByLevel,
} from '@/types/types'
import { useFocusEffect } from 'expo-router'
import { ActionSheet } from '@/components/ActionSheet'
import StudentStandardTable from '@/components/StudentStandardTable'
import { useUserRole } from '@/hooks/useUserRole'

export default function Student() {
  const {userId, role, loading} = useUserRole()
  const { id } = useLocalSearchParams()
  const [studentInfoLoading, setStudentInfoLoading] = useState(true)
  const [showActionsheetInfo, setShowActionsheetInfo] = useState(false)
  const [showActionsheetClass, setShowActionsheetClass] = useState(false)
  const [studentInfo, setStudentInfo] = useState<StudentResponse | null>(null)
  const [standards, setStandards] = useState<StandardByLevel[]>([])
  const [levels, setLevels] = useState<number[]>(
    [...Array(11).keys()].map((i) => i + 1)
  )
  const [selectedLevel, setSelectedLevel] = useState<number>(1)
  const [sumGrade, setSumGrade] = useState<number>(0)
  const handleCloseInfo = () => setShowActionsheetInfo(false)
  const handleCloseClass = () => setShowActionsheetClass(false)

  async function getStandards() {
    try {
      const response = await get(`/students/${id}/standards/`, {
        level_number: selectedLevel,
      })
      if (response.ok) {
        const data: StudentStandardResponse = await response.json()
        setStandards(data.standards)
        setSumGrade(data.summary_grade)
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
  async function updateResults(updatedStandards: StandardByLevel[]) {
    try {
      const req: StudentValueRequest[] = updatedStandards.map((standard) => ({
        student_id: +id,
        standard_id: standard.standard.id,
        value: standard.standard.has_numeric_value
          ? standard.value
          : standard.grade,
      }))
      const response = await post('/students/results/create/', req)
      if (response.ok) {
        await getStandards()
        Alert.alert('Успех', 'Данные сохранены')
      } else {
        Alert.alert('Ошибка', getErrorMessage(await response.json()))
      }
    } catch {
      Alert.alert(
        'Ошибка',
        'Произошла ошибка во время отправки данных, попробуйте еще раз'
      )
    }
  }

  const handleStandardsChange = (updatedStandards: StandardByLevel[]) => {
    updateResults(updatedStandards)
    setStandards(updatedStandards)
  }
  async function getStudentInfo() {
    try {
      setStudentInfoLoading(true)
      const response = await get(`/students/${id}/`)
      if (response.ok) {
        const studentInfo: StudentResponse = await response.json()
        setStudentInfo(studentInfo)
      } else {
        Alert.alert('Ошибка', getErrorMessage(await response.json()))
      }
    } catch {
      Alert.alert(
        'Ошибка',
        'Произошла ошибка во время отправки данных, попробуйте еще раз'
      )
    } finally {
      setStudentInfoLoading(false)
    }
  }
  async function deleteStudent() {
    Alert.alert(
      'Удаление ученика',
      'Вы действительно хотите удалить ученика?',
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
              const response = await del(`/students/${id}/`)
              if (response.ok) {
                Alert.alert('Успех', 'Ученик удален')
                router.push('/(tabs)/(diary)')
                handleCloseInfo()
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

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          await getStudentInfo()
        } catch (error) {
          console.error('Ошибка при загрузке данных:', error)
        }
      }
      fetchData()
      return () => {
        setStudentInfo(null)
      }
    }, [])
  )

  useEffect(() => {
    const level = studentInfo?.student_class.number ?? 1
    setSelectedLevel(level)
    setLevels([...Array(level).keys()].map((i) => i + 1))
  }, [studentInfo])

  useEffect(() => {
    const getAsyncData = async () => {
      await getStandards()
    }
    getAsyncData()
  }, [selectedLevel])
  if (loading) {
    return null 
  }
  return (
    <View className="bg-background-1 flex-1">
      <Stack.Screen
        options={{
          title: studentInfoLoading
            ? 'Загрузка информации об ученике...'
            : `${studentInfo?.last_name} ${studentInfo?.first_name} ${studentInfo?.patronymic}`,
          headerStyle: {
            backgroundColor: '#f0f8ff',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#003F50',
        }}
      />
      <View className="w-full flex-row justify-between p-4">
        <CustomButton
          classNameText="text-background-1"
          color="blue"
          size="sm"
          buttonText={
            selectedLevel !== -1 ? `${selectedLevel} класс` : 'Выбрать класс'
          }
          onPress={() => setShowActionsheetClass(true)}
        />
        <CustomButton
          classNameText="text-background-1"
          color="blue"
          size="sm"
          buttonText="Детали"
          onPress={() => setShowActionsheetInfo(true)}
        />
        <ActionSheet
          isStudentInfo
          handleClose={handleCloseInfo}
          isOpen={showActionsheetInfo}
          onClose={handleCloseInfo}
          info={studentInfo}
          deleteStudent={async () => await deleteStudent()}
          userRole={role}
        />
        <ActionSheet
          isYear
          handleClose={handleCloseClass}
          isOpen={showActionsheetClass}
          onClose={handleCloseClass}
          levels={levels}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
        />
      </View>

      <StudentStandardTable
        standards={standards ?? []}
        onStandardChange={handleStandardsChange}
        sumGrade={sumGrade}
        role={role}
      />
    </View>
  )
}
