import { View, Alert } from 'react-native'
import { CustomButton } from '@/components/Button'
import { useState, useEffect, useCallback } from 'react'
import { ActionSheet } from '@/components/ActionSheet'
import {
  StudentValueRequest,
  StandardResponse,
  StudentsValueResponse,
  ClassResponse,
  Gender,
} from '@/types/types'
import { DiaryTable } from '@/components/DiaryTable'
import { get, post, getErrorMessage } from '@/services/utils'
import { Fab } from '@/components/ui/fab'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useRouter, useFocusEffect } from 'expo-router'
import { useUserRole } from '@/hooks/useUserRole'

export default function Index() {
  const {userId, role, loading} = useUserRole()
  const [showActionsheetStand, setShowActionsheetStand] = useState(false)
  const [showActionsheetClasses, setShowActionsheetClasses] = useState(false)
  const [showActionsheetFilters, setShowActionsheetFilters] = useState(false)
  const [standardType, setStandardType] = useState('')
  const handleCloseStand = () => setShowActionsheetStand(false)
  const handleCloseClasses: () => void = () => setShowActionsheetClasses(false)
  const handleCloseFilters = () => setShowActionsheetFilters(false)
  const [isLoadingClasses, setIsLoadingClasses] = useState(false)
  const [isLoadingStand, setIsLoadingStand] = useState(false)
  const [students, setStudents] = useState<StudentsValueResponse[]>([])
  const [filteredStudents, setFilteredStudents] = useState<
    StudentsValueResponse[]
  >([])
  const router = useRouter()
  const [classes, setClasses] = useState<ClassResponse[]>([])
  const [standards, setStandards] = useState<StandardResponse[]>([])
  const [yearFrom, setYearFrom] = useState<number | null>(null)
  const [yearBefore, setYearBefore] = useState<number | null>(null)
  const [gender, setGender] = useState<Gender | null>(null)
  const [grades, setGrades] = useState<string[]>([])
  const getAsyncData = async () => {
    if(role === 'teacher'){
      await getClasses()
      await getStandards()
    }
  }
  const [selectedClass, setSelectedClass] = useState<{
    class_number: number
    class_letter: string
  }>({
    class_letter: '',
    class_number: -1,
  })
  const [selectedStandard, setSelectedStandard] = useState<{
    id: number
    standard: string
  }>({
    id: -1,
    standard: '',
  })
  const getClassId = () => {
    return classes.find((item) => {
      return (
        item.number === selectedClass.class_number &&
        item.class_name === selectedClass.class_letter
      )
    })?.id
  }
  function getStandardsByClass(
    class_number: number,
    standards: StandardResponse[]
  ): { id: number; standard: string }[] {
    return class_number !== -1
      ? standards
          .filter((item) =>
            item.levels.some((level) => level.level_number === class_number)
          )
          .map((item) => ({
            id: item.id,
            standard: item.name,
          }))
      : []
  }
  async function updateResults(updatedStudents: StudentsValueResponse[]) {
    try {
      const req: StudentValueRequest[] = updatedStudents.map((student) => ({
        student_id: student.id,
        standard_id: selectedStandard.id,
        value: standardType === 'physical' ? student.average_value : student.average_grade,
      }))
      const response = await post('/students/results/create/', req)
      if (response.ok) {
        await getStudents()
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
  async function getClasses() {
    try {
      setIsLoadingClasses(true)
      const response = await get('/classes/')
      if (response.ok) {
        const classes: ClassResponse[] = await response.json()
        setClasses(classes)
      } else {
        Alert.alert('Ошибка', getErrorMessage(response.json()))
      }
    } catch {
      Alert.alert(
        'Ошибка',
        'Произошла ошибка во время отправки данных, попробуйте еще раз'
      )
    } finally {
      setIsLoadingClasses(false)
    }
  }
  async function getStandards() {
    try {
      setIsLoadingStand(true)
      const response = await get('/standards/')
      if (response.ok) {
        const stds: StandardResponse[] = await response.json()
        setStandards(stds)
      } else {
        Alert.alert('Ошибка', getErrorMessage(response.json()))
      }
    } catch {
      Alert.alert(
        'Ошибка',
        'Произошла ошибка во время отправки данных, попробуйте еще раз'
      )
    } finally {
      setIsLoadingStand(false)
    }
  }
  async function getStudents() {
    try {
      const response = await get('/students/results/list/', {
        'class_id[]': getClassId(),
        'standard_id[]': selectedStandard.id,
      })
      if (response.ok) {
        const data: StudentsValueResponse[] = await response.json()
        setStudents(data)
        setFilteredStudents(data)
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
  const handleStudentsChange = (updatedStudents: StudentsValueResponse[]) => {
    setStudents(updatedStudents)
    setFilteredStudents(updatedStudents)
    updateResults(updatedStudents)
  }
  useFocusEffect(
    useCallback(() => {
      getAsyncData()
      return () => {
        setFilteredStudents([])
        setStudents([])
        setSelectedClass({
          class_number: -1,
          class_letter: '',
        })
        setSelectedStandard({
          id: -1,
          standard: '',
        })
      }
    }, [])
  )
  useEffect(() => {
    setStandardType(() => {
      return standards.find((standard) => standard.id === selectedStandard.id)
        ?.has_numeric_value
        ? 'physical'
        : 'technical'
    })
  }, [selectedStandard])
  useEffect(() => {
    console.log(selectedStandard.id, selectedClass.class_number)
    if (selectedStandard.id !== -1 && selectedClass.class_number !== -1) {
      getStudents()
    }
  }, [selectedStandard, selectedClass])

  function acceptFilters() {
    setFilteredStudents(
      gender === null &&
        grades.length === 0 &&
        yearFrom === null &&
        yearBefore === null
        ? students
        : students.filter((item) => {
            const year = +item.birthday.slice(0, 4)
            return (
              (gender ? item.gender === gender : true) &&
              (grades.length ? grades.includes(String(item.average_grade)) : true) &&
              (yearFrom ? year >= yearFrom : true) &&
              (yearBefore ? year <= yearBefore : true)
            )
          })
    )
  }
  function cancelFilters() {
    setGender(null)
    setGrades([])
    setYearBefore(null)
    setYearFrom(null)
    setFilteredStudents(students)
  }
  return (
    <View className="bg-background-1 flex-1">
      <View className="w-full flex-row justify-between p-4 gap-2">
        <CustomButton
          classNameText="text-background-1"
          color={selectedClass.class_letter == '' ? 'blue' : 'orange'}
          buttonText={
            selectedClass.class_letter == ''
              ? 'Выбрать класс'
              : `${selectedClass.class_number}${selectedClass.class_letter}`
          }
          onPress={() => {
            setSelectedClass({
              class_letter: '',
              class_number: -1,
            })
            setShowActionsheetClasses(true)
          }}
          size="sm"
        />
        <CustomButton
          classNameText="text-background-1"
          color={selectedStandard.id == -1 ? 'blue' : 'orange'}
          buttonText={
            selectedStandard.id == -1
              ? 'Выбрать норматив'
              : selectedStandard.standard.toUpperCase()
          }
          onPress={() => {
            setSelectedStandard({
              id: -1,
              standard: '',
            })
            setShowActionsheetStand(true)
          }}
          size="sm"
        />
        <CustomButton
          classNameText="text-background-1"
          color="blue"
          isAddFilterIcon
          onPress={() => {
            setShowActionsheetFilters(true)
          }}
          size="sm"
        />
        <ActionSheet
          isLoading={isLoadingStand}
          isStandards
          selectedStandard={selectedStandard}
          setSelectedStandard={setSelectedStandard}
          standards={getStandardsByClass(selectedClass.class_number, standards)}
          handleClose={handleCloseStand}
          isOpen={showActionsheetStand}
          onClose={handleCloseStand}
        />
        <ActionSheet
          isLoading={isLoadingClasses}
          isClasses
          classes={classes}
          handleClose={handleCloseClasses}
          isOpen={showActionsheetClasses}
          onClose={handleCloseClasses}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
        />
        <ActionSheet
          isFilter
          handleClose={handleCloseFilters}
          isOpen={showActionsheetFilters}
          onClose={handleCloseFilters}
          gender={gender}
          yearFrom={yearFrom}
          yearBefore={yearBefore}
          grades={grades}
          setGender={setGender}
          setYearFrom={setYearFrom}
          setYearBefore={setYearBefore}
          setGrades={setGrades}
          onFiltersAccept={acceptFilters}
          cancelFilters={cancelFilters}
        />
      </View>
      <View className="w-full">
        <DiaryTable
          onStudentsChange={handleStudentsChange}
          standardType={standardType}
          students={filteredStudents}
          areChosenClaAndSt={
            selectedStandard.id !== -1 && selectedClass.class_number !== -1
          }
        />
      </View>
      <Fab
        size="md"
        className="bg-primary-0 hover:bg-primary-0/70 rounded-custom-big"
        onPress={() => {
          router.push({
            pathname: '/(tabs)/(diary)/create_update/[id]',
            params: { id: 'create' },
          })
        }}
      >
        <AntDesign name="plus" size={24} color="#E5AA7B" />
      </Fab>
    </View>
  )
}
