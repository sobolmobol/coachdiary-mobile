import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableData,
} from '@/components/ui/table'
import { Input, InputField } from '@/components/ui/input'
import { StandardByLevel } from '@/types/types'
import { useEffect, useState, useMemo } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { View, ScrollView, Text } from 'react-native'
import { CustomButton } from '@/components/Button'
function getGradeColor(grade: number) {
  if (grade === 5) return 'success-0/80'
  else if (grade === 4) return 'info-0'
  else if (grade === 3) return 'warning-0/70'
  else if (grade === 2) return 'error-0'
  else return 'info-0'
}
export default function StudentStandardTable({
  standards,
  onStandardChange,
  sumGrade,
  role = null,
  isResultsLoading
}: {
  standards: StandardByLevel[]
  onStandardChange: (updatedStandards: StandardByLevel[]) => void
  sumGrade: number
  role: string | null
  isResultsLoading: boolean
} ) {
  const [currentPage, setCurrentPage] = useState(1)
  const [updatedStandards, setUpdatedStandards] = useState<StandardByLevel[]>(
    []
  )
  const standardsPerPage = 7
  const totalPages = Math.ceil(updatedStandards.length / standardsPerPage)
  const currentStandards = updatedStandards.slice(
    (currentPage - 1) * standardsPerPage,
    currentPage * standardsPerPage
  )
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }
  const handleInputChange = (
    id: number,
    field: 'value' | 'grade',
    newValue: string
  ) => {
    if (Number.isNaN(+newValue)) {
      newValue = '0'
    }
    setUpdatedStandards(
      updatedStandards.map((standard) => {
        return standard.standard.id === id
          ? {
              ...standard,
              [field]: +newValue,
            }
          : standard
      })
    )
  }
  useEffect(() => {
    setUpdatedStandards(standards)
  }, [standards])

  function saveData() {
    onStandardChange(updatedStandards)
  }
  return (
    <Table className="w-full table-auto">
      <TableHeader>
        <TableRow className="bg-primary-0/20 border-primary-0/50 flex flex-row">
          <TableHead className="text-typography-1 text-xs text-end px-3 flex-[2] min-w-[90px]">
            Норматив
          </TableHead>
          <TableHead className="text-typography-1 text-xs text-center px-2 flex-[1.5] min-w-[70px]">
            Результат
          </TableHead>
          <TableHead className="text-typography-1 text-xs text-center px-2 flex-1 min-w-[70px]">
            Оценка
          </TableHead>
        </TableRow>
      </TableHeader>
      <ScrollView className="w-full max-h-90">
        <TableBody>
          {currentStandards.map((standard, index) => (
            <TableRow
              key={standard.standard.id}
              className={`flex border-primary-0/50 flex-row ${index % 2 === 0 ? 'bg-background-1' : 'bg-primary-0/20'}`}
            >
              <TableData className="font-bold text-typography-1 text-xs text-end px-3 flex-[2] min-w-[100px]">
                {standard.standard.name}
              </TableData>
              {standard.standard.has_numeric_value ? (
                <>
                  <TableData className="px-2 flex-[1.5] min-w-[70px] items-center justify-center flex">
                    {role === 'teacher' ? 
                    <Input
                      variant="rounded"
                      size="sm"
                      className="rounded-custom w-[70%]"
                    >
                      <InputField
                        className="text-s text-center font-extrabold text-typography-1"
                        value={standard.value?.toString() ?? ''}
                        onChangeText={(text: string) =>
                          handleInputChange(standard.standard.id, 'value', text)
                        }
                      />
                    </Input> : 
                    <View
                      className={`w-7 h-7 rounded-custom items-center justify-center`}
                    >
                      <Text className="text-typography-1 text-s font-extrabold text-center">
                        {standard.value}
                      </Text>
                    </View>}
                  </TableData>

                  <TableData className="px-2 flex-[1.5] min-w-[70px] items-center justify-center flex">
                    <View
                      className={`bg-${getGradeColor(standard.grade ?? 0)} w-7 h-7 rounded-custom items-center justify-center`}
                    >
                      <Text className="text-background-1 text-s font-extrabold text-center">
                        {standard.grade}
                      </Text>
                    </View>
                  </TableData>
                </>
              ) : (
                <>
                  <TableData className="px-2 flex-[1.5] min-w-[70px] flex items-center justify-center"></TableData>

                  <TableData className="px-2 flex-[1.5] min-w-[70px] flex items-center justify-end">
                    {role === 'teacher' ? 
                    <Input
                      variant="rounded"
                      size="sm"
                      className={`w-[70%] rounded-custom border-${getGradeColor(standard.grade ?? 0)}`}
                    >
                      <InputField
                        value={standard.grade?.toString() ?? ''}
                        className={`text-center font-extrabold text-s text-${getGradeColor(standard.grade ?? 0)}`}
                        onChangeText={(text: string) =>
                          handleInputChange(standard.standard.id, 'grade', text)
                        }
                      />
                    </Input> : 
                    <View
                      className={`bg-${getGradeColor(standard.grade ?? 0)} w-7 h-7 rounded-custom items-center justify-center`}
                    >
                      <Text className="text-background-1 text-s font-extrabold text-center">
                        {standard.grade}
                      </Text>
                    </View>
                    }
                  </TableData>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </ScrollView>
      <View className="w-full h-2">
        <TableFooter>
          <View className="flex-row justify-between items-center bg-primary-0">
            <TableRow className="bg-primary-0/20 border-primary-0/50 flex flex-row">
              <TableData className="text-m text-tertiary-0 font-bold text-end px-3 flex-[2] min-w-[90px]">
                Итого
              </TableData>
              <TableData className="px-2 flex-[1.5] min-w-[70px]"></TableData>
              <TableData className="text-m text-tertiary-0 font-bold text-center px-2 flex-1 min-w-[70px]">
                {sumGrade.toFixed(2)}
              </TableData>
            </TableRow>
          </View>
          <View className="flex-row justify-between items-center p-4 bg-primary-0/20">
            <CustomButton
              color="blue"
              buttonText="<"
              onPress={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              size="xs"
              classNameText="text-background-1"
            />
            <Text className="text-typography-1 font-medium">{`Страница ${currentPage} из ${totalPages}`}</Text>
            <CustomButton
              buttonText=">"
              color="blue"
              onPress={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              size="xs"
              classNameText="text-background-1"
            />
            {role === 'teacher' && <CustomButton
              buttonText="Сохранить"
              color="blue"
              size="xs"
              onPress={() => saveData()}
              classNameText="text-background-1"
              isDisabled={isResultsLoading}
            />}
          </View>
        </TableFooter>
      </View>
    </Table>
  )
}
