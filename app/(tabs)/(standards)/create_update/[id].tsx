import { View, Text, Alert } from 'react-native'
import { Input, InputField } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { CustomButton } from '@/components/Button'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { get, patch, getErrorMessage, post } from '@/services/utils'
import { CheckIcon } from '@/components/ui/icon'
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
  CheckboxGroup,
} from '@/components/ui/checkbox'
import {
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioLabel,
  RadioIcon,
} from '@/components/ui/radio'
import { CircleIcon } from '@/components/ui/icon'
import {
  StandardResponse,
  StandardRequest,
  Gender,
} from '@/types/types'
import { Switch } from '@/components/ui/switch'
import { ScrollView } from 'react-native'


interface Level {
  girls: LevelValues;
  boys: LevelValues;
}

interface LevelValues {
  high: number | null;
  middle: number | null;
  low: number | null;
}

export default function CreateOrUpdateStandardScreen() {
  const { id } = useLocalSearchParams()
  const [isTechnical, setIsTechnical] = useState(false)
  const [standard, setStandard] = useState('')
  const [isLowerBetter, setIsLowerBetter] = useState<Boolean | null>(false)
  const [classes, setClasses] = useState<string[]>([])
  const [levels, setLevels] = useState<Record<number, Level>>({})
  const [currentClass, setCurrentClass] = useState(-1)

  function setLevelsWithZeroes() {
    setLevels(() => {
      const newLevels: Record<number, Level> = {};
      for (let i = 1; i <= 11; i++) {
        newLevels[i] = {
          girls: {
            high: null,
            middle: null,
            low: null,
          },
          boys: {
            high: null,
            middle: null,
            low: null,
          },
        };
      }
      return newLevels;
    });
  }
  async function createOrUpdateStandard() {
  try {
    const requestData: StandardRequest = {
      name: standard,
      has_numeric_value: !isTechnical,
      levels: Object
        .entries(levels)
        .filter(([key]) => classes.includes(key))
        .map(([key, value]) => [
          {
            is_lower_better: isLowerBetter,
            level_number: +key,
            low_value: value.girls.low,
            middle_value: value.girls.middle,
            high_value: value.girls.high,
            gender: 'f' as const
          },
          {
            is_lower_better: isLowerBetter,
            level_number: +key,
            low_value: value.boys.low,
            middle_value: value.boys.middle,
            high_value: value.boys.high,
            gender: 'm' as const
          }
        ])
        .flat()
    }
    const currentId = id === 'create' ? '' : `${id}/`
    const currentMethod = id === 'create' ? post : patch
    const response = await currentMethod(`/standards/` + currentId, requestData)
    if (response.ok && id === 'create') {
      Alert.alert('Норматив успешно создан')
      setStandard('')
      setIsTechnical(false)
      setClasses([])
      setLevelsWithZeroes()
    } else if (response.ok && id !== 'create') {
      Alert.alert('Данные о нормативе успешно обновлены')
    } else {
      Alert.alert(getErrorMessage(await response.json()))
    }
  } catch {
      Alert.alert('Произошла ошибка во время отправки данных, попробуйте еще раз')
    }
  }
  async function getStandards(){
    try{
      if (id !== 'create') {
        const data: StandardResponse = await get(`/standards/${id}/`).then(res => res.json())
        setStandard(data.name)
        setIsTechnical(!data.has_numeric_value)
        setIsLowerBetter(data.levels[0].is_lower_better)
        setLevels((prev) => {
          const updatedLevels = { ...prev };

          for (const level of data.levels) {
            const key = level.gender === 'f' ? 'girls' : 'boys';
            if (!updatedLevels[level.level_number]) {
              updatedLevels[level.level_number] = {
                girls: { high: null, middle: null, low: null },
                boys: { high: null, middle: null, low: null },
              };
            }
            updatedLevels[level.level_number][key] = {
              high: level.high_value,
              middle: level.middle_value,
              low: level.low_value,
            };
          }
        return updatedLevels;    
      });

      if (data.levels.length > 0) {
        const classNumbers = data.levels.map((level) => level.level_number);
        setClasses([...new Set(classNumbers.map(String))]);
        setCurrentClass(Math.min(...classNumbers));
      } else {
        setCurrentClass(-1); 
      }}    
  } catch{
      Alert.alert('Произошла ошибка во время отправки данных, попробуйте еще раз')
    }
  }

  const isNextLevelButtonDisabled = () => {
    return !classes.some(value => +value > currentClass)
  }
  
  const isPreviousLevelButtonDisabled = () => {
    return !classes.some(value => +value < currentClass)
  }

  function toNextLevel() {
    for (let i = currentClass + 1; i <= 11; i++) {
      if (classes.includes(String(i))) {
        setCurrentClass(i)
        return
      }
    }
  }
  
  function toPreviousLevel() {
    for (let i = currentClass - 1; i >= 1; i--) {
      if (classes.includes(String(i))) {
        setCurrentClass(i)
        return
      }
    }
  }

  function setLevelsInput(
    gender: Gender,
    value: string,
    step: 'high' | 'middle' | 'low'
  ) {
    setLevels((prevLevels) => {
      const updatedLevels = { ...prevLevels };
      if (updatedLevels[currentClass]) {
        updatedLevels[currentClass][gender === 'f' ? 'girls' : 'boys'][step] = value ? +value.slice(0,4) : null;
      }
      return updatedLevels;
    });
  }
const isButtonDisabled = () => {
  return !standard
    || classes.length === 0
    || (
      Object
        .entries(levels)
        .some(([key, value]) =>
            classes.includes(key) && (
              !value.girls.high
              || !value.girls.middle
              || !value.girls.low
              || !value.boys.low
              || !value.boys.middle
              || !value.boys.high
            )
        )
      && !isTechnical
    )
  }
  useEffect(() => {
    if(classes.length !== 0) setCurrentClass(Math.min(...classes.map(item => +item)))
  }, [classes])
  useEffect(() => {
    setLevelsWithZeroes()
    const getStandAsync = async () => {
      await getStandards()
    }
    getStandAsync()
  }, [])
  return (
    <View className="w-full h-full bg-background-1 relative">
      <Stack.Screen
        options={{
          title: `${id === 'create' ? 'Создание норматива' : 'Редактирование норматива'}`,
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
        <View className="w-[90%] h-[95%] bg-background-1 shadow-md rounded-custom-big flex justify-around m-2">
          <ScrollView contentContainerClassName="w-full flex justify-between items-center gap-2 py-3">
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
            <View className="w-[90%] flex gap-3">
              <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30">
                <InputField
                  className="text-typography-1"
                  placeholder="Название"
                  value={standard}
                  onChangeText={(text: string) => {
                    setStandard(text);
                  }}
                />
              </Input>
              {!isTechnical ? 
              <View className="w-full flex p-2 gap-2 border-tertiary-0/50 bg-tertiary-0/30 rounded-custom">
                <Text className="p-1 text-typography-1/60">Праметр оценивания</Text>
                <RadioGroup
                  value={isLowerBetter ? '2' : '1'}
                  onChange={(val) => setIsLowerBetter(val === '2')}
                >
                  <View className="flex-row justify-evenly">
                    <Radio value="1">
                      <RadioIndicator className="border-primary-0 rounded-custom-big">
                        <RadioIcon className="border-primary-0" as={CircleIcon} />
                      </RadioIndicator>
                      <RadioLabel>
                        <Text className="text-typography-1">Больше - лучше</Text>
                      </RadioLabel>
                    </Radio>
                    <Radio value="2">
                      <RadioIndicator className="border-primary-0 rounded-custom-big">
                        <RadioIcon className="border-primary-0" as={CircleIcon} />
                      </RadioIndicator>
                      <RadioLabel>
                        <Text className="text-typography-1">Меньше - лучше</Text>
                      </RadioLabel>
                    </Radio>
                  </View>
                </RadioGroup>
              </View> : '' }
              <View className="w-full flex p-2 gap-2 border-tertiary-0/50 bg-tertiary-0/30 rounded-custom">
                <Text className="p-1 text-typography-1/60">Классы</Text>
                <Text className="p-1 text-typography-1/60 font-semibold">
                  Выберите один или несколько
                </Text>
                <CheckboxGroup
                  value={classes ?? []}
                  onChange={(keys) => {
                    if (setClasses) setClasses(keys);
                  }}
                >
                  <View className="flex-row flex-wrap gap-2 p-2">
                    {[...Array(11).keys()]
                      .map((i) => i + 1)
                      .map((item) => (
                        <Checkbox value={item.toString()} key={item.toString()}>
                          <CheckboxIndicator className="border-primary-0">
                            <CheckboxIcon
                              className="text-primary-0"
                              as={CheckIcon}
                            />
                          </CheckboxIndicator>
                          <CheckboxLabel>
                            <Text className="text-typography-1">{item}</Text>
                          </CheckboxLabel>
                        </Checkbox>
                      ))}
                  </View>
                </CheckboxGroup>
              </View>
              {currentClass !== -1 && !isTechnical ? 
              <View className="w-full flex p-2 gap-2 border-tertiary-0/50 bg-tertiary-0/30 rounded-custom">
                <Text className="p-1 text-typography-1/60">Нормы</Text>
                <View className='w-full flex-row justify-evenly'>
                  <View className="w-[45%] flex gap-3">
                    <Text className="p-1 text-s text-typography-1 font-semibold">
                      Девочки
                    </Text>
                    <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30">
                      <InputField
                        className="text-typography-1"
                        placeholder="Высокая ступень"
                        value={levels[currentClass]?.girls.high ? levels[currentClass]?.girls?.high.toString() : ''}
                        onChangeText={(text) => setLevelsInput('f', text, 'high')}
                      />
                    </Input>
                    <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30">
                      <InputField
                        className="text-typography-1"
                        placeholder="Средняя ступень"
                        value={levels[currentClass]?.girls?.middle ? levels[currentClass]?.girls?.middle.toString() : ''}
                        onChangeText={(text) => setLevelsInput('f', text, 'middle')}
                      />
                    </Input>
                    <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30">
                      <InputField
                        className="text-typography-1"
                        placeholder="Низкая ступень"
                        value={levels[currentClass]?.girls?.low ? levels[currentClass]?.girls?.low.toString() : ''}
                        onChangeText={(text) => setLevelsInput('f', text, 'low')}
                      />
                    </Input>
                  </View>
                  <View className="w-[45%] flex gap-3">
                    <Text className="p-1 text-s text-typography-1 font-semibold">
                      Мальчики
                    </Text>
                    <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30">
                      <InputField
                        className="text-typography-1"
                        placeholder="Высокая ступень"
                        value={levels[currentClass]?.boys?.high ? levels[currentClass]?.boys?.high.toString() : ''}
                        onChangeText={(text) => setLevelsInput('m', text, 'high')}
                      />
                    </Input>
                    <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30">
                      <InputField
                        className="text-typography-1"
                        placeholder="Средняя ступень"
                        value={levels[currentClass]?.boys?.middle ? levels[currentClass]?.boys?.middle.toString() : ''}
                        onChangeText={(text) => setLevelsInput('m', text, 'middle')}
                      />
                    </Input>
                    <Input className="rounded-custom border-tertiary-0/50 bg-tertiary-0/30">
                      <InputField
                        className="text-typography-1"
                        placeholder="Низкая ступень"
                        value={levels[currentClass]?.boys?.low ? levels[currentClass]?.boys?.low.toString() : ''}
                        onChangeText={(text) => setLevelsInput('m', text, 'low')}
                      />
                    </Input>
                  </View>
                  </View>
                  <View className="flex-row justify-between items-center p-4">
                    <CustomButton
                      color="blue"
                      buttonText="<"
                      size="xs"
                      onPress={toPreviousLevel}
                      isDisabled={isPreviousLevelButtonDisabled()}
                    />
                    <Text className="text-typography-1 font-medium">{`${currentClass} уровень`}</Text>
                    <CustomButton
                      buttonText=">"
                      color="blue"
                      size="xs"
                      onPress={toNextLevel}
                      isDisabled={isNextLevelButtonDisabled()}
                    />
                  </View> 
              </View>: ''}
            </View> 
            <View className='w-[90%]'>
              <CustomButton
                buttonText={id === 'create' ? 'Создать' : 'Сохранить'}
                color="blue"
                size="md"
                classNameText='text-background-1'
                isDisabled={isButtonDisabled()}
                onPress={createOrUpdateStandard}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
