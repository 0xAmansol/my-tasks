import { Task, TaskStatus } from "@/types/task";
import { Checkbox } from "@/components/ui/checkbox";
import { EditTaskDialog } from "./editTaskDialog";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { formatDueDate } from "@/utils/formatDueDate";

interface BoardViewProps {
  tasks: Task[];
  onUpdateTask: (updatedTask: Task) => void;
}

export function BoardView({ tasks, onUpdateTask }: BoardViewProps) {
  const columns: { status: TaskStatus; title: string; bgColor: string }[] = [
    { status: "TODO", title: "TO-DO", bgColor: "bg-pink-100" },
    { status: "IN_PROGRESS", title: "IN-PROGRESS", bgColor: "bg-blue-100" },
    { status: "COMPLETED", title: "COMPLETED", bgColor: "bg-green-100" },
  ];

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedTask = tasks.find((task) => task.id === draggableId);
    if (updatedTask) {
      const newStatus = destination.droppableId as TaskStatus;
      onUpdateTask({
        ...updatedTask,
        status: newStatus,
        completed: newStatus === "COMPLETED",
      });
    }
  };

  const handleTaskCompletion = (taskId: string, completed: boolean) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (taskToUpdate) {
      onUpdateTask({
        ...taskToUpdate,
        status: completed ? "COMPLETED" : "TODO",
        completed,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-4 h-[calc(100vh-12rem)] overflow-hidden">
        {columns.map(({ status, title, bgColor }) => {
          const columnTasks = tasks.filter((task) => task.status === status);

          return (
            <div key={status} className="flex flex-col rounded-lg bg-gray-50">
              <div className={`${bgColor} p-3 rounded-t-lg`}>
                <h2 className="font-medium">{title}</h2>
              </div>
              <Droppable droppableId={status}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex-1 p-2 space-y-2 overflow-auto"
                  >
                    {columnTasks.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        No Tasks In {title}
                      </div>
                    ) : (
                      columnTasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-3 bg-white rounded-lg shadow-sm border"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex items-start space-x-2">
                                  <Checkbox
                                    checked={task.status === "COMPLETED"}
                                    onCheckedChange={(checked) =>
                                      handleTaskCompletion(
                                        task.id,
                                        checked as boolean
                                      )
                                    }
                                  />
                                  <div>
                                    <h3
                                      className={`font-medium ${
                                        task.status === "COMPLETED"
                                          ? "line-through text-gray-500"
                                          : ""
                                      }`}
                                    >
                                      {task.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                      {formatDueDate(task.dueDate)}
                                    </p>
                                    {task.category && (
                                      <span className="text-xs text-gray-500 mt-2 block">
                                        {task.category}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <EditTaskDialog
                                  task={task}
                                  onUpdate={onUpdateTask}
                                />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}
