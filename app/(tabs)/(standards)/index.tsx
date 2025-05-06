import { Text, View } from 'react-native'
import StandardTable from '@/components/StandardTable'
import { useState, useEffect } from 'react'
import { Switch } from "@/components/ui/switch"
import {
  StandardResponse,
  StudentsValueResponse,
  ClassResponse,
  Gender,
} from '@/types/types'
import { get, post, getErrorMessage } from '@/services/utils'
import { CustomButton } from '@/components/Button'
import { ActionSheet } from '@/components/ActionSheet'

export default function StandardScreen() {
  const [standards, setStandards] = useState<StandardResponse[]>([])
  const [filtredStandardsG, setFilteredStandardsG] = useState<Record<string, number | string>>()
  const [filtredStandardsB, setFilteredStandardsB] = useState<Record<string, number | string>>()
  const [selectedClass, setSelectedClass] = useState(-1)
  const [isTechnical, setIsTechnical] = useState(false)
  const [showActionsheetClass, setShowActionsheetClass] = useState(false)
  const [showActionsheetStand, setShowActionsheetStand] = useState(false)
  const [selectedTechStand, setSelectedTechStand] = useState<{
    id: number
    standard: string
  }>({
    id: -1,
    standard: '',
  })
  const handleCloseClass = () => setShowActionsheetClass(false)
  const handleCloseStand = () => setShowActionsheetStand(false)
  function getStandardsByClass(
    class_number: number,
    standards: StandardResponse[]
  ): { id: number; standard: string }[] {
    return class_number !== -1
      ? standards
          .filter((item) =>
            item.has_numeric_value &&
            item.levels.some((level) => level.level_number === class_number)
          )
          .map((item) => ({
            id: item.id,
            standard: item.name,
          }))
      : []
  }
  function getStandardsByClassAndGender(
    gender: Gender,
  ): { lowValue: number; middleValue: number; highValue: number }  {
  const st = standards.find(s => s.id === selectedTechStand.id);
  const level = st?.levels.find(l =>
    l.gender === gender && l.level_number === selectedClass
  );

  return {
    lowValue: level?.low_value ?? 0,
    middleValue: level?.middle_value ?? 0,
    highValue: level?.high_value ?? 0
  };
}
  async function getStandards() {
    try {
      const response = await get(`/standards/`)
      if (response.ok) {
        const standardsData: StandardResponse[] = await response.json()
        setStandards(standardsData)
        setSelectedClass(1)
        setSelectedTechStand({
          id: standardsData[0].id,
          standard: standardsData[0].name
        })
      } else{
        console.log(getErrorMessage(response.json()))
      }
    } catch {
      console.log('Ошибка при получении данных нормативов')
    } 
  }
  useEffect(() => {
    const filteredStandardsG = getStandardsByClassAndGender('f')
    console.log('filteredStandardsG', filteredStandardsG)
    const filteredStandardsB = getStandardsByClassAndGender('m')
    console.log('filteredStandardsB', filteredStandardsB)
    setFilteredStandardsG(filteredStandardsG)
    setFilteredStandardsB(filteredStandardsB)
  }, [selectedClass, selectedTechStand])

  useEffect(() => {
    getStandards()
  }, [])

  return (
    <View className="bg-background-1 flex-1 my-1">
        <View className='flex-row justify-center items-center'>
          <Text className='text-typography-1 text-s font-semibold'>Физические</Text>
          <Switch
            value={isTechnical}
            onChange={() => setIsTechnical(prev => !prev)}/>
          <Text className='text-typography-1 text-s font-semibold'>Технические</Text>
        </View>
      <View className='flex-row justify-between p-4'>
        <CustomButton
            classNameText="text-background-1"
            color='blue'
            buttonText={selectedClass ? `${selectedClass} класс` : 'Класс'}
            size="sm"
            onPress={() => setShowActionsheetClass(true)}
          />
          <CustomButton
            classNameText="text-background-1"
            color='blue'
            buttonText={selectedTechStand ? selectedTechStand.standard : 'Норматив'}
            size="sm"
            onPress={() => setShowActionsheetStand(true)}
          />
      </View>
      <View className='w-full gap-1'>
        <View className='w-full flex items-between gap-3'>
          <Text className='text-m text-primary-0 text-center font-semibold'>Девочки</Text>
          <StandardTable standards={filtredStandardsG ?? {}}></StandardTable>
        </View>
        <View className='w-full flex items-between gap-3'>
          <Text className='text-m text-primary-0 text-center font-semibold'>Мальчики</Text>
          <StandardTable standards={filtredStandardsB ?? {}}></StandardTable>
        </View>
      </View>
      <ActionSheet
        isYear
        handleClose={handleCloseClass}
        isOpen={showActionsheetClass}
        onClose={handleCloseClass}
        levels={[ ...Array(11).keys() ].map( i => i+1)}
        selectedLevel={selectedClass}
        setSelectedLevel={setSelectedClass}
      />
      <ActionSheet
        isStandards
        selectedStandard={selectedTechStand}
        setSelectedStandard={setSelectedTechStand}
        standards={getStandardsByClass(selectedClass, standards)}
        handleClose={handleCloseStand}
        isOpen={showActionsheetStand}
        onClose={handleCloseStand}
      />
    </View>
  )
}
