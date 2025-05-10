import { Alert, Text, View } from 'react-native'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { get, post, getErrorMessage, del } from '@/services/utils'
import { CustomButton } from '@/components/Button'
import {
  StudentResponse,
  StudentStandardResponse,
  StudentValueRequest,
} from '@/types/types'
import { ActionSheet } from '@/components/ActionSheet'
import StudentStandardTable from '@/components/StudentStandardTable'

export default function Student() {
  const { id } = useLocalSearchParams()
  const [studentInfoLoading, setStudentInfoLoading] = useState(true)
  const [showActionsheetInfo, setShowActionsheetInfo] = useState(false)
  const [showActionsheetClass, setShowActionsheetClass] = useState(false)
  const [studentInfo, setStudentInfo] = useState<StudentResponse>()
  const [standards, setStandards] = useState<StudentStandardResponse[]>()
  const [levels, setLevels] = useState<number[]>()
  const [selectedLevel, setSelectedLevel] = useState<number>(-1)
  const [filteredStandards, setfilteredStandards] =
    useState<StudentStandardResponse[]>()
  const handleCloseInfo = () => setShowActionsheetInfo(false)
  const handleCloseClass = () => setShowActionsheetClass(false)

  function filterSt() {
    setfilteredStandards(
      standards?.filter((item) => item.Level_number === selectedLevel)
    )
  }
  async function updateResults(updatedStandards: StudentStandardResponse[]) {
    try {
      const req: StudentValueRequest[] = updatedStandards.map((standard) => ({
        student_id: +id,
        standard_id: standard.Standard.Id,
        value: standard.Standard.Has_numeric_value
          ? standard.Value
          : standard.Grade,
      }))
      const response = await post('/students/results/new/', req)
      if (response.ok) {
        await getStandard()
        Alert.alert('Данные успешно сохранены')
      } else {
        Alert.alert(getErrorMessage(await response.json()))
      }
    } catch {
      console.log('Ошибка соединения')
    }
  }

  const handleStandardsChange = (
    updatedStandards: StudentStandardResponse[]
  ) => {
    setStandards(updatedStandards)
    updateResults(updatedStandards)
  }
  async function getStudentInfo() {
    try {
      setStudentInfoLoading(true)
      const response = await get(`/students/${id}/`)
      if (response.ok) {
        const studentInfo: StudentResponse = await response.json()
        setStudentInfo(studentInfo)
      }
    } catch {
      console.log('Ошибка при получении информации об ученике')
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
                Alert.alert('Ученик успешно удален!')
                router.navigate('/(tabs)/(diary)')
                handleCloseInfo()
              } else {
                Alert.alert(getErrorMessage(await response.json()))
              }
            } catch {
              console.log('Ошибка при удалении ученика')
            }
          },
        },
      ],
      { cancelable: true }
    )
  }
  async function getStandard() {
    try {
      const response = await get(`/students/${id}/standards/`)
      if (response.ok) {
        const standardsR: StudentStandardResponse[] = await response.json()
        setStandards(standardsR)
      } else {
        console.log(getErrorMessage(await response.json()))
      }
    } catch {
      console.log('Ошибка при загрузке нормативов')
    }
  }
  useEffect(() => {
    const getAsyncData = async () => {
      await getStudentInfo()
      await getStandard()
    }
    getAsyncData()
  }, [])
  useEffect(() => {
    if (standards) {
      const uniqueLevels = Array.from(
        new Set(standards.map((item) => item.Level_number))
      )
      setLevels(uniqueLevels)
      filterSt()
    }
  }, [standards])
  useEffect(() => {
    if (levels && levels.length > 0 && selectedLevel === -1) {
      setSelectedLevel(levels[levels.length - 1])
    }
  }, [levels])
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
      />
    </View>
  )
}
