export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED'

export interface Task {
  id: string
  title: string
  dueDate: string
  category?: string
  status: TaskStatus
}

export type ViewType = 'list' | 'board'

