import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import Form from './components/Form'
import TableData from './components/TableData'
import { type Task } from './components/TableData'
import './style/input.css'


function App() {
  const [isAdd, setAdd] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const isInit = useRef(true)
  const url = import.meta.env.VITE_BACKEND_URL
  // fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      await fetch(`${url}/tasks`, {
        method: "GET"
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          setTasks(data)
        })
        .catch((error) => {
          console.log('Error fetching tasks ', error)
        })
    }

    fetchTasks()
  }, [])

  // save tasks
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const saveTasks = tasks.filter(task => !task.done)
      handleSave(saveTasks)
    }, 2000)

    return () => clearTimeout(timeoutId)
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

  const handleSave = async (saveTasks: Task[]) => {
    if (isInit.current) {
      isInit.current = false
      return
    }
    console.log('tasks to save ', tasks)
    setIsSaving(true)
    await fetch(`${url}/tasks`, {
      method: "POST",
      body: JSON.stringify({
        tasks: saveTasks
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(async (response) => {
        console.log('save task success ', await response.json())
      })
      .catch(error => console.log('Error save task ', error))
      .finally(() => setTimeout(() => {
        setIsSaving(false)
      }, 1000))
  }

  return (
    <div className="bg-black relative flex flex-col items-center min-h-screen">
      <Form onAddTask={onAddTask} isAdd={isAdd}></Form>
      <Button
        className={`mb-[15px] transition-all transition duration-300 
        ease-in-out ${!isAdd ? "opacity-100" : "opacity-0"}`}
        type='button'
        variant="destructive"
        onClick={() => setAdd(true)}>
        Add new task
      </Button>

      {
        <div className={`italic text-red-200 transition-opacity duration-1000 ease-in-out
         ${isSaving ? "opacity-100" : "opacity-0"}`}>
          Saving tasks...
        </div>
      }

      <div className="ml-20 mb-[15px]">
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
