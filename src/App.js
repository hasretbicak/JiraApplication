import "./App.css";
import TaskCreate from "./components/TaskCreate";
import TaskList from "./components/TaskList";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  const deleteTaskById = async (id) => {
    await axios.delete(`http://localhost:3000/tasks/${id}`);
    const afterDeletingTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(afterDeletingTasks);
  };

  const editTaskById = async (id, updatedtitle, updatedTaskDesc) => {
    await axios.put(`http://localhost:3000/tasks/${id}`, {
      title: updatedtitle,
      taskDesc: updatedTaskDesc,
    });
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { id, title: updatedtitle, taskDesc: updatedTaskDesc };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const createTask = async (title, taskDesc) => {
    const response = await axios.post("http://localhost:3000/tasks", {
      title: title,
      taskDesc: taskDesc,
    });
    console.log(response);
    const createdTasks = [...tasks, response.data];

    setTasks(createdTasks);
  };
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3004/tasks");
      setTasks(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="App">
      {/* title ve taskDesc almak için */}
      <TaskCreate onCreate={createTask} />
      <h2 className="position">Görevler</h2>
      <TaskList
        tasks={tasks}
        onDelete={deleteTaskById}
        onUpdate={editTaskById}
      />
    </div>
  );
}

export default App;
