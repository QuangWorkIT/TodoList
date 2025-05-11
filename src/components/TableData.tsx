import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from './ui/button'
import { Trash2 } from "lucide-react";

export interface Task {
  title: string,
  des: string,
  dueDate: string,
  done: boolean
}
interface Props {
  tasks: Task[],
  handleDoneTask: (index:number) => void;
  handleRemove: (index:number) => void;
  handleChange: (index: number,  field: 'title' | 'des' | 'dueDate', value: string) => void;
}

function TableData({ tasks,handleDoneTask, handleRemove, handleChange}: Props) {

  return (
    <Table className='text-white'>
      <TableCaption>To Do List</TableCaption>
      <TableHeader>
        <TableRow className='text-[16px]'>
          <TableHead className='text-white'>Task</TableHead>
          <TableHead className='text-white'>Description</TableHead>
          <TableHead className='text-white'>Due date</TableHead>
          <TableHead className='text-green-400 text-center'>Done</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          tasks != null && tasks.map((task, index) => {
            return (
              <TableRow key={index}>
                <TableCell className="font-medium line-through">
                  <input onChange={(e) => handleChange(index, "title", e.target.value)} className= {`w-full outline-none py-[5px] ${task.done && "line-through text-green-500"}`} type="text" value={task.title} />
                </TableCell>
                <TableCell>
                  <input onChange={(e) => handleChange(index, "des", e.target.value)} className='w-full outline-none py-[15px]' type="text" value={task.des} />
                </TableCell>
                <TableCell className='w-[100px]'>
                  <input onChange={(e) => handleChange(index, "dueDate", e.target.value)} className='w-full outline-none py-[5px]' type="text" value={task.dueDate} />
                </TableCell>
                <TableCell  className="text-center">
                  <Checkbox onClick={() => handleDoneTask(index)}></Checkbox>
                </TableCell>
                <TableCell>
                  <Button className='bg-red-500' variant="ghost" onClick={() => handleRemove(index)}>
                    <Trash2></Trash2>
                  </Button>
                </TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  )
}

export default TableData
