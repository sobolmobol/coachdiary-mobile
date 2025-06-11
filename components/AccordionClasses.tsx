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
import { ClassResponse, StudentResponse } from '@/types/types'
import { ChevronUpIcon, ChevronDownIcon } from '@/components/ui/icon'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { useRef } from 'react'
import { Divider } from './ui/divider'
import { CustomButton } from '@/components/Button'
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableData,
} from '@/components/ui/table'

function CodeItem({ code, isReg }: { code: string, isReg: boolean }) {
  const [shown, setShown] = useState(false)
  return (
    <TouchableOpacity
      className="bg-primary-0/50 p-1 rounded-custom border-primary-0"
      onPress={() => setShown(!shown)}
    >
      <Text className="font-bold text-primary-0">
        {shown ? isReg ? 'Ученик зарегистрирован' : code : 'Показать код'}
      </Text>
    </TouchableOpacity>
  )
}

function AccordionTable({
  stClass,
  students,
  onDeleteClass,
  onDownloadQR,
  ...props
}: {
  stClass: ClassResponse | null
  students: StudentResponse[] | null
  onDeleteClass: () => void
  onDownloadQR: () => void
} & React.ComponentProps<typeof Accordion>) {
  return (
    <Accordion
      size="md"
      variant="filled"
      type="single"
      isCollapsible={true}
      isDisabled={false}
      className="bg-background-1"
    >
      <AccordionItem
        className="bg-background-1"
        value={`${stClass?.number}${stClass?.class_name}`}
        key={`item-${stClass?.id}`}
      >
        <AccordionHeader>
          <AccordionTrigger>
            {({ isExpanded }) => (
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
              >
                <AccordionTitleText>
                  {`${stClass?.number}${stClass?.class_name} класс`}
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
              </View>
            )}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent className="bg-background-1">
          <View style={{ flex: 1 }}>
            <Table className="w-full table-auto">
              <TableHeader>
                <TableRow className="bg-primary-0/20 border-primary-0/50">
                  <TableHead className="text-typography-1 text-xs max-w-[50px]">
                    <Text>№</Text>
                  </TableHead>
                  <TableHead className="text-typography-1 text-xs flex-1">
                    <Text>ФИО</Text>
                  </TableHead>
                  <TableHead className="text-typography-1 text-xs flex-1">
                    <Text>Код приглашения</Text>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <ScrollView className="w-full max-h-90">
                <TableBody>
                  {students?.map((item, index) => (
                    <TableRow
                      key={item.id}
                      className="flex border-primary-0/50 flex-row bg-background-1"
                    >
                      <TableData className="font-bold text-typography-1 text-xs max-w-[50px]">
                        <Text>{index + 1}</Text>
                      </TableData>
                      <TableData className="font-bold text-typography-1 text-xs flex-1">
                        <Text>{item.full_name}</Text>
                      </TableData>
                      <TableData className="font-bold text-typography-1 text-xs flex-1">
                        <CodeItem
                          isReg={item.is_used_invitation}
                          code={item.invitation_link.split('/join/')[1]}
                        />
                      </TableData>
                    </TableRow>
                  ))}
                </TableBody>
              </ScrollView>
              <TableFooter>
                <View className="w-full flex-row justify-between p-2 g-2 bg-background-1 z-50">
                  <CustomButton
                    classNameText="text-background-1"
                    color="red"
                    size="xs"
                    buttonText="Удалить класс"
                    isFontSizeChangable={true}
                    onPress={onDeleteClass}
                  />
                  <CustomButton
                    classNameText="text-background-1"
                    color="green"
                    size="xs"
                    buttonText="Скачать QR-коды"
                    isFontSizeChangable={true}
                    onPress={onDownloadQR}
                  />
                </View>
              </TableFooter>
            </Table>
          </View>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
export { AccordionTable }
