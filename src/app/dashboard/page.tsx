"use client";

import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { ListView } from "@/components/list-view";
import { BoardView } from "@/components/board-view";
import { Task, ViewType } from "../../types/task";
import { getAllTasks } from "@/utils/firestore";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design System Implementation",
    dueDate: "Today",
    category: "Design",
    status: "TODO",
  },
  {
    id: "2",
    title: "User Research",
    dueDate: "Tomorrow",
    category: "Research",
    status: "IN_PROGRESS",
  },
  {
    id: "3",
    title: "API Documentation",
    dueDate: "Next Week",
    category: "Development",
    status: "COMPLETED",
  },
];

export default function DashboardPage() {
  const [view, setView] = useState<ViewType>("list");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getAllTasks();
      setTasks(tasks as []);
      console.log(tasks);
    };

    fetchTasks();
  });

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <DashboardHeader view={view} onViewChange={setView} />
        {view === "list" ? (
          <ListView tasks={tasks} onUpdateTask={handleUpdateTask} />
        ) : (
          <BoardView tasks={tasks} onUpdateTask={handleUpdateTask} />
        )}
      </div>
    </main>
  );
}
