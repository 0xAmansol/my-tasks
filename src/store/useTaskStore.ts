import { create } from "zustand";
import { Task } from "../types/task";
import { getAllTasks, updateTask } from "../utils/firestore";

interface TaskState {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  updateTask: (task: Task) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  fetchTasks: async () => {
    const tasks = (await getAllTasks()) as Task[];
    set({ tasks });
  },
  updateTask: (task: Task) => {
    updateTask(task);
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    }));
  },
}));
