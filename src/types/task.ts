export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED" | "NONE";

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  category?: string;
  status: TaskStatus;
  attachments?: string[];
}

export type ViewType = "list" | "board";
