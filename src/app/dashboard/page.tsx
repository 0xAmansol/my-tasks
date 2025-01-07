"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { ListView } from "@/components/list-view";
import { BoardView } from "@/components/board-view";
import { Task, ViewType } from "../../../types/task";

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
  const [tasks] = useState<Task[]>(initialTasks);

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <DashboardHeader view={view} onViewChange={setView} />
        {view === "list" ? (
          <ListView tasks={tasks} />
        ) : (
          <BoardView tasks={tasks} />
        )}
      </div>
    </main>
  );
}
