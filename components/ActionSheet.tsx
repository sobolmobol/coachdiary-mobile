import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
  ActionsheetScrollView,
} from '@/components/ui/actionsheet'
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
  CheckboxGroup,
} from '@/components/ui/checkbox'
import { CheckIcon } from '@/components/ui/icon'
import {
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioLabel,
  RadioIcon,
} from '@/components/ui/radio'
import { AccordionClasses } from '@/components/Accordion'
import { FlatList, View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {
  ClassResponse,
  StudentResponse,
  Gender,
} from '@/types/types'
import { CustomButton } from '@/components/Button'
import { Divider } from './ui/divider'
import { Input, InputField } from './ui/input'
import { CircleIcon } from '@/components/ui/icon'
import { useRouter } from 'expo-router'

interface ItemData {
  id: number
  standard: string
}

interface ItemProps {
  item: ItemData
  onPress: () => void
  backgroundColorStyle: string
  textColorStyle: string
}
interface LevelItemProps {
  item: number
  onPress?: () => void
  backgroundColorStyle: string
  textColorStyle: string
}

function ActionSheet({
  isFilter = false,
  isClasses = false,
  isStandards = false,
  standards = [],
  classes = [],
  handleClose,
  selectedClass,
  setSelectedClass,
  selectedStandard,
  setSelectedStandard,
  isLoading = false,
  isStudentInfo = false,
  isYear = false,
  info,
  deleteStudent,
  levels,
  selectedLevel,
  setSelectedLevel,
  yearFrom = null,
  setYearFrom,
  yearBefore = null,
  setYearBefore,
  gender = null,
  setGender,
  grades = [],
  setGrades,
  onFiltersAccept,
  cancelFilters,
  userRole,
  ...props
}: {
  isFilter?: boolean
  isClasses?: boolean
  isStandards?: boolean
  isStudentInfo?: boolean
  standards?: ItemData[]
  classes?: ClassResponse[]
  handleClose: () => void
  selectedClass?: {
    class_number: number
    class_letter: string
  }
  setSelectedClass?: (selectedStandard: {
    class_number: number
    class_letter: string
  }) => void
  selectedStandard?: {
    id: number
    standard: string
  }
  setSelectedStandard?: (selectedStandard: {
    id: number
    standard: string
  }) => void
  isLoading?: Boolean | null
  isYear?: Boolean | null
  info?: StudentResponse | null
  levels?: number[]
  deleteStudent?: () => void
  selectedLevel?: number
  setSelectedLevel?: (selectedLevel: number) => void
  yearFrom?: number | null
  setYearFrom?: (yearFrom: number | null) => void
  yearBefore?: number | null
  setYearBefore?: (yearFrom: number | null) => void
  gender?: Gender | null
  setGender?: (gender: Gender | null) => void
  grades?: string[]
  setGrades?: (grades: string[]) => void
  onFiltersAccept?: () => void
  cancelFilters?: () => void
  userRole?: string | null
} & React.ComponentProps<typeof Actionsheet>) {
  const router = useRouter()
  const Item = React.useCallback(
    ({ item, onPress, backgroundColorStyle, textColorStyle }: ItemProps) => (
      <ActionsheetItem
        onPress={onPress}
        className={`w-64 p-2 rounded-custom-big border border-primary-0 my-1 ${backgroundColorStyle}`}
      >
        <ActionsheetItemText
          className={`text-xs ${textColorStyle} font-medium`}
        >
          {item.standard}
        </ActionsheetItemText>
      </ActionsheetItem>
    ),
    []
  )

  const renderItem = React.useCallback(
    ({ item }: { item: ItemData }) => {
      const backgroundColor =
        item.id === selectedStandard?.id ? 'bg-primary-0' : 'bg-background-1'
      const color =
        item.id === selectedStandard?.id
          ? 'text-background-1'
          : 'text-typography-1'
      return (
        <Item
          item={item}
          onPress={() => {
            if (setSelectedStandard) {
              setSelectedStandard({
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
    [selectedStandard, setSelectedStandard]
  )

  const LevelItem = React.useCallback(
    ({
      item,
      onPress,
      backgroundColorStyle,
      textColorStyle,
    }: LevelItemProps) => (
      <ActionsheetItem
        onPress={onPress}
        className={`w-64 p-2 rounded-custom-big border border-primary-0 my-1 ${backgroundColorStyle}`}
      >
        <ActionsheetItemText
          className={`text-xs ${textColorStyle} font-medium text-center`}
        >
          {`${item} класс`}
        </ActionsheetItemText>
      </ActionsheetItem>
    ),
    []
  )

  const renderLevelItem = React.useCallback(
    ({ item }: { item: number }) => {
      const backgroundColor =
        item === selectedLevel ? 'bg-primary-0' : 'bg-background-1'
      const color =
        item === selectedLevel ? 'text-background-1' : 'text-typography-1'
      return (
        <LevelItem
          item={item}
          onPress={() => {
            if (setSelectedLevel) {
              setSelectedLevel(item)
            }
          }}
          backgroundColorStyle={backgroundColor}
          textColorStyle={color}
        />
      )
    },
    [selectedLevel, setSelectedLevel]
  )
  function setYearBeforeChecked(text: string) {
    if (!setYearBefore) return
    let value = +text.slice(0, 4)
    if (text.length === 4) {
      if (value >= 1970 && value <= 2025) {
        setYearBefore(value)
      } else {
        setYearBefore(2025)
      }
    } else {
      setYearBefore(value)
    }
  }
  function setYearFromChecked(text: string) {
    if (!setYearFrom) return
    let value = +text.slice(0, 4)

    if (text.length === 4) {
      if (value >= 1970 && value <= 2025) {
        setYearFrom(value)
      } else {
        setYearFrom(1970)      }
    } else {
      setYearFrom(value)
    }
  }
  
  return (
    <Actionsheet {...props} useRNModal={true}>
      <ActionsheetBackdrop />
      <ActionsheetContent className="bg-background-1 rounded-t-custom-big border-0">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator className="bg-primary-0 rounded-custom-big" />
          <View className="my-2 w-full flex items-center">
            <Text className="font-extrabold text-m text-start text-primary-0">
              {' '}
              {isClasses
                ? 'Классы'
                : isStandards
                  ? 'Нормативы'
                  : isFilter
                    ? 'Фильтры'
                    : isStudentInfo
                      ? 'Информация об ученике'
                      : 'Класс'}{' '}
            </Text>
          </View>
          <Divider
            className="w-full my-0.5 bg-primary-0/20"
            orientation="horizontal"
          />
        </ActionsheetDragIndicatorWrapper>
        {isStandards &&
          (standards.length !== 0 ? (
            <FlatList
              data={standards}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerClassName="flex items-center"
            />
          ) : (
            <ActionsheetScrollView>
              <ActionsheetItem>
                <ActionsheetItemText className="text-typography-1 text-xs">
                  После выбора класса здесь появится список нормативов для него
                </ActionsheetItemText>
              </ActionsheetItem>
            </ActionsheetScrollView>
          ))}
        {isClasses && (
          <ActionsheetScrollView>
            {isLoading ? (
              <Text>Загрузка классов...</Text>
            ) : (
              <AccordionClasses
                className="flex justify-center m-3 w-[95%] text-typography-0"
                selectedClass={selectedClass}
                setSelectedClass={setSelectedClass}
                classes={classes}
                handleClose={handleClose}
              />
            )}
          </ActionsheetScrollView>
        )}
        {isFilter && (
          <ActionsheetScrollView>
            <View className="flex w-full gap-2 p-2">
              <Text className="text-center text-typography-1 font-bold text-s">
                Пол
              </Text>
              <RadioGroup value={gender ?? ''} onChange={setGender}>
                <View className="flex-row justify-between">
                  <Radio value="f">
                    <RadioIndicator className="border-primary-0 rounded-custom-big">
                      <RadioIcon className="border-primary-0" as={CircleIcon} />
                    </RadioIndicator>
                    <RadioLabel>
                      <Text className="text-typography-1 text-s font-semibold">
                        Девочки
                      </Text>
                    </RadioLabel>
                  </Radio>
                  <Radio value="m">
                    <RadioIndicator className="border-primary-0 rounded-custom-big">
                      <RadioIcon className="border-primary-0" as={CircleIcon} />
                    </RadioIndicator>
                    <RadioLabel>
                      <Text className="text-typography-1 text-s font-semibold">
                        Мальчики
                      </Text>
                    </RadioLabel>
                  </Radio>
                </View>
              </RadioGroup>
              <Divider
                className="w-full my-0.5 bg-primary-0/20"
                orientation="horizontal"
              />
            </View>
            <View className="flex w-full gap-2 p-2">
              <Text className="text-center text-typography-1 font-bold text-s">
                Оценка
              </Text>
              <CheckboxGroup
                value={grades ?? ''}
                onChange={(keys) => {
                  if (setGrades) setGrades(keys)
                }}
              >
                <View className="flex-row justify-between">
                  <Checkbox value="2">
                    <CheckboxIndicator className="border-error-0">
                      <CheckboxIcon className="text-error-0" as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>
                      <Text className="text-error-0 font-semibold">2</Text>
                    </CheckboxLabel>
                  </Checkbox>
                  <Checkbox value="3">
                    <CheckboxIndicator className="border-warning-0/70">
                      <CheckboxIcon
                        className="text-warning-0/70"
                        as={CheckIcon}
                      />
                    </CheckboxIndicator>
                    <CheckboxLabel>
                      <Text className="text-warning-0/70 font-semibold">3</Text>
                    </CheckboxLabel>
                  </Checkbox>
                  <Checkbox value="4">
                    <CheckboxIndicator className="border-info-0">
                      <CheckboxIcon className="text-info-0" as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>
                      <Text className="text-info-0 font-semibold">4</Text>
                    </CheckboxLabel>
                  </Checkbox>
                  <Checkbox value="5" key={'5'}>
                    <CheckboxIndicator className="border-success-0/80">
                      <CheckboxIcon
                        className="text-success-0/80"
                        as={CheckIcon}
                      />
                    </CheckboxIndicator>
                    <CheckboxLabel>
                      <Text className="text-success-0/80 font-semibold">5</Text>
                    </CheckboxLabel>
                  </Checkbox>
                </View>
              </CheckboxGroup>
              <Divider
                className="w-full my-0.5 bg-primary-0/20"
                orientation="horizontal"
              />
            </View>
            <View className="flex w-full gap-2 p-2">
              <Text className="text-center text-typography-1 font-bold text-s">
                Год рождения
              </Text>
              <View className="w-full flex-row justify-between items-center p-2">
                <Text className="text-typography-1 font-bold text-xs">От</Text>
                <Input className="w-[35%] rounded-custom border-tertiary-0/50 bg-tertiary-0/30">
                  <InputField
                    className="text-typography-1"
                    placeholder="От"
                    value={yearFrom ? yearFrom.toString() : ''}
                    keyboardType="numbers-and-punctuation"
                    onChangeText={(text) => {
                      setYearFromChecked(text)
                    }}
                  />
                </Input>
                <Text className="text-typography-1 font-bold text-xs">До</Text>
                <Input className="w-[35%] rounded-custom border-tertiary-0/50 bg-tertiary-0/30">
                  <InputField
                    className="text-typography-1"
                    placeholder="До"
                    value={yearBefore ? yearBefore.toString() : ''}
                    keyboardType="numbers-and-punctuation"
                    onChangeText={(text) => {
                      setYearBeforeChecked(text)
                    }}
                  />
                </Input>
              </View>
            </View>
            <View className="w-full flex-row justify-between p-2 mt-2">
              <CustomButton
                classNameText="text-background-1"
                color="red"
                size="xs"
                buttonText="Сбросить"
                isFontSizeChangable={false}
                onPress={cancelFilters}
              />
              <CustomButton
                classNameText="text-background-1"
                color="green"
                size="xs"
                buttonText="Применить фильтры"
                isFontSizeChangable={false}
                onPress={onFiltersAccept}
              />
            </View>
          </ActionsheetScrollView>
        )}
        {isStudentInfo && (
          <ActionsheetScrollView>
            <View className="flex items-center w-full">
              <View className="w-[94%] p-1 rounded-custom border-2 border-primary-0 my-1">
                <Text className="text-xs text-primary-0 font-bold text-center">{`Дата рождения: ${info?.birthday}`}</Text>
              </View>
              <View className="w-[94%] p-1 rounded-custom border-2 border-primary-0 my-1">
                <Text className="text-xs text-primary-0 font-bold text-center">{`Класс: ${info?.student_class.number} ${info?.student_class.class_name}`}</Text>
              </View>
              <View className="w-[94%] p-1 rounded-custom border-2 border-primary-0 my-1">
                <Text className="text-xs text-primary-0 font-bold text-center">{`Пол: ${info?.gender == 'f' ? 'женский' : 'мужской'}`}</Text>
              </View>
              {userRole==='teacher' &&  
              <View className="w-full flex-row justify-around p-2 mt-2">
                <CustomButton
                  classNameText="text-background-1"
                  color="green"
                  size="xs"
                  buttonText="Редактировать ученика"
                  onPress={() => {
                    router.push({
                      pathname: '/(tabs)/(diary)/create_update/[id]',
                      params: { id: info?.id ?? '' },
                    })
                    handleClose()
                  }}
                  isFontSizeChangable={false}
                />
                <CustomButton
                  classNameText="text-background-1"
                  color="red"
                  size="xs"
                  buttonText="Удалить ученика"
                  isFontSizeChangable={false}
                  onPress={deleteStudent}
                />
              </View>}
            </View>
          </ActionsheetScrollView>
        )}
        {isYear && (
          <FlatList
            data={levels}
            renderItem={renderLevelItem}
            keyExtractor={(item) => item.toString()}
            contentContainerClassName="flex items-center"
          />
        )}
      </ActionsheetContent>
    </Actionsheet>
  )
}

export { ActionSheet }
