import React, {useState, useCallback, useEffect} from 'react';
import './App.css';

const App = () =>{
  
  const [newTask,setNewTask] = useState('');//useState devuelve un array name = variable, setName = funcion para cambios
  const [task,setTask] = useState([]);

  const onNewTaskChange = useCallback(
    (e) => {
      setNewTask(e.target.value);
    },
    [],
  )

  const formSubmitted = useCallback(
    (e) => {
      e.preventDefault();
      if (!newTask.trim()) return;
      setTask([
        ...task,
        {
          id: task.length + 1,
          content: newTask,
          done: false
        }
      ]);
      setNewTask('');
    },
    [newTask,task],
  )

  useEffect(() =>{
    console.log(task)
  },
  [task]
  );

  const onChangeCheck = useCallback(
      (tasks,index) => (e) => {
        const newTasks = [...task];
        newTasks.splice(index, 1, {
          ...tasks,
          done: !tasks.done
        });
        setTask(newTasks);
      },
    [task],
  );

  const removeTask = useCallback(
      (tasks) => (e) =>{
        setTask(task.filter(otherTask => otherTask !== tasks))
      },
    [task],
  )

  return (
    <div>
        <form onSubmit={formSubmitted}>
          <label> enter your task:</label>
          <input
            type="text"
            onChange={onNewTaskChange}
            name="newTask"
            value={newTask}
          />
          <button>add task</button>
        </form>
        <ul>
          {
            task.map((tk, index) => (
              <li key={tk.id}>
                <input 
                  type="checkbox"
                  checked={task.done}
                  onChange={onChangeCheck(tk, index)}
                />
                <span className={tk.done ? 'done' : ''}>{tk.content}</span>
                <button onClick={removeTask(tk)}>remove task</button>
              </li>
            ))
          }
        </ul>
    </div>
  );
}

export default App;
