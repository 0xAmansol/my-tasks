"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { Task } from "@/types/task";
import { updateTask } from "@/utils/firestore";

interface EditTaskDialogProps {
  task: Task;
  onUpdate: (updatedTask: Task) => void;
}

export function EditTaskDialog({ task, onUpdate }: EditTaskDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(editedTask);
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="ghost" size="sm">
        Edit
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="title">Task title</Label>
              <Input
                id="title"
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <div className="border rounded-md p-1 space-x-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                >
                  B
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-xs italic"
                >
                  i
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-xs underline"
                >
                  U
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-xs line-through"
                >
                  S
                </Button>
              </div>
              <Textarea id="description" value="" className="min-h-[100px]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Task Category</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={
                      editedTask.category === "Work" ? "default" : "outline"
                    }
                    size="sm"
                    className="flex-1"
                    onClick={() =>
                      setEditedTask({ ...editedTask, category: "Work" })
                    }
                  >
                    Work
                  </Button>
                  <Button
                    type="button"
                    variant={
                      editedTask.category === "Personal" ? "default" : "outline"
                    }
                    size="sm"
                    className="flex-1"
                    onClick={() =>
                      setEditedTask({ ...editedTask, category: "Personal" })
                    }
                  >
                    Personal
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Task Status</Label>
                <Select
                  value={editedTask.status}
                  onValueChange={(value) =>
                    setEditedTask({
                      ...editedTask,
                      status: value as Task["status"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TODO">To Do</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="due-date">Due on</Label>
              <Input
                type="date"
                id="due-date"
                value={editedTask.dueDate}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, dueDate: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Attachment</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Drop your files here or{" "}
                  <button
                    type="button"
                    className="text-purple-600 hover:underline"
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                  >
                    Upload
                  </button>
                </p>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={() => {}}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700"
                onClick={async () => {
                  try {
                    await updateTask(editedTask);
                    onUpdate(editedTask);
                  } catch (error) {
                    console.error("Error updating task:", error);
                  }
                }}
              >
                Update
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
