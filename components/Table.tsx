import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableData,
  } from "@/components/ui/table"
  
  function TableDiary() {
    return (
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Класс</TableHead>
            <TableHead>ФИО</TableHead>
            <TableHead>Пол</TableHead>
            <TableHead>Результат</TableHead>
            <TableHead>Оценка</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableData>Rajesh Kumar</TableData>
            <TableData>10</TableData>
            <TableData>$130</TableData>
            <TableData>$130</TableData>
            <TableData>$130</TableData>
          </TableRow>
          <TableRow>
            <TableData>Priya Sharma</TableData>
            <TableData>12</TableData>
            <TableData>$210</TableData>
            <TableData>$210</TableData>
            <TableData>$210</TableData>
          </TableRow>
          <TableRow>
            <TableData>Ravi Patel</TableData>
            <TableData>6</TableData>
            <TableData>$55</TableData>
            <TableData>$210</TableData>
            <TableData>$210</TableData>
          </TableRow>
          <TableRow>
            <TableData>Ananya Gupta</TableData>
            <TableData>18</TableData>
            <TableData>$340</TableData>
            <TableData>$210</TableData>
            <TableData>$210</TableData>
          </TableRow>
          <TableRow>
            <TableData>Arjun Singh</TableData>
            <TableData>2</TableData>
            <TableData>$35</TableData>
            <TableData>$210</TableData>
            <TableData>$210</TableData>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableHead>Total</TableHead>
            <TableHead>48</TableHead>
            <TableHead>$770</TableHead>
            <TableData>$210</TableData>
            <TableData>$210</TableData>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
  export {TableDiary}