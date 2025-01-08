"use client";

import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { ListView } from "@/components/list-view";
import { BoardView } from "@/components/board-view";
import { Task, ViewType } from "../../types/task";
import { getAllTasks, updateTask } from "@/utils/firestore";
import { getAuth } from "firebase/auth";

const initialTasks: Task[] = [];

export default function DashboardPage() {
  const [view, setView] = useState<ViewType>("list");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const auth = getAuth();
  const userImage = auth.currentUser?.photoURL || "/default-user.png";

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
        <DashboardHeader
          view={view}
          onViewChange={setView}
          userImage={userImage}
        />
        {view === "list" ? (
          <ListView tasks={tasks} onUpdateTask={updateTask} />
        ) : (
          <BoardView tasks={tasks} onUpdateTask={updateTask} />
        )}
      </div>
    </main>
  );
}
