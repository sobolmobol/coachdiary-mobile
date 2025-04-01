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
import React, {useState} from 'react'
type ItemProps = {
  item: string;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};
const Item = ({ item, onPress, backgroundColor, textColor } : ItemProps) => (
  <TouchableOpacity onPress={onPress} style={{backgroundColor: backgroundColor}}>
    <Text style={{color: textColor }}>{ item }</Text>
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
    const backgroundColor = item === selectedClass ? '#6e3b6e' : '#f9c2ff';
    const color = item === selectedClass ? 'white' : 'black';
    return (
      <Item
        item={item}
        onPress={() => setSelectedClass(item)}
        backgroundColor={backgroundColor}
        textColor={color}
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
        className="m-5 w-[95%] border border-primary-0 rounded-custom"
      >
        {classes.map((item) => (
        <AccordionItem value={`item-${item.id}`} key={`item-${item.id}`}>
          <AccordionHeader>
            <AccordionTrigger>

              {({ isExpanded }) => (
                <Text>
                  <AccordionTitleText> {item.number}</AccordionTitleText>
                  {isExpanded ? (
                    <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                  ) : (
                    <AccordionIcon as={ChevronDownIcon} className="ml-3" />
                  )}
                </Text>
              )}

            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <View style={{ flex: 1 }}>
              <SafeAreaProvider>
                <SafeAreaView >
                  <FlatList
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
          <Divider />
        </AccordionItem>
        
      ))}
      </Accordion>
    )
}
export { AccordionClasses };