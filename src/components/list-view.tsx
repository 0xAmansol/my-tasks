import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Task, TaskStatus } from "@/types/task";

import { EditTaskDialog } from "./editTaskDialog";

interface ListViewProps {
  tasks: Task[];
  onUpdateTask: (updatedTask: Task) => void;
}

export function ListView({ tasks, onUpdateTask }: ListViewProps) {
  const [expandedSections, setExpandedSections] = useState<TaskStatus[]>([
    "TODO",
    "IN_PROGRESS",
    "COMPLETED",
  ]);

  const toggleSection = (status: TaskStatus) => {
    setExpandedSections((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const sections: { status: TaskStatus; title: string; bgColor: string }[] = [
    { status: "TODO", title: "Todo", bgColor: "bg-pink-100" },
    { status: "IN_PROGRESS", title: "In-Progress", bgColor: "bg-blue-100" },
    { status: "COMPLETED", title: "Completed", bgColor: "bg-green-100" },
  ];

  return (
    <div className="space-y-4">
      {sections.map(({ status, title, bgColor }) => {
        const sectionTasks = tasks.filter((task) => task.status === status);
        const isExpanded = expandedSections.includes(status);

        return (
          <div key={status} className="rounded-lg">
            <button
              onClick={() => toggleSection(status)}
              className={`w-full ${bgColor} p-4 rounded-lg flex items-center justify-between`}
            >
              <span className="font-medium">
                {title} ({sectionTasks.length})
              </span>
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {isExpanded && (
              <div className="mt-2 space-y-2">
                {status === "TODO" && (
                  <Button
                    onClick={() => {}}
                    variant="ghost"
                    className="w-full justify-start text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                  >
                    + ADD TASK
                  </Button>
                )}
                {sectionTasks.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No Tasks in {title}
                  </div>
                ) : (
                  sectionTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-4 bg-white rounded-lg shadow-sm border"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{task.title}</h3>
                          <p className="text-sm text-gray-500">
                            {task.dueDate}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {task.category || "No Category"}
                          </span>
                          <EditTaskDialog task={task} onUpdate={onUpdateTask} />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
