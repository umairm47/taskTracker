import { useState } from "react"

const AddTask = ({onAdd}) => {
    const [text,setText] = useState('')
    const [day,setDay] = useState('')
    const [reminder,setReminder] = useState(false)
    const onSubmit = (e)=>{
        e.preventDefault()

        if(!text) {
            alert('Please add a task')
        }

        onAdd({text,day,reminder})
        setText('')
        setDay('')
        setReminder(false)

    }




  return (
    <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
            <label>Task</label>
            <input 
            type="text" 
            placeholder="Add Task"
            value={text} 
            //This basically removes the default form behavior and uses react to update- now whenever we update the input field it will trigger the event in the onchange and take the value and place it in the value 
            onChange={(e)=>setText(e.target.value)} />
        </div>
        <div className="form-control">
            <label>Day & time</label>
            <input type="text" 
            placeholder="Add Day & Time" 
            value= {day}
            onChange={(e)=>setDay(e.target.value)}/>
        </div>
        <div className="form-control form-control-check">
            <label>Set Reminder</label>
            <input type="checkbox" 
            checked={reminder}
            value={reminder}
            onChange={(e)=>setReminder(e.currentTarget.checked)}
            />
        </div>
        <input type="submit" value='Save Task' className="btn btn-block"/>
    </form>
  )
}

export default AddTask