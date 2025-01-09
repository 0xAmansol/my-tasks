"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { ListView } from "@/components/list-view";
import { BoardView } from "@/components/board-view";
import { Task, ViewType } from "../../types/task";
import { useTaskStore } from "@/store/useTaskStore";
import { getAuth } from "firebase/auth";

export default function DashboardPage() {
  const [view, setView] = useState<ViewType>("list");
  const [category, setCategory] = useState<string>("all");

  const auth = getAuth();
  const userImage = auth.currentUser?.photoURL || "/default-user.png";

  const { tasks, fetchTasks, updateTask } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = useMemo(() => {
    return category === "all"
      ? tasks
      : tasks.filter((task: Task) => task.category === category);
  }, [tasks, category]);

  const handleUpdateTask = useCallback(
    (task: Task) => {
      updateTask(task);
    },
    [updateTask]
  );

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <DashboardHeader
          view={view}
          onViewChange={setView}
          userImage={userImage}
          onCategoryChange={setCategory}
        />
        {view === "list" ? (
          <ListView tasks={filteredTasks} onUpdateTask={handleUpdateTask} />
        ) : (
          <BoardView tasks={filteredTasks} onUpdateTask={handleUpdateTask} />
        )}
      </div>
    </main>
  );
}
