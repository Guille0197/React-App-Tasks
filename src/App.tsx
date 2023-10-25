import React, { useState, useRef } from "react";
import Swal from "sweetalert2";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITasks {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTasks, setNewTasks] = useState<string>("");
  const [tasks, setTasks] = useState<ITasks[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTasks(newTasks);
    setNewTasks("");
    taskInput.current?.focus();
  };

  const addTasks = (name: string): void => {
    const newTasks: ITasks[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTasks = (i: number): void => {
    const newTasks: ITasks[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);

    Toast.fire({
      icon: "success",
      title: "Finished successfully",
    });
  };

  const removeTasks = (i: number): void => {
    // sweetAlert
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your tasks has been deleted.", "success");
        // Delete Tasks
        const newTasks: ITasks[] = [...tasks];
        newTasks.splice(i, 1);
        setTasks(newTasks);
      }
    });
  };

  // Function Toast Success
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center">Tasks React</h1>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={(e) => setNewTasks(e.target.value)}
                  value={newTasks}
                  className="form-control"
                  ref={taskInput}
                  autoFocus
                  placeholder="Write a task"
                  required
                />
                <button className="btn btn-success btn-block mt-2">Save</button>
              </form>
            </div>
          </div>
          {tasks.map((t: ITasks, i: number) => (
            <div className="card card-body mt-2" key={i}>
              <h2 style={{ textDecoration: t.done ? "line-through" : "" }}>
                {t.name}
              </h2>
              <div>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => toggleDoneTasks(i)}
                  title="Finish"
                >
                  {t.done ? "✓" : "✗"}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeTasks(i)}
                  title="Delete"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
