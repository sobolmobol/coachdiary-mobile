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
import { StudentsValueResponse } from '@/types/types'
import { useEffect, useState, useMemo } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { View, ScrollView, Text } from 'react-native'
import { CustomButton } from '@/components/Button'
import { Link } from 'expo-router'

function DiaryTable({
  students,
  standardType,
  onStudentsChange,
  areChosenClaAndSt,
  ...props
}: {
  students: StudentsValueResponse[]
  standardType: string
  onStudentsChange: (updStudents: StudentsValueResponse[]) => void
  areChosenClaAndSt: Boolean
} & React.ComponentProps<typeof Table>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [updatedStudents, setUpdatedStudents] = useState<
    StudentsValueResponse[]
  >([])
  const studentsPerPage = 7
  const totalPages = Math.ceil(updatedStudents.length / studentsPerPage)
  const currentStudents = updatedStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
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
    setUpdatedStudents(
      updatedStudents.map((student) => {
        return student.id === id
          ? {
              ...student,
              [field]: +newValue,
            }
          : student
      })
    )
  }
  function getShortName(fullName: string) {
    return fullName
      .split(' ')
      .map((value, index) => {
        return index === 0 ? value : value[0] + '.'
      })
      .join(' ')
  }
  function getGradeColor(grade: number) {
    if (grade === 5) return 'success-0/80'
    else if (grade === 4) return 'info-0'
    else if (grade === 3) return 'warning-0/70'
    else if (grade === 2) return 'error-0'
    else return 'info-0'
  }

  function saveData() {
    onStudentsChange(updatedStudents)
  }

  useEffect(() => {
    setUpdatedStudents(students)
  }, [students])
  return (
    <Table className="w-full table-auto">
      <TableHeader>
        <TableRow className="bg-primary-0/20 border-primary-0/50">
          <TableHead className="text-typography-1 text-xs text-start px-1 py-2 flex-1 min-w-[50px]">
            Класс
          </TableHead>
          <TableHead className="text-typography-1 text-xs text-start px-1 py-2 flex-[2] min-w-[100px]">
            ФИО
          </TableHead>
          <TableHead className="text-xs text-left font-bold text-typography-2 px-1 py-2 flex-1 min-w-[30px]">
            Пол
          </TableHead>
          {standardType === 'physical' && (
            <TableHead className="text-typography-1 text-xs text-center px-1 py-2 flex-[1.5] min-w-[70px]">
              Результат
            </TableHead>
          )}
          <TableHead className="text-typography-1 text-xs text-center px-1 py-2 flex-1 min-w-[50px]">
            Оценка
          </TableHead>
        </TableRow>
      </TableHeader>

      <ScrollView className="w-full max-h-90">
        <TableBody>
          {currentStudents.length === 0 ? (
            areChosenClaAndSt ? (
              <>
                <TableRow key={0}>
                  <TableData className="text-xs font-bold text-center text-typography-1 py-2 px-1 flex-1 min-w-[50px]">
                    В этом классе ученики пока не зафиксированы
                  </TableData>
                </TableRow>
              </>
            ) : (
              <>
                <TableRow key={0}>
                  <TableData className="text-xs font-bold text-center text-typography-1 py-2 px-1 flex-1 min-w-[50px]">
                    Выберите норматив и класс, чтобы тут появились оценки
                  </TableData>
                </TableRow>
              </>
            )
          ) : (
            currentStudents.map((student, index) => (
              <TableRow
                key={student.id}
                className={`border-primary-0/50 flex flex-row ${index % 2 === 0 ? 'bg-background-1' : 'bg-primary-0/20'}`}
              >
                <TableData className="text-xs font-bold text-center text-typography-1 py-2 px-1 flex-1 min-w-[50px]">
                  {`${student.student_class.number}${student.student_class.class_name}`}
                </TableData>

                <TableData className="text-xs font-bold text-start text-typography-1 underline py-2 px-1 flex-[2] min-w-[100px]">
                  <Link
                    href={{
                      pathname: '/student/[id]',
                      params: { id: student.id },
                    }}
                  >
                    {getShortName(student.full_name)}
                  </Link>
                </TableData>

                <TableData className="text-xs font-bold text-center text-typography-1 py-2 px-2 flex-1 min-w-[30px]">
                  {student.gender === 'f' ? 'Ж' : 'М'}
                </TableData>

                {standardType === 'physical' ? (
                  <>
                    <TableData className="py-2 px-1 flex-[1.5] min-w-[70px]">
                      <Input
                        variant="rounded"
                        size="sm"
                        className="rounded-custom w-[70%]"
                      >
                        <InputField
                          className="text-s text-center font-extrabold text-typography-1"
                          value={student.average_value?.toString() ?? ''}
                          onChangeText={(text: string) =>
                            handleInputChange(student.id, 'value', text)
                          }
                        />
                      </Input>
                    </TableData>

                    <TableData className="py-2 px-1 flex-1 min-w-[40px]">
                      <View
                        className={`bg-${getGradeColor(student.average_grade ?? 0)} w-7 h-7 rounded-custom items-center justify-center`}
                      >
                        <Text className="text-background-1 text-s font-extrabold text-center">
                          {student.average_grade}
                        </Text>
                      </View>
                    </TableData>
                  </>
                ) : (
                  <TableData className="py-2 px-1 flex-[1.5] min-w-[70px]">
                    <Input
                      variant="rounded"
                      size="sm"
                      className={`w-[70%] rounded-custom border-${getGradeColor(student.average_grade ?? 0)} `}
                    >
                      <InputField
                        className={`text-center font-extrabold text-s text-${getGradeColor(student.average_grade ?? 0)}`}
                        value={student.average_grade?.toString() ?? ''}
                        onChangeText={(text: string) =>
                          handleInputChange(student.id, 'grade', text)
                        }
                      />
                    </Input>
                  </TableData>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </ScrollView>
      <View className="w-full h-2">
        <TableFooter>
          <View className="flex-row justify-between items-center p-4 bg-primary-0/20">
            <CustomButton
              color="blue"
              buttonText="<"
              onPress={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              size="xs"
            />
            <Text className="text-typography-1 font-medium">{`Страница ${currentPage} из ${totalPages}`}</Text>
            <CustomButton
              buttonText=">"
              color="blue"
              onPress={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              size="xs"
            />
            <CustomButton
              buttonText="Сохранить"
              color="blue"
              size="xs"
              onPress={() => saveData()}
              classNameText="text-background-1"
            />
          </View>
        </TableFooter>
      </View>
    </Table>
  )
}
export { DiaryTable }
