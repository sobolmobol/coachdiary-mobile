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
import { Divider } from "@/components/ui/divider"
import { ChevronUpIcon, ChevronDownIcon } from "@/components/ui/icon"
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react'
type ItemProps = {
  item: string;
  onPress: () => void;
  backgroundColorStyle: string;
  textColorStyle: string;
};
const Item = ({ item, onPress, backgroundColorStyle, textColorStyle } : ItemProps) => (
  <TouchableOpacity onPress={onPress} className={"p-4 rounded-custom " + backgroundColorStyle}>
    <Text className={"text-xs " + textColorStyle}>{ item }</Text>
  </TouchableOpacity>
);
function AccordionClasses({classes,
  selectedClass,
  setSelectedClass,
  ...props} : {
  classes: Class[],
  selectedClass: string,
  setSelectedClass: (selectedClass: string) => void
}& React.ComponentProps<typeof Accordion>) {

  const renderItem = ({item}: {item: string}) => {
    const backgroundColor = item === selectedClass ? 'bg-primary-0' : 'bg-background-0';
    const color = item === selectedClass ? 'text-typography-0' : 'text-typography-1';
    return (
      <Item
        item={item}
        onPress={() => setSelectedClass(item)}
        backgroundColorStyle={backgroundColor}
        textColorStyle={color}
      />
    );
  };
  return (
    <Accordion
      size="md"
      variant="filled"
      type="single"
      isCollapsible={true}
      isDisabled={false}
      onValueChange={() => setSelectedClass}
    >
      {classes.map((item) => (
        <AccordionItem 
          value={item.id.toString()} 
          key={`item-${item.id}`}
          className="border-t border-b outline-1">
          <AccordionHeader>
            <AccordionTrigger>

              {({ isExpanded }) => (
                <Text>
                  <AccordionTitleText> {item.number + " год обучения"}</AccordionTitleText>
                  {isExpanded ? (
                    <AccordionIcon as={ChevronUpIcon} />
                  ) : (
                    <AccordionIcon as={ChevronDownIcon}  />
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
                    contentContainerClassName="flex justify-center"
                    data={item.class_name}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                    extraData={selectedClass}
                    horizontal={true}
                  />
                </SafeAreaView>
              </SafeAreaProvider>
            </View>
          </AccordionContent>
      </AccordionItem>
      
    ))}
    </Accordion>
  )
}
export { AccordionClasses };