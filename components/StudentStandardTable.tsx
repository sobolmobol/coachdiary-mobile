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
  import { StudentStandardResponse } from '@/types/types'
  import {useEffect, useState, useMemo} from 'react'
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
    ...props
  }: {
    standards: StudentStandardResponse[],
    onStandardChange: (updatedStandards: StudentStandardResponse[]) => void
  } & React.ComponentProps<typeof Table>) {
  
    const [currentPage, setCurrentPage] = useState(1)
    const [updatedStandards, setUpdatedStandards] = useState<StudentStandardResponse[]>([])
    const [avgGrade, setAvgGrade] = useState<number>()
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
    const handleInputChange = (id: number, field: 'Value' | 'Grade', newValue: string) => {
      if(Number.isNaN(+newValue)){
        newValue='0'
      }
      setUpdatedStandards(updatedStandards.map((standard) =>{
        return standard.Standard.Id === id
          ?
           {
              ...standard,
              [field]: +newValue 
            }
          : standard}
      ));
    };
    useEffect(() =>{
      setUpdatedStandards(standards)
    }, [standards])
    useEffect(() =>{
      setAvgGrade(+(updatedStandards.reduce((acc, curr) => {
        const sum = acc + curr.Grade;
        return +sum
      }, 0)/updatedStandards.length).toFixed(2))
    }, [updatedStandards])
    function saveData(){
      onStandardChange(updatedStandards)
    }
    return (
      <Table className="w-full table-auto">
        <TableHeader>
          <TableRow className="bg-primary-0/20 border-primary-0/50 flex flex-row">
            <TableHead className="text-typography-1 text-xs text-end px-3 flex-[2] min-w-[90px]">Норматив</TableHead>
            <TableHead className="text-typography-1 text-xs text-center px-2 flex-[1.5] min-w-[70px]">Результат</TableHead>
            <TableHead className="text-typography-1 text-xs text-center px-2 flex-1 min-w-[70px]">Оценка</TableHead>
          </TableRow>
        </TableHeader>
        <ScrollView className="w-full max-h-90">
          <TableBody>
            {currentStandards.map((standard, index) => (
              <TableRow
                key={standard.Standard.Id}
                className={`flex border-primary-0/50 flex-row ${index % 2 === 0 ? 'bg-background-1' : 'bg-primary-0/20'}`}
              >
                <TableData className="font-bold text-typography-1 text-xs text-end px-3 flex-[2] min-w-[100px]">
                  {standard.Standard.Name}
                </TableData>
                {standard.Standard.Has_numeric_value ? (
                  <>
                    <TableData className="px-2 flex-[1.5] min-w-[70px] items-center justify-center flex">
                      <Input variant="rounded" size="sm" className="rounded-custom w-[70%]">
                        <InputField
                          className="text-s text-center font-extrabold text-typography-1"
                          value={standard.Value?.toString() ?? ''}
                          onChangeText={(text: string) => handleInputChange(standard.Standard.Id, 'Value', text)}
                        />
                      </Input>
                    </TableData>

                    <TableData className="px-2 flex-[1.5] min-w-[70px] items-center justify-center flex">
                      <View
                        className={`bg-${getGradeColor(standard.Grade ?? 0)} w-7 h-7 rounded-custom items-center justify-center`}
                      >
                        <Text className="text-background-1 text-s font-extrabold text-center">
                          {standard.Grade}
                        </Text>
                      </View>
                    </TableData>
                  </>
                ) : (
                  <>
                    <TableData className="px-2 flex-[1.5] min-w-[70px] flex items-center justify-center"></TableData>

                    <TableData className="px-2 flex-[1.5] min-w-[70px] flex items-center justify-end">
                      <Input
                        variant="rounded"
                        size="sm"
                        className={`w-[70%] rounded-custom border-${getGradeColor(standard.Grade ?? 0)}`}
                      >
                        <InputField
                          value={standard.Grade?.toString() ?? ''}
                          className={`text-center font-extrabold text-s text-${getGradeColor(standard.Grade ?? 0)}`}
                          onChangeText={(text: string) => handleInputChange(standard.Standard.Id, 'Grade', text)}
                        />
                      </Input>
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
                <TableData className="text-m text-tertiary-0 font-bold text-end px-3 flex-[2] min-w-[90px]">Итого</TableData>
                <TableData className="px-2 flex-[1.5] min-w-[70px]"></TableData>
                <TableData className="text-m text-tertiary-0 font-bold text-center px-2 flex-1 min-w-[70px]">{avgGrade}</TableData>
              </TableRow>
            </View>
            <View className="flex-row justify-between items-center p-4 bg-primary-0/20">
              <CustomButton
                color="blue"
                buttonText="<"
                onPress={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                size='xs'
                classNameText='text-background-1'
              />
              <Text className="text-typography-1 font-medium">{`Страница ${currentPage} из ${totalPages}`}</Text>
              <CustomButton
                buttonText=">"
                color="blue"
                onPress={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                size='xs'
                classNameText='text-background-1'
              />
              <CustomButton
                buttonText="Сохранить"
                color="blue"
                size='xs'
                onPress={() => saveData()}
                classNameText='text-background-1'
              />
            </View>
          </TableFooter>
        </View>
      </Table>
    )
  }
  