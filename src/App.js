import {useState, useEffect} from 'react';
//useEffect is used when we want something to happen when the page loads - will be used to fetch the data from the server on page load
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from './components/AddTask';


const App = () => {
  const [showAddTask, setShowAddTask]=useState(false)

  //placing the usestate here allows us to pass all of this down to the childrens like header and tasks
  const [tasks,setTasks] = useState([])

  useEffect(()=>{
    const getTasks = async () =>{
      const tasksFromServer = await 
      fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])
  const fetchTasks = async ()=>{
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  const fetchTask = async (id)=>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }
//Heirarchy of folders - APP is parent then its TASKS that has all the tasks then TASK is the individual task 
//Add Task
const addTask = async (task) =>{
 
  const res =
  await fetch(`http://localhost:5000/tasks/`, {
    method: 'POST',
    headers: {
      'Content-type':'application/json'
    },
    body: JSON.stringify(task)

  })
  //the reason we use tasks is because thats what the array is called in db.json
  const data = await res.json()
  setTasks([...tasks,data])
  // const id = Math.floor(Math.random() * 1000) +1
  
  // //takes the task we just made when we submitted the form and adding id to the object and saves it to the variable newTask

  // const newTask = {id, ...task}
 
  // //takes the existing task list and then adds the newtask to it.
  // setTasks({...tasks,newTask})
}

//Delete Task

const deleteTask = async (id)=>{
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE',

  })
  setTasks(tasks.filter((task)=> task.id !== id))
}
//Toggle Reminder
const toggleReminder = async (id)=>{
  //grabbing a singular task and assigning it to tasktoToggle variable 
  const taskToToggle = await fetchTask(id)
  //here we are flipping the value of the toggle
  const updTask = {...taskToToggle,reminder: !taskToToggle.reminder}

  const res = await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updTask)
  })
  const data = await res.json()

  setTasks(tasks.map((task)=> 
  task.id === id? {...task,reminder:
     data.reminder}:task))
}

//below onAdd is a prop that is being passed down to the children which is AddTask component
//likewise for Tasks component we are passing down the props tasks, ondelete, and onToggle which would run the functions in the App.js file when the conditions are met in the child component - basically the child have access to its parents functions and can use them once we pass them down as props

//the line {showAddTask && <AddTask onAdd={addTask}/>} is a shorter way of doing a ternary because we dont want it to do anything if showAddTask is false so 
  return (
    <div className="container">
      <Header onAdd={()=>setShowAddTask(!showAddTask)} 
      showAdd = {showAddTask}/>
      
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length >0 ? <Tasks tasks={tasks} onDelete = {deleteTask} onToggle = {toggleReminder}/>:'No Tasks'}

    </div>
  );
}

export default App;
