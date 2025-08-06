import { type Task } from './TableData'
import { type FormEvent } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Label } from '@radix-ui/react-label'

interface Props {
    onAddTask: (task: Task) => void;
    isAdd: boolean;
}

function Form({ onAddTask, isAdd }: Props) {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const title = formData.get("title") as string || ""
        const des = formData.get("des") as string || ""
        const dueDate = formData.get("date") as string || ""

        if (!title || !des || !dueDate) {
            console.error('Invalid task')
            return
        }
        const task: Task = {
            title: title,
            des: des,
            dueDate: dueDate,
            done: false
        }
        onAddTask(task)
        e.currentTarget.reset()
    }
    return (
        <form onSubmit={handleSubmit} className={`mt-[15px] text-white w-[250px] h-max  flex flex-col gap-[20px] transition-all transition duration-200  ease transform
          ${isAdd ? "opacity-100 " : "opacity-0 -translate-y-50"}`}>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="title">Title</Label>
                <Input type="text" name="title" id="title" placeholder="Type task title" />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="duedate">Due date</Label>
                <Input type="date" name="date" id="duedate" />
            </div>

            <div className="grid w-full gap-1.5">
                <Label htmlFor="message">Description</Label>
                <Textarea name="des" placeholder="Type your description here." id="message" />
            </div>

            <div className="flex w-full justify-center">
                <Button type='submit' variant="destructive">Add task</Button>
            </div>
        </form>
    )
}

export default Form
