import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableData,
  } from "@/components/ui/table"
  import { Input, InputField } from "@/components/ui/input"
  import { StudentsValueResponse } from "@/types/types"
  import React from "react"
  import Ionicons from '@expo/vector-icons/Ionicons';
  import { View, ScrollView, Text } from "react-native"
  import { CustomButton } from "@/components/Button";
  
  function getShortName(fullName : string){
    return fullName.split(" ").map((value, index) => {
      return index === 0 ? value : value[0]+'.'
    }).join(" ");
  };
  function getGradeColor(grade: number){
    if(grade == 5) return 'success-0'
    else if(grade == 4) return 'info-1'
    else if(grade == 3) return 'warning-0'
    else if(grade == 2) return 'error-0'
    else return 'info-0'
  }
  function CustomTable(
    { students,
      standardType,
      ...props
    } : {
      students : StudentsValueResponse[],
      standardType : string
    }& React.ComponentProps<typeof Table>
  ) 
  {
  const [currentPage, setCurrentPage] = React.useState(1);
  const studentsPerPage = 8;

  const totalPages = Math.ceil(students.length / studentsPerPage);

  const currentStudents = students.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  ); 
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  console.log(getGradeColor(4))
    return (
      <Table className="w-full table-fixed">
        <TableHeader >
          <TableRow className="bg-tertiary-0/50 border-background-0">
            <TableHead className="text-typography-1">ФИО</TableHead>
            <TableHead className="text-typography-1">Класс</TableHead>
            <TableHead className="text-typography-1">Пол</TableHead>
            {standardType === "physical" ? <TableHead className="text-typography-1">Результат</TableHead> : null}
            <TableHead className="text-typography-1">Оценка</TableHead>
          </TableRow>
        </TableHeader>
        <ScrollView className="w-full max-h-85">
          <TableBody>
          {currentStudents.map((student, index) => {
            return (
              <TableRow className={`border-background-0 ${index%2!=0 ? 'bg-tertiary-0/40' : ''}`} key={student.id}>
                <TableData className="font-bold text-typography-1 whitespace-nowrap">{getShortName(student.full_name)}</TableData>
                <TableData className="font-bold text-typography-1">{`${student.student_class.number}${student.student_class.class_name}`}</TableData>
                <TableData className="font-bold text-typography-1" >{student.gender === "f" ? "Ж" : "М"}</TableData>
                {standardType === "physical" ? 
                  <><TableData useRNView>
                    <Input variant="rounded" className="rounded-custom" size="sm">
                      <InputField className="text-s text-center font-extrabold text-typography-1" value={student.value ? student.value.toString() : ""} />
                    </Input>
                  </TableData>
                  <TableData useRNView> 
                    <View className={`bg-${getGradeColor(student.grade==null ? 0 : student.grade)} w-7 h-7 rounded-custom`}>
                      <Text className="text-typography-0 text-s text-center font-extrabold">{student.grade}</Text> 
                    </View>
                  </TableData></> :               
                  <TableData useRNView>
                    <Input variant="rounded" className={`rounded-custom border-${getGradeColor(student.grade==null ? 0 : student.grade)}`}  size="sm">
                      <InputField value={student.grade ? student.grade.toString() : ""} className={`text-center font-extrabold text-${getGradeColor(student.grade==null ? 0 : student.grade)} text-s`}/>
                    </Input>
                  </TableData>
                }
              </TableRow>
            );
          })}
          </TableBody>   
        </ScrollView>
        <View className="w-full h-2 " >
          <TableFooter>
            <View className="flex-row justify-between items-center p-4">
              <CustomButton color="blue" buttonText="<" onPress={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
              <Text className="text-typography-1 font-medium">{`Страница ${currentPage} из ${totalPages}`}</Text>
              <CustomButton buttonText=">" color="blue" onPress={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            </View>
          </TableFooter>
        </View>
      </Table>
    )
  }
  export {CustomTable}