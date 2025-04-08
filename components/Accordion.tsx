import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionTrigger,
    AccordionTitleText,
    AccordionContentText,
    AccordionIcon,
    AccordionContent,
} from "@/components/ui/accordion"
import { Class } from '@/types/types'
import { ChevronUpIcon, ChevronDownIcon } from "@/components/ui/icon"
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react'
import {useRef} from "react"
import { Divider } from "./ui/divider";
type ItemProps = {
  item: string;
  onPress: () => void;
  backgroundColorStyle: string;
  textColorStyle: string;
};
function AccordionClasses({classes,
  selectedClass,
  setSelectedClass,
  handleClose,
  ...props} : {
  classes: Class[],
  selectedClass?: {
    class_number: number,
    class_letter: string
  },
  setSelectedClass?: (selectedClass: {
    class_number: number,
    class_letter: string
  }) => void,
  handleClose: () => void,
}& React.ComponentProps<typeof Accordion>) {
  const Item = ({ item, onPress, backgroundColorStyle, textColorStyle } : ItemProps) => (
    <TouchableOpacity onPress={onPress} className={"p-4 rounded-custom " + backgroundColorStyle}>
      <Text className={"text-xs font-bold " + textColorStyle}>{ item }</Text>
    </TouchableOpacity>
  );
  const class_number = useRef(-1);
  const renderItem = React.useCallback(({item}: {item: string}) => {
    const backgroundColor = item == selectedClass?.class_letter ? 'bg-primary-0' : 'bg-background-0';
    const color =item == selectedClass?.class_letter ? 'text-typography-0' : 'text-typography-1';
    return (
      <Item
        item={item}
        onPress={() => {
          if(selectedClass && setSelectedClass){
            setSelectedClass({
              class_number: class_number.current,
              class_letter: item
            })
          };
        }}
        backgroundColorStyle={backgroundColor}
        textColorStyle={color}
      />
    );
  }, [selectedClass, setSelectedClass])
  return (
    <Accordion
      size="md"
      variant="filled"
      type="single"
      isCollapsible={true}
      isDisabled={false}
      onValueChange={(newValue) => {
        class_number.current = Number(newValue[0]);
      }} 
      className="flex items-evenly bg-background-0"
    >
      {classes.map((item) => (
        <AccordionItem 
          value={item.number.toString()} 
          key={`item-${item.id}`}>
          <AccordionHeader>
            <AccordionTrigger>

              {({ isExpanded }) => (
                <Text className="gap-8">
                  <AccordionTitleText> {item.number + " год обучения"}</AccordionTitleText>
                  {isExpanded ? (
                    <AccordionIcon className="text-primary-0 w-7 h-7 p-3" as={ChevronUpIcon} />
                  ) : (
                    <AccordionIcon className="text-primary-0 w-7 h-7 p-3" as={ChevronDownIcon}  />
                  )}
                </Text>
              )}

            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <View style={{flex: 1}}>
              <SafeAreaProvider>
                <SafeAreaView >
                  <FlatList
                    contentContainerClassName="flex items-evenly gap-3"
                    data={item.class_name}
                    renderItem={renderItem}
                    keyExtractor={(item) => item}
                    horizontal={true}
                  />
                </SafeAreaView>
              </SafeAreaProvider>
            </View>
          </AccordionContent>
          <Divider className="my-0.5 bg-typography-1/50" orientation="horizontal"/>
      </AccordionItem>
    ))}
    </Accordion>
  )
}
export { AccordionClasses };