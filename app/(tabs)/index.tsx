import { ActionSheetIOS, Text, View } from "react-native";
import { BlueButton } from "@/components/Button";
import React from "react"
import { ActionSheet } from "@/components/ActionSheet";
import { Gender, StandardResponse } from '@/types/types'

const classes = [
  {
    id: 0,
    class_name: "A",
    number: 11,
    recruitment_year: "2020",
  },
  {
    id: 1,
    class_name: "B",
    number: 10,
    recruitment_year: "2021",
  },
  {
    id: 2,
    class_name: "C",
    number: 9,
    recruitment_year: "2022",
  },
  {
    id: 3,
    class_name: "D",
    number: 8,
    recruitment_year: "2023",
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

function getStandardsByClass( class_number: number,  standards : StandardResponse[]) : string[] {
  return standards
  .filter((item) => 
    item.levels.some((level) => level.level_number === class_number)
  )
  .map((item) => item.name);
}

export default function Index() {
  const [showActionsheetStand, setShowActionsheetStand] = React.useState(false)
  const [showActionsheetClasses, setShowActionsheetClasses] = React.useState(false)
  const handleCloseStand = () => setShowActionsheetStand(false)
  const handleCloseClasses = () => setShowActionsheetClasses(false)
  return (
    <View className="bg-background-0 flex-1">
      <View className="w-full flex-row justify-between p-4">
        <BlueButton buttonText="Выбрать класс" onPress={() => setShowActionsheetClasses(true)}/>
        <BlueButton buttonText="Выбрать норматив" onPress={() => setShowActionsheetStand(true)}/>
        <BlueButton isAddFilterIcon/>
        <ActionSheet isStandards standards={getStandardsByClass(10, standards)}  handleClose={handleCloseStand} isOpen={showActionsheetStand} onClose={handleCloseStand}/>
        <ActionSheet isClasses classes={cls} handleClose={handleCloseClasses} isOpen={showActionsheetClasses} onClose={handleCloseClasses}/>
      </View>
    </View>
  );
}
