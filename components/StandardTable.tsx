import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableData,
  } from '@/components/ui/table'
  import { View, ScrollView, Text } from 'react-native'

  export default function StandardTable({
    standards,
    ...props
  }: {
    standards: Record<string, number | string>
  } & React.ComponentProps<typeof Table>) {

    return (
      <Table className="w-full table-auto">
        <TableHeader>
          <TableRow className="bg-primary-0/20 border-primary-0/50">
            <TableHead className="text-typography-1 text-xs">
              Ступень
            </TableHead>
            <TableHead className="text-typography-1 text-xs">
              Норма
            </TableHead>
          </TableRow>
        </TableHeader>
        <ScrollView className="w-full max-h-90">
          <TableBody>
              <TableRow
                key={1}
                className={`flex border-primary-0/50 flex-row bg-background-1`}
              >
                <TableData className="font-bold text-typography-1 text-xs">Высокая</TableData>
                <TableData className="font-bold text-typography-1 text-xs">{standards.highValue}</TableData>
              </TableRow>
              <TableRow
                key={2}
                className={`flex border-primary-0/50 flex-row bg-primary-0/20`}
              >
                <TableData className="font-bold text-typography-1 text-xs">Средняя</TableData>
                <TableData className="font-bold text-typography-1 text-xs">{standards.middleValue}</TableData>
              </TableRow>
              <TableRow
                key={3}
                className={`flex border-primary-0/50 flex-row bg-background-1`}
              >
                <TableData className="font-bold text-typography-1 text-xs">Низкая</TableData>
                <TableData className="font-bold text-typography-1 text-xs">{standards.lowValue}</TableData>
              </TableRow>
          </TableBody>
        </ScrollView>
      </Table>
    )
  }
  