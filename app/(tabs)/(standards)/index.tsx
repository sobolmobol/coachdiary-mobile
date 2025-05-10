import { FlatList, Text, View, TouchableOpacity, Alert } from 'react-native'
import StandardTable from '@/components/StandardTable'
import { useState, useEffect, useCallback } from 'react'
import { Switch } from '@/components/ui/switch'
import {
  StandardResponse,
  Gender,
} from '@/types/types'
import { Fab } from '@/components/ui/fab'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useRouter, useFocusEffect  } from 'expo-router'
import { get, del, getErrorMessage } from '@/services/utils'
import { CustomButton } from '@/components/Button'
import { ActionSheet } from '@/components/ActionSheet'

interface ItemData {
  id: number
  standard: string
}
interface TechItemProps {
  item: ItemData
  onPress?: () => void
  backgroundColorStyle: string
  textColorStyle: string
}
export default function StandardScreen() {
  const router = useRouter()
  const [standards, setStandards] = useState<StandardResponse[]>([])
  const [filtredStandardsG, setFilteredStandardsG] =
    useState<Record<string, number | string> | null>(null)
  const [filtredStandardsB, setFilteredStandardsB] =
    useState<Record<string, number | string> | null>(null)
  const [selectedClass, setSelectedClass] = useState(-1)
  const [isTechnical, setIsTechnical] = useState(false)
  const [showActionsheetClass, setShowActionsheetClass] = useState(false)
  const [showActionsheetStand, setShowActionsheetStand] = useState(false)
  const [selectedFisStand, setSelectedFisStand] = useState<ItemData>({
    id: -1,
    standard: '',
  })
  const [selectedTechStand, setSelectedTechStand] = useState<ItemData>({
    id: -1,
    standard: '',
  })
  const handleCloseClass = () => setShowActionsheetClass(false)
  const handleCloseStand = () => setShowActionsheetStand(false)
  const Item = ({
    item,
    onPress,
    backgroundColorStyle,
    textColorStyle,
  }: TechItemProps) => (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full p-1 ${backgroundColorStyle} my-1 border-b-2 border-primary-0/20 rounded-custom`}
    >
      <Text className={`text-xs font-bold ${textColorStyle}`}>
        {item.standard}
      </Text>
    </TouchableOpacity>
  )
  const renderItem = useCallback(
    ({ item }: { item: ItemData }) => {
      const backgroundColor =
        item.id === selectedTechStand?.id ? 'bg-primary-0' : ''
      const color =
        item.id === selectedTechStand?.id
          ? 'text-background-1'
          : 'text-typography-1'
      return (
        <Item
          item={item}
          onPress={() => {
            if (setSelectedTechStand) {
              setSelectedTechStand({
                id: item.id,
                standard: item.standard,
              })
            }
          }}
          backgroundColorStyle={backgroundColor}
          textColorStyle={color}
        />
      )
    },
    [selectedTechStand]
  )
  function goToUpdateScreen() {
    const id = isTechnical ? selectedTechStand.id : selectedFisStand.id 
    if(id !== -1){ 
      router.push({
        pathname: '/(tabs)/(standards)/create_update/[id]',
        params: { id: id ?? '' }
      })  
    } else{
      Alert.alert('Выберите норматив, чтобы его редактировать')
    }
  }
  function getStandardsByClass(
    class_number: number,
    standards: StandardResponse[],
    isTech: Boolean
  ): { id: number; standard: string }[] {
    return class_number !== -1
      ? standards
          .filter(
            (item) =>
              (isTech ? !item.has_numeric_value : item.has_numeric_value) &&
              item.levels.some((level) => level.level_number === class_number)
          )
          .map((item) => ({
            id: item.id,
            standard: item.name,
          }))
      : []
  }
  function getStandardsByClassAndGender(gender: Gender): {
    lowValue: number
    middleValue: number
    highValue: number
  } {
    const st = standards?.find((s) => s.id === selectedFisStand.id)
    const level = st?.levels.find(
      (l) => l.gender === gender && l.level_number === selectedClass
    )

    return {
      lowValue: level?.low_value ?? 0,
      middleValue: level?.middle_value ?? 0,
      highValue: level?.high_value ?? 0,
    }
  }
  async function getStandards() {
    try {
      const response = await get(`/standards/`)
      if (response.ok) {
        const standardsData: StandardResponse[] = await response.json()
        setStandards(standardsData)
        setSelectedClass(1)
        setSelectedFisStand({
          id: standardsData[0].id,
          standard: standardsData[0].name,
        })
      } else {
        console.log(getErrorMessage(response.json()))
      }
    } catch {
      Alert.alert('Произошла ошибка во время отправки данных, попробуйте еще раз')
    }
  }

  async function deleteStandard(){
    const id = isTechnical ? selectedTechStand.id : selectedFisStand.id 
    if(id !== -1) {
      try {
        const response = await del(`/standards/${id}/`)
        if (response.ok){
          Alert.alert('Норматив успешно удален')
          getStandards()
        } else {
          Alert.alert(getErrorMessage(response.json()))
        }
      } catch{
        Alert.alert('Произошла ошибка во время отправки данных, попробуйте еще раз')
      }
    } else {
      Alert.alert('Выберите норматив, чтобы его удалить')
    }
  }

  useEffect(() => {
    const filteredStandardsG = getStandardsByClassAndGender('f')
    console.log('filteredStandardsG', filteredStandardsG)
    const filteredStandardsB = getStandardsByClassAndGender('m')
    console.log('filteredStandardsB', filteredStandardsB)
    setFilteredStandardsG(filteredStandardsG)
    setFilteredStandardsB(filteredStandardsB)
  }, [selectedClass, selectedFisStand])

  useFocusEffect(
    useCallback(() => {
      getStandards()
    }, [])
  )
  useEffect(() => {
    console.log(isTechnical)
  }, [isTechnical])
  return (
    <View className="bg-background-1 flex-1 my-1">
      <View className="flex-row justify-center items-center">
        <Text className="text-typography-1 text-s font-semibold">
          Физические
        </Text>
        <Switch
          value={isTechnical}
          onChange={() => setIsTechnical((prev) => !prev)}
        />
        <Text className="text-typography-1 text-s font-semibold">
          Технические
        </Text>
      </View>
      {!isTechnical ? (
        <>
          <View className="flex-row justify-between p-4">
            <CustomButton
              classNameText="text-background-1"
              color={selectedClass ? 'orange' : 'blue'}
              buttonText={selectedClass ? `${selectedClass} класс` : 'Класс'}
              size="sm"
              onPress={() => setShowActionsheetClass(true)}
            />
            <CustomButton
              classNameText="text-background-1"
              color={selectedFisStand.id !== -1 ? 'orange' : 'blue'}
              buttonText={
                selectedFisStand.id !== -1
                  ? selectedFisStand.standard
                  : 'Норматив'
              }
              size="sm"
              onPress={() => setShowActionsheetStand(true)}
            />
          </View>
          <View className="w-full gap-1">
            <View className="w-full flex items-between gap-3">
              <Text className="text-m text-primary-0 text-center font-semibold">
                Девочки
              </Text>
              <StandardTable
                standards={filtredStandardsG ?? {}}
              ></StandardTable>
            </View>
            <View className="w-full flex items-between gap-3">
              <Text className="text-m text-primary-0 text-center font-semibold">
                Мальчики
              </Text>
              <StandardTable
                standards={filtredStandardsB ?? {}}
              ></StandardTable>
            </View>
          </View>
          <ActionSheet
            isStandards
            selectedStandard={selectedFisStand}
            setSelectedStandard={setSelectedFisStand}
            standards={getStandardsByClass(selectedClass, standards, false)}
            handleClose={handleCloseStand}
            isOpen={showActionsheetStand}
            onClose={handleCloseStand}
          />
        </>
      ) : (
        <>
          <View className="w-full flex items-center">
            <View className="w-full flex-row justify-start p-4">
              <CustomButton
                classNameText="text-background-1"
                color={selectedClass ? 'orange' : 'blue'}
                buttonText={selectedClass ? `${selectedClass} класс` : 'Класс'}
                size="sm"
                onPress={() => setShowActionsheetClass(true)}
              />
            </View>
            <View
              className="w-[95%] rounded-custom border-primary-0/20"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 3.84,
                elevation: 5,
                backgroundColor: '#f0f8ff',
                padding: 16,
                borderRadius: 8,
              }}
            >
              <FlatList
                data={getStandardsByClass(selectedClass, standards, true)}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerClassName="w-full"
              />
            </View>
          </View>
        </>
      )}
      <View className="w-full flex-row justify-around p-2 mt-2">
        <CustomButton
          classNameText="text-background-1"
          color="green"
          size="xs"
          buttonText="Редактировать норматив"
          isFontSizeChangable={false}
          onPress={goToUpdateScreen}
        />
        <CustomButton
          classNameText="text-background-1"
          color="red"
          size="xs"
          buttonText="Удалить норматив"
          isFontSizeChangable={false}
          onPress={deleteStandard}
        />
      </View>
      <Fab
        size="md"
        className="bg-primary-0 hover:bg-primary-0/70 rounded-custom-big"
        onPress={() => {
          router.push({
            pathname: '/(tabs)/(standards)/create_update/[id]',
            params: { id: 'create' },
          })
        }}
      >
        <AntDesign name="plus" size={24} color="#E5AA7B" />
      </Fab>
      <ActionSheet
        isYear
        handleClose={handleCloseClass}
        isOpen={showActionsheetClass}
        onClose={handleCloseClass}
        levels={[...Array(11).keys()].map((i) => i + 1)}
        selectedLevel={selectedClass}
        setSelectedLevel={setSelectedClass}
      />
    </View>
  )
}
