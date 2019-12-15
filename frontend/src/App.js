import React, { useState, Fragment, useEffect } from 'react'
import axios from 'axios';

//COMPONENTS
import './App.css';
import NavigationBar from './layout/NavigationBar';
import ToDoLists from './components/ToDoListComponent/list'


import CreateTask from './components/CreateTask'
import TaskCategories from './components/TasksCategories'

const App = () => {

  const [Tasks, setTasks] = useState([])
  const [groupedTasksByCategory, setGroupedTasksByCategory] = useState([])


  axios.defaults.headers.common['Authorization'] = 'XYZ';

  useEffect(() => {
    axios.get(`http://localhost:4000/Tasks`)
      .then(res => {
        console.log(res.data);
        setTasks([...res.data]);
      })

    axios.get(`http://localhost:4000/reports/categories/tasks`)
      .then(res => {
        console.log(res.data);
        setGroupedTasksByCategory([...res.data]);
      })
  }, []);

  const addTask = Task => {
    const task = {
      name: Task.name,
      endDate: Task.endDate,
      categoryId: parseInt(Task.categoryId),
      done: false
    }
    axios.post(`http://localhost:4000/Tasks`, task)
      .then(res => {
        setTasks([...Tasks, res.data])
      })
  }

  const editTask = Task => {
    const task = {
      name: Task.name,
      endDate: Task.endDate,
      done: Task.done
    }
    axios.put(`http://localhost:4000/Tasks/${Task.id}`, Task)
      .then(res => {
        setTasks([...Tasks.filter(m => m.id != Task.id), res.data])
        setEditing(false)
      })
  }

  const deleteTask = (id) => {
    axios.delete(`http://localhost:4000/Tasks/${id}`)
      .then(() => {
        setTasks(Tasks.filter(m => m.id != id))
      })
  }


  const tasks = [
    { name: 'task1', isComplete: false },
    { name: 'task2', isComplete: true },
    { name: 'task3', isComplete: false },
  ]

  const editRow = Task => {
    setEditing(true)
    setEditedTask(Task)
  }

  const [editing, setEditing] = useState(false)
  const [editedTask, setEditedTask] = useState({ name: '', year: '' })

  return (
    <div className="App">
      <NavigationBar></NavigationBar>
      <CreateTask
        saveTask={addTask.bind(this)}
      ></CreateTask>
      <ToDoLists
        // editMode={this.state.isEditing}
        // taskList={this.state.tasks}
        deleteTask={deleteTask.bind(this)}
        editTask={editTask.bind(this)}
        // toggleTask={this.toggleTask.bind(this)}
        taskList={Tasks}>
      </ToDoLists>
      <TaskCategories groupedTasksByCategory={groupedTasksByCategory}></TaskCategories>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <div>
      </div>
    </div>
  );
}
export default App;



/* <header className="App-header">
<AppBar position="static">
  <Toolbar variant="dense">
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" color="inherit">
      Photos
</Typography>
  </Toolbar>
</AppBar>
</header>
<main>
{editing ?
  <Fragment>
    <TaskFormEdit editedTask={editedTask} editing={editing} setEditing={setEditing} editTask={editTask} />
  </Fragment>
  : <TaskFormAdd addTask={addTask}></TaskFormAdd>
}
<TasksList Tasks={Tasks} editRow={editRow} deleteTask={deleteTask}></TasksList>
</main> */