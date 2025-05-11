import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Form from './components/Form'
import TableData from './components/TableData'
import { type Task } from './components/TableData'
import './style/input.css'


function App() {
  const [isAdd, setAdd] = useState(false)
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('tasks')
    return storedTasks ? JSON.parse(storedTasks) : []
  })

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks.filter(task => !task.done)))
  }, [tasks])

  const onAddTask = (task: Task) => {
    setTasks((prev) => [...prev, task])
    setAdd(false)
  }

  const handleRemove = (index: number) => {
    const removeTasks = [...tasks]
    removeTasks.splice(index, 1)
    setTasks(removeTasks)
  }

  const handleDoneTask = (index: number) => {
    const doneTasks = [...tasks]
    doneTasks[index].done = !doneTasks[index].done
    setTasks(doneTasks)
  }

  const handleOnChange = (index: number, field: 'title' | 'des' | 'dueDate', value: string) => {
    const updateTasks = [...tasks]
    updateTasks[index][field] = value
    setTasks(updateTasks)
  }
  return (
    <div className="bg-black relative flex flex-col items-center min-h-screen">
      <Form onAddTask={onAddTask} isAdd={isAdd}></Form>
      <Button className={`mb-[15px] transition-all transition duration-300 ease-in-out ${!isAdd ? "opacity-100" : "opacity-0"}`} type='button' variant="destructive" onClick={() => setAdd(true)}>Add new task</Button>

      <div className="w-[600px] mb-[15px]">
        <TableData
          tasks={tasks}
          handleDoneTask={handleDoneTask}
          handleRemove={handleRemove}
          handleChange={handleOnChange}
        >
        </TableData>
      </div>
    </div>
  )
}

export default App
