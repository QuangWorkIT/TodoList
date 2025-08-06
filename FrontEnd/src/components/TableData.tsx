import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from './ui/button'
import { Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
export interface Task {
  title: string,
  des: string,
  dueDate: string,
  done: boolean
}
interface Props {
  tasks: Task[],
  handleDoneTask: (index: number) => void;
  handleRemove: (index: number) => void;
  handleChange: (index: number, field: 'title' | 'des' | 'dueDate', value: string) => void;
}

function TableData({ tasks, handleDoneTask, handleRemove, handleChange }: Props) {

  return (
    <Table className='text-white'>
      <TableCaption className='mr-20'>To Do List</TableCaption>
      <TableHeader>
        <TableRow className='text-[16px]'>
          <TableHead className='text-white flex gap-2 items-center'>
            <p>Task</p>

            <Tooltip>
              <TooltipTrigger>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.0003 18.3334C14.6027 18.3334 18.3337 14.6025 18.3337 10.0001C18.3337 5.39771 14.6027 1.66675 10.0003 1.66675C5.39795 1.66675 1.66699 5.39771 1.66699 10.0001C1.66699 14.6025 5.39795 18.3334 10.0003 18.3334Z" stroke="white" strokeWidth="1.5" />
                  <path d="M8.4375 7.39603C8.43754 7.1224 8.50943 6.85357 8.64599 6.61645C8.78255 6.37933 8.97899 6.18223 9.21565 6.04487C9.45231 5.90751 9.72089 5.83471 9.99452 5.83375C10.2682 5.83279 10.5372 5.90371 10.7749 6.0394C11.0125 6.1751 11.2103 6.37082 11.3485 6.60698C11.4867 6.84313 11.5605 7.11145 11.5625 7.38508C11.5644 7.6587 11.4945 7.92804 11.3596 8.16615C11.2248 8.40426 11.0298 8.60279 10.7942 8.74186C10.3983 8.97603 10 9.33186 10 9.79186V10.8335" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M10 13.25C10.0459 13.25 10.0838 13.2871 10.084 13.333C10.084 13.379 10.046 13.417 10 13.417C9.95413 13.4168 9.91699 13.3789 9.91699 13.333C9.91717 13.2872 9.95423 13.2502 10 13.25Z" fill="white" stroke="white" strokeWidth="1.5" />
                </svg>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tasks will be saved automatically after 2s</p>
              </TooltipContent>
            </Tooltip>
          </TableHead>
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
                  <input onChange={(e) => handleChange(index, "title", e.target.value)} className={`w-full outline-none py-[5px] ${task.done && "line-through text-green-500"}`} type="text" value={task.title} />
                </TableCell>
                <TableCell className='w-[300px]'>
                  <input onChange={(e) => handleChange(index, "des", e.target.value)} className='w-full outline-none py-[15px]' type="text" value={task.des} />
                </TableCell>
                <TableCell className='w-[200px]'>
                  <input onChange={(e) => handleChange(index, "dueDate", e.target.value)} className='w-full outline-none py-[5px] border-2 border-gray-200 rounded-full p-2' type="date" value={task.dueDate} />
                </TableCell>
                <TableCell className="text-center">
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
