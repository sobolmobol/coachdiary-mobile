import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContentText,
  AccordionIcon,
  AccordionContent,
} from '@/components/ui/accordion'
import { ClassResponse } from '@/types/types'
import { ChevronUpIcon, ChevronDownIcon } from '@/components/ui/icon'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react'
import { useRef } from 'react'
import { Divider } from './ui/divider'
interface ItemProps {
  item: string
  onPress: () => void
  backgroundColorStyle: string
  textColorStyle: string
}
function AccordionClasses({
  classes,
  selectedClass,
  setSelectedClass,
  handleClose,
  ...props
}: {
  classes: ClassResponse[]
  selectedClass?: {
    class_number: number
    class_letter: string
  }
  setSelectedClass?: (selectedClass: {
    class_number: number
    class_letter: string
  }) => void
  handleClose: () => void
} & React.ComponentProps<typeof Accordion>) {
  const groupClasses = (classes: ClassResponse[]) => {
    return Object.values(
      classes.reduce(
        (
          acc: Record<
            number,
            { class_number: number; class_letters: string[] }
          >,
          curr
        ) => {
          const { class_name, number } = curr
          if (!acc[number]) {
            acc[number] = {
              class_number: number,
              class_letters: [],
            }
          }
          if (!acc[number].class_letters.includes(class_name)) {
            acc[number].class_letters.push(class_name)
          }
          return acc
        },
        {} as Record<number, { class_number: number; class_letters: string[] }>
      )
    )
  }
  const Item = ({
    item,
    onPress,
    backgroundColorStyle,
    textColorStyle,
  }: ItemProps) => (
    <TouchableOpacity
      onPress={onPress}
      className={`p-4 rounded-custom ${backgroundColorStyle}`}
    >
      <Text className={`text-xs font-bold ${textColorStyle}`}>{item}</Text>
    </TouchableOpacity>
  )
  const class_number = useRef(-1)
  const renderItem = React.useCallback(
    ({ item }: { item: string }) => {
      const backgroundColor =
        item == selectedClass?.class_letter ? 'bg-primary-0' : 'bg-background-1'
      const color =
        item == selectedClass?.class_letter
          ? 'text-background-1'
          : 'text-typography-1'
      return (
        <Item
          item={item}
          onPress={() => {
            if (selectedClass && setSelectedClass) {
              setSelectedClass({
                class_number: class_number.current,
                class_letter: item,
              })
            }
          }}
          backgroundColorStyle={backgroundColor}
          textColorStyle={color}
        />
      )
    },
    [selectedClass]
  )
  return (
    <Accordion
      size="md"
      variant="filled"
      type="single"
      isCollapsible={true}
      isDisabled={false}
      onValueChange={(newValue) => {
        class_number.current = +newValue[0]
      }}
      className="bg-background-1"
    >
      {groupClasses(classes).map((item) => (
        <AccordionItem
          className="bg-background-1"
          value={item.class_number.toString()}
          key={`item-${item.class_number}`}
        >
          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }) => (
                <Text className="gap-8">
                  <AccordionTitleText>
                    {' '}
                    {item.class_number + ' класс'}
                  </AccordionTitleText>
                  {isExpanded ? (
                    <AccordionIcon
                      className="text-primary-0 w-7 h-7 p-3"
                      as={ChevronUpIcon}
                    />
                  ) : (
                    <AccordionIcon
                      className="text-primary-0 w-7 h-7 p-3"
                      as={ChevronDownIcon}
                    />
                  )}
                </Text>
              )}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent className="bg-background-1">
            <View style={{ flex: 1 }}>
              <SafeAreaProvider>
                <SafeAreaView>
                  <FlatList
                    contentContainerClassName="flex items-evenly gap-3"
                    data={item.class_letters}
                    renderItem={renderItem}
                    keyExtractor={(item) => item}
                    horizontal={true}
                  />
                </SafeAreaView>
              </SafeAreaProvider>
            </View>
          </AccordionContent>
          <Divider
            className="my-0.5 bg-typography-1/50"
            orientation="horizontal"
          />
        </AccordionItem>
      ))}
    </Accordion>
  )
}
export { AccordionClasses }
