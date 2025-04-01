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
import { View, Text } from "react-native"
import React, {useState} from "react"
import { Class } from '@/types/types'
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

function ActionSheet({isClasses = false, 
    isStandards = false, 
    standards = [], 
    classes = [], 
    handleClose, 
    ...props} : {
        isClasses?: boolean,
        isStandards?: boolean,
        standards?: string[], 
        classes?: Class[],
        handleClose: () => void;
        }
        & React.ComponentProps<typeof Actionsheet>
){
    const [selectedClass, setSelectedClass] = useState<string>();
    const [selectedStandrdId, setSelectedStandrdId] = useState<string>();
    const Item = React.useCallback(
        ({ name } : { name: string }) => (
          <ActionsheetItem onPress={handleClose}>
            <ActionsheetItemText>{name}</ActionsheetItemText>
          </ActionsheetItem>
        ),
        [handleClose]
    )
    return(
        <Actionsheet {...props} >

            <ActionsheetBackdrop />
            <ActionsheetContent className="bg-background-0 rounded-custom">
                <ActionsheetDragIndicatorWrapper >
                    <ActionsheetDragIndicator className="bg-primary-0" />
                </ActionsheetDragIndicatorWrapper>
                {isStandards && 
                (
                    <ActionsheetFlatList
                        data={standards}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={({ item } ) => <Item name={String(item)} />}
                    />
                )}
                {isClasses && 
                (
                <ActionsheetScrollView> 
                    <AccordionClasses 
                        className="flex justify-center m-3 w-[95%] text-typography-0" 
                        selectedClass={selectedClass ?? ""} 
                        setSelectedClass={setSelectedClass} 
                        classes={classes}
                    /> 
                </ActionsheetScrollView>
            )}                             
            </ActionsheetContent>
        </Actionsheet>
    )
}

export { ActionSheet };