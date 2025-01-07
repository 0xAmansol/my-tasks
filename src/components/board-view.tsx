import { Task, TaskStatus } from "@/types/task"
import { Button } from "@/components/ui/button"

interface BoardViewProps {
  tasks: Task[]
}

export function BoardView({ tasks }: BoardViewProps) {
  const columns: { status: TaskStatus; title: string; bgColor: string }[] = [
    { status: 'TODO', title: 'TO-DO', bgColor: 'bg-pink-100' },
    { status: 'IN_PROGRESS', title: 'IN-PROGRESS', bgColor: 'bg-blue-100' },
    { status: 'COMPLETED', title: 'COMPLETED', bgColor: 'bg-green-100' }
  ]

  return (
    <div className="grid grid-cols-3 gap-4 h-[calc(100vh-12rem)] overflow-hidden">
      {columns.map(({ status, title, bgColor }) => {
        const columnTasks = tasks.filter(task => task.status === status)

        return (
          <div key={status} className="flex flex-col rounded-lg bg-gray-50">
            <div className={`${bgColor} p-3 rounded-t-lg`}>
              <h2 className="font-medium">{title}</h2>
            </div>
            <div className="flex-1 p-2 space-y-2 overflow-auto">
              {columnTasks.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No Tasks In {title}
                </div>
              ) : (
                columnTasks.map(task => (
                  <div
                    key={task.id}
                    className="p-3 bg-white rounded-lg shadow-sm border"
                  >
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{task.dueDate}</p>
                    {task.category && (
                      <span className="text-xs text-gray-500 mt-2 block">
                        {task.category}
                      </span>
                    )}
                  </div>
                ))
              )}
              {status === 'TODO' && (
                <Button
                  variant="ghost"
                  className="w-full justify-start text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                >
                  + Add Task
                </Button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

