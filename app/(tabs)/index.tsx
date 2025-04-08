import { ActionSheetIOS, Text, View, ScrollView } from "react-native";
import { CustomButton } from "@/components/Button";
import React from "react"
import { ActionSheet } from "@/components/ActionSheet";
import { Gender, StandardResponse, StudentsValueResponse } from '@/types/types'
import { CustomTable} from "@/components/Table";
const students: StudentsValueResponse[] = [
  {
    id: 1,
    full_name: "Иванов Иван Сергеевич",
    student_class: { number: 10, class_name: "A" },
    birthday: "2007-04-05",
    gender: "m",
    value: 85,
    grade: 5,
  },
  {
    id: 2,
    full_name: "Петрова Мария Алексеевна",
    student_class: { number: 11, class_name: "B" },
    birthday: "2006-06-15",
    gender: "f",
    value: null,
    grade: 4,
  },
  {
    id: 3,
    full_name: "Смирнов Алексей Викторович",
    student_class: { number: 9, class_name: "C" },
    birthday: "2008-02-20",
    gender: "m",
    value: 75,
    grade: 4,
  },
  {
    id: 4,
    full_name: "Сидорова Екатерина Ивановна",
    student_class: { number: 8, class_name: "D" },
    birthday: "2009-11-10",
    gender: "f",
    value: null,
    grade: 3,
  },
  {
    id: 5,
    full_name: "Кузнецов Дмитрий Олегович",
    student_class: { number: 10, class_name: "A" },
    birthday: "2007-08-25",
    gender: "m",
    value: 90,
    grade: 5,
  },
  {
    id: 6,
    full_name: "Попова Анна Сергеевна",
    student_class: { number: 11, class_name: "B" },
    birthday: "2006-03-12",
    gender: "f",
    value: null,
    grade: 4,
  },
  {
    id: 7,
    full_name: "Васильев Максим Дмитриевич",
    student_class: { number: 9, class_name: "C" },
    birthday: "2008-07-30",
    gender: "m",
    value: 80,
    grade: 5,
  },
  {
    id: 8,
    full_name: "Николаева Ольга Александровна",
    student_class: { number: 8, class_name: "D" },
    birthday: "2009-01-18",
    gender: "f",
    value: null,
    grade: 3,
  },
  {
    id: 9,
    full_name: "Морозов Сергей Владимирович",
    student_class: { number: 10, class_name: "A" },
    birthday: "2007-05-05",
    gender: "m",
    value: 70,
    grade: 4,
  },
  {
    id: 10,
    full_name: "Федорова Елена Николаевна",
    student_class: { number: 11, class_name: "B" },
    birthday: "2006-09-22",
    gender: "f",
    value: null,
    grade: 4,
  },
  {
    id: 11,
    full_name: "Павлов Игорь Андреевич",
    student_class: { number: 9, class_name: "C" },
    birthday: "2008-04-14",
    gender: "m",
    value: 65,
    grade: 3,
  },
  {
    id: 12,
    full_name: "Киселева Татьяна Владимировна",
    student_class: { number: 8, class_name: "D" },
    birthday: "2009-12-05",
    gender: "f",
    value: null,
    grade: 3,
  },
  {
    id: 13,
    full_name: "Романов Владимир Сергеевич",
    student_class: { number: 10, class_name: "A" },
    birthday: "2007-03-10",
    gender: "m",
    value: 88,
    grade: 5,
  },
  {
    id: 14,
    full_name: "Григорьева Светлана Алексеевна",
    student_class: { number: 11, class_name: "B" },
    birthday: "2006-07-19",
    gender: "f",
    value: null,
    grade: 4,
  },
  {
    id: 15,
    full_name: "Лебедев Артем Викторович",
    student_class: { number: 9, class_name: "C" },
    birthday: "2008-10-03",
    gender: "m",
    value: 78,
    grade: 4,
  },
  {
    id: 16,
    full_name: "Соболева Виктория Сергеевна",
    student_class: { number: 8, class_name: "D" },
    birthday: "2009-06-28",
    gender: "f",
    value: null,
    grade: 3,
  },
  {
    id: 17,
    full_name: "Орлов Константин Иванович",
    student_class: { number: 10, class_name: "A" },
    birthday: "2007-11-11",
    gender: "m",
    value: 85,
    grade: 5,
  },
  {
    id: 18,
    full_name: "Зайцева Алина Евгеньевна",
    student_class: { number: 11, class_name: "B" },
    birthday: "2006-02-08",
    gender: "f",
    value: null,
    grade: 4,
  },
  {
    id: 19,
    full_name: "Тихонов Роман Евгеньевич",
    student_class: { number: 9, class_name: "C" },
    birthday: "2008-09-09",
    gender: "m",
    value: 72,
    grade: 2,
  },
  {
    id: 20,
    full_name: "Белова Евгения Евгеньевна",
    student_class: { number: 8, class_name: "D" },
    birthday: "2009-05-15",
    gender: "f",
    value: null,
    grade: 3,
  },
];
const standards: StandardResponse[] = [
  {
    id: 1,
    name: "Example1",
    has_numeric_value: true,
    levels: [
      {
        id: 101,
        level_number: 10,
        low_level_value: 20,
        middle_level_value: 50,
        high_level_value: 80,
        gender: "m",
      },
      {
        id: 102,
        level_number: 11,
        low_level_value: 25,
        middle_level_value: 55,
        high_level_value: 85,
        gender: "f",
      },
    ],
  },
  {
    id: 2,
    name: "Example2",
    has_numeric_value: false,
    levels: [
      {
        id: 201,
        level_number: 9,
        low_level_value: 15,
        middle_level_value: 45,
        high_level_value: 75,
        gender: "f",
      },
      {
        id: 202,
        level_number: 10,
        low_level_value: 22,
        middle_level_value: 52,
        high_level_value: 82,
        gender: "m",
      },
    ],
  },
  {
    id: 3,
    name: "Example3",
    has_numeric_value: true,
    levels: [
      {
        id: 301,
        level_number: 12,
        low_level_value: 10,
        middle_level_value: 40,
        high_level_value: 70,
        gender: "m",
      },
      {
        id: 302,
        level_number: 11,
        low_level_value: 18,
        middle_level_value: 48,
        high_level_value: 78,
        gender: "f",
      },
    ],
  },
  {
    id: 4,
    name: "Example4",
    has_numeric_value: false,
    levels: [
      {
        id: 401,
        level_number: 8,
        low_level_value: 12,
        middle_level_value: 42,
        high_level_value: 72,
        gender: "f",
      },
      {
        id: 402,
        level_number: 9,
        low_level_value: 14,
        middle_level_value: 44,
        high_level_value: 74,
        gender: "m",
      },
    ],
  },
  {
    id: 5,
    name: "Example5",
    has_numeric_value: true,
    levels: [
      {
        id: 501,
        level_number: 10,
        low_level_value: 20,
        middle_level_value: 50,
        high_level_value: 80,
        gender: "m",
      },
      {
        id: 502,
        level_number: 12,
        low_level_value: 26,
        middle_level_value: 56,
        high_level_value: 86,
        gender: "f",
      },
    ],
  },
];

const cls = [
  {
    id: 1,
    number: 9,
    class_name : ['a', 'b', 'c']
  },
  {
    id: 2,
    number: 10,
    class_name : ['a', 'b', 'c']
  },
  {
    id: 3,
    number: 11,
    class_name : ['a', 'b', 'c']
  }
]

function getStandardsByClass(class_number: number, standards: StandardResponse[]): { id: number; standard: string }[] {
  return class_number !== -1 ? standards
    .filter((item) =>
      item.levels.some((level) => level.level_number === class_number)
    )
    .map((item) => ({
      id: item.id,
      standard: item.name,
    })) : [];
}

export default function Index() {

  const [selectedClass, setSelectedClass] = React.useState<{ class_number: number; class_letter: string }>({
    class_letter: "",
    class_number: -1,
  });
  const [selectedStandard, setSelectedStandard] = React.useState<{ id: number; standard: string }>({
    id: -1,
    standard: "",
  });
  const [showActionsheetStand, setShowActionsheetStand] = React.useState(false)
  const [showActionsheetClasses, setShowActionsheetClasses] = React.useState(false)
  const [showActionsheetFilters, setShowActionsheetFilters] = React.useState(false)
  const [standardType, setStandardType] = React.useState("")

  const handleCloseStand = () => setShowActionsheetStand(false)
  const handleCloseClasses: () => void = () => setShowActionsheetClasses(false)
  const handleCloseFilters = () => setShowActionsheetFilters(false)

  React.useEffect(() => {
    setStandardType(() => {
      return standards.find((standard) => standard.id === selectedStandard.id)?.has_numeric_value
        ? "physical"
        : "technical";
    });
  }, [selectedStandard]);
  return (
    <View className="bg-background-0 flex-1">
      <View className="w-full flex-row justify-between p-4">
        <CustomButton 
          color={selectedClass.class_letter=="" ? "blue" : "orange"} 
          buttonText={selectedClass.class_letter=="" ? "Выбрать класс" : `${selectedClass.class_number}${selectedClass.class_letter}`} 
          onPress={() => {
              setSelectedClass({
                class_letter: "",
                class_number: -1
              })
              setShowActionsheetClasses(true);
            }}/>
        <CustomButton
          color={selectedStandard.id == -1 ? "blue" : "orange"}
          buttonText={selectedStandard.id == -1 ? "Выбрать норматив" : selectedStandard.standard.toUpperCase()} 
          onPress={() => {
            setSelectedStandard({
              id: -1,
              standard: ""
            })
            setShowActionsheetStand(true);
          }}/>
        <CustomButton 
          color="blue" 
          isAddFilterIcon
          onPress={() => setShowActionsheetFilters(true)}/>
        <ActionSheet 
          isStandards 
          selectedStandard={selectedStandard}
          setSelectedStandard={setSelectedStandard}
          standards={getStandardsByClass(selectedClass.class_number, standards)}  
          handleClose={handleCloseStand} 
          isOpen={showActionsheetStand} 
          onClose={handleCloseStand}/>
        <ActionSheet 
          isClasses 
          classes={cls} 
          handleClose={handleCloseClasses} 
          isOpen={showActionsheetClasses} 
          onClose={handleCloseClasses} 
          selectedClass={selectedClass} 
          setSelectedClass={setSelectedClass}/>
        <ActionSheet 
          isFilter
          handleClose={handleCloseFilters} 
          isOpen={showActionsheetFilters} 
          onClose={handleCloseFilters} />
      </View>
      <View className="w-full">
        <CustomTable 
          standardType={standardType}
          students={selectedStandard.id === -1 ? [] : students}/>
      </View>
      <View></View>
    </View>
  );
}
