import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../auth/AuthContext";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const url = filter ? `tasks/?status=${filter}` : "tasks/";
      const res = await api.get(url);
      setTasks(res.data.results);
    } catch (err) {
      setError("Unable to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`tasks/${id}/`);
      fetchTasks();
    } catch {
      alert("Failed to delete task");
    }
  };

  const statusBadge = (status) => {
    const styles = {
      completed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
      in_progress: "bg-blue-50 text-blue-700 border border-blue-200",
      pending: "bg-amber-50 text-amber-700 border border-amber-200",
    };

    return (
      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${styles[status]}`}>
        {status.replace("_", " ").toUpperCase()}
      </span>
    );
  };

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    pending: tasks.filter(t => t.status === 'pending').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Dashboard</h1>
              <p className="text-slate-500 mt-1">Manage and track your work efficiently</p>
            </div>
            
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-xl border border-slate-200">
              <p className="text-slate-600 text-sm font-medium">Total Tasks</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{taskStats.total}</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200">
              <p className="text-amber-700 text-sm font-medium">Pending</p>
              <p className="text-2xl font-bold text-amber-900 mt-1">{taskStats.pending}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
              <p className="text-blue-700 text-sm font-medium">In Progress</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">{taskStats.inProgress}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200">
              <p className="text-emerald-700 text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold text-emerald-900 mt-1">{taskStats.completed}</p>
            </div>
          </div>
        </div>

        {/* Task Form */}
        <TaskForm
          task={editingTask}
          onSuccess={() => {
            setEditingTask(null);
            fetchTasks();
          }}
        />

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-900">Your Tasks</h2>
          <select
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 mt-3">Loading tasks...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && tasks.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-16 text-center">
            <p className="text-lg font-semibold text-slate-700">No tasks found</p>
            <p className="text-sm text-slate-500 mt-1">Create your first task to get started</p>
          </div>
        )}

        {/* Task List */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-slate-600 text-sm mb-3 leading-relaxed">
                      {task.description}
                    </p>
                  )}
                  {statusBadge(task.status)}
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors text-sm"
                    onClick={() => setEditingTask(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors text-sm"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;