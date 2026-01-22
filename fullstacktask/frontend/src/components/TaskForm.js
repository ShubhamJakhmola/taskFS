import { useState } from "react";
import api from "../api/axios";

const TaskForm = ({ task, onSuccess }) => {
  const [form, setForm] = useState({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "pending",
    due_date: task?.due_date || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (task) {
      await api.put(`tasks/${task.id}/`, form);
    } else {
      await api.post("tasks/", form);
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="card mb-6 space-y-3">
      <h3 className="text-lg font-semibold">
        {task ? "Edit Task" : "Add Task"}
      </h3>

      <input
        className="input"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />

      <textarea
        className="input"
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <select
        className="input"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <input
        type="date"
        className="input appearance-none"
        value={form.due_date}
        onChange={(e) =>
          setForm({ ...form, due_date: e.target.value })
        }
      />

      <button className="btn">
        {task ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
};

export default TaskForm;
