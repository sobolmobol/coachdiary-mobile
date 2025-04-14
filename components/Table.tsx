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
    if(grade === 5) return 'success-0'
    else if(grade === 4) return 'info-0'
    else if(grade === 3) return 'warning-0'
    else if(grade === 2) return 'error-0'
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
  const studentsPerPage = 7;

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
    return (
      <Table className="w-full table-auto">
        <TableHeader>
          <TableRow className="bg-tertiary-0/30 border-0">
            <TableHead className="text-typography-1 text-xs text-end pl-3 pr-3" >Класс</TableHead>
            <TableHead className="text-typography-1 text-xs px-0" >ФИО</TableHead>
            <TableHead className="text-typography-1 text-xs text-center px-0" >Пол</TableHead>
            {standardType === "physical" ? <TableHead className="text-typography-1 text-xs text-center px-0" style={{minWidth:70}}>Результат</TableHead> : null}
            <TableHead className="text-typography-1 text-xs text-start pr-1 pl-0" >Оценка</TableHead>
          </TableRow>
        </TableHeader>
        <ScrollView className="w-full max-h-90">
          <TableBody>
          {currentStudents.map((student, index) => {
            return (
              <TableRow className={`border-0 ${index%2==0 ? 'bg-background-1' : 'bg-tertiary-0/30'}`} key={student.id}>
                <TableData className="font-bold text-typography-1 text-xs text-end px-0 pl-3 pr-0" >{`${student.student_class.number}${student.student_class.class_name}`}</TableData>
                <TableData className="font-bold text-typography-1 text-xs text-start px-0" >{getShortName(student.full_name)}</TableData>
                <TableData className="font-bold text-typography-1 text-xs text-center px-0" >{student.gender === "f" ? "Ж" : "М"}</TableData>
                {standardType === "physical" ? 
                  <><TableData useRNView className="px-0">
                    <Input variant="rounded" className="rounded-custom w-[70%]" size="sm">
                      <InputField className="text-s text-center font-extrabold text-typography-1" value={student.value ? student.value.toString() : ""} />
                    </Input>
                  </TableData>
                  <TableData useRNView className="pr-1 pl-0 flex items-center"> 
                    <View className={`bg-${getGradeColor(student.grade==null ? 0 : student.grade)} w-7 h-7 rounded-custom`}>
                      <Text className="text-background-1 text-s text-center font-extrabold">{student.grade}</Text> 
                    </View>
                  </TableData></> :               
                  <TableData useRNView className="pr-1 pl-0">
                    <Input variant="rounded" className={`w-[70%] rounded-custom border-${getGradeColor(student.grade==null ? 0 : student.grade)}`}  size="sm">
                      <InputField value={student.grade ? student.grade.toString() : ""} className={`text-center font-extrabold text-s text-${getGradeColor(student.grade==null ? 0 : student.grade)}`}/>
                    </Input>
                  </TableData>
                }
              </TableRow>
            );
          })}
          </TableBody>   
        </ScrollView>
        <View className="w-full h-2" >
          <TableFooter>
            <View className="flex-row justify-between items-center p-4 bg-tertiary-0/30 shadow-md">
              <CustomButton color="orange" buttonText="<" onPress={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
              <Text className="text-typography-1 font-medium">{`Страница ${currentPage} из ${totalPages}`}</Text>
              <CustomButton buttonText=">" color="orange" onPress={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            </View>
          </TableFooter>
        </View>
      </Table>
    )
  }
  export {CustomTable}