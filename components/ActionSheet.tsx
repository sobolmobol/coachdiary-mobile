import {
    Actionsheet,
    ActionsheetFlatList,  
    ActionsheetContent,
    ActionsheetItem,
    ActionsheetItemText,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetBackdrop,
    ActionsheetScrollView,
    ActionsheetSectionList,
    ActionsheetSectionHeaderText,
} from "@/components/ui/actionsheet"
import {AccordionClasses} from "@/components/Accordion";
import { FlatList, View, Text } from "react-native"
import React, {useState} from "react"
import { Class } from '@/types/types'
import { CustomButton } from "@/components/Button";
import { Divider } from "./ui/divider";

type ItemData = {
    id: number;
    standard: string;
};

type ItemProps = {
    item: ItemData;
    onPress: () => void;
    backgroundColorStyle: string;
    textColorStyle: string;
};


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
    ...props} : {
        isFilter?: boolean,
        isClasses?: boolean,
        isStandards?: boolean,
        standards?: ItemData[], 
        classes?: Class[],
        handleClose: () => void;
        selectedClass?: {
            class_number: number,
            class_letter: string
        },
        setSelectedClass?: (selectedStandard: {
            class_number: number,
            class_letter: string
        }) => void,
        selectedStandard?: {
            id: number,
            standard: string
        },
        setSelectedStandard?: (selectedStandard: {
            id: number,
            standard: string
        }) => void,
        }
        & React.ComponentProps<typeof Actionsheet>
    ){
        const Item = React.useCallback(({ item, onPress, backgroundColorStyle, textColorStyle } : ItemProps) => (
            <ActionsheetItem onPress={onPress} className={"p-4 rounded-custom " + backgroundColorStyle}>
                <ActionsheetItemText className={"text-xs " + textColorStyle}>{ item.standard }</ActionsheetItemText>
            </ActionsheetItem >
        ), [])   
        const renderItem = React.useCallback(({ item }: { item: ItemData }) => {
            const backgroundColor = item.id === selectedStandard?.id ? 'bg-primary-0' : 'bg-background-0';
            const color = item.id === selectedStandard?.id ? 'text-typography-0' : 'text-typography-1';
            return (
                <Item
                    item={item}
                    onPress={() => {
                        if (setSelectedStandard) {
                            setSelectedStandard({
                                id: item.id,
                                standard: item.standard
                            });
                        }
                    }}
                    backgroundColorStyle={backgroundColor}
                    textColorStyle={color}
                />
            );
        }, [selectedStandard, setSelectedStandard]);
        return(
            <Actionsheet {...props} >

                <ActionsheetBackdrop />
                <ActionsheetContent className="bg-background-0 rounded-custom border-background-0">
                    <ActionsheetDragIndicatorWrapper >
                        <ActionsheetDragIndicator className="bg-primary-0 rounded-custom" />
                    </ActionsheetDragIndicatorWrapper>
                    {isStandards && 
                    (
                        standards.length !== 0 ?
                        <FlatList
                            data={standards}
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()}
                        /> : 
                        <ActionsheetScrollView>
                            <ActionsheetItem>
                                <ActionsheetItemText className="text-typography-1 text-xs">
                                    После выбора класса здесь появится список нормативов для него
                                </ActionsheetItemText>
                            </ActionsheetItem>
                        </ActionsheetScrollView>
                    )}
                    {isClasses && 
                    (
                    <ActionsheetScrollView> 
                        <AccordionClasses 
                            className="flex justify-center m-3 w-[95%] text-typography-0" 
                            selectedClass={selectedClass}
                            setSelectedClass={setSelectedClass} 
                            classes={classes}
                            handleClose={handleClose}
                        /> 
                    </ActionsheetScrollView>
                    )}       
                    {isFilter && 
                    (
                    <ActionsheetScrollView> 
                        <View>
                            <Text className="text-center text-typography-1 font-bold text-s"> Пол </Text>
                            <View className="w-full flex-row justify-between p-4">
                                <CustomButton buttonText="мальчики" color="non" variant="outline" size="md" className="border-primary-0 rounded-custom"></CustomButton>
                                <CustomButton buttonText="девочки" color="non" variant="outline" size="md" className="border-primary-0 rounded-custom"></CustomButton>
                            </View>
                            <Divider/>
                        </View>
                        <View>
                            <Text className="text-center text-typography-1 font-bold text-s"> Оценка </Text>
                            <Divider/>
                        </View>
                        <View>
                            <Text className="text-center text-typography-1 font-bold text-s">Год рождения </Text>
                        </View>
                    </ActionsheetScrollView>
                    )}  
                </ActionsheetContent>
            </Actionsheet>
        )
    }

    export { ActionSheet };