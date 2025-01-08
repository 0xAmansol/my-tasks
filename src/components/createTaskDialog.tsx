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
import { Task, TaskStatus } from "@/types/task";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { addTask } from "@/utils/firestore";

export function CreateTaskDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState<Task>({
    id: crypto.randomUUID(),
    userId: "userId",
    title: "Add a title",
    category: "Add a category",
    status: "NONE",
    dueDate: "",
    description: "HEY THERE",
    attachments: [] as string[],
    completed: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <>
      {/* todo - need to swich the button "+ add task" */}
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-purple-600 hover:bg-purple-700"
      >
        Add Task
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="title">Task title</Label>
              <Input
                id="title"
                placeholder="Enter task title"
                onChange={(e) => setTask({ ...task, title: e.target.value })}
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
              <Textarea
                id="description"
                placeholder="Add description"
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Task Category</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    className={
                      task.category == "Work"
                        ? "bg-purple-600 hover:bg-purple-700 flex-1"
                        : "default"
                    }
                    size="sm"
                    onClick={() => setTask({ ...task, category: "Work" })}
                  >
                    Work
                  </Button>
                  <Button
                    type="button"
                    className={
                      task.category == "Personal"
                        ? "bg-purple-600 hover:bg-purple-700 flex-1"
                        : "default"
                    }
                    size="sm"
                    onClick={() => setTask({ ...task, category: "Personal" })}
                  >
                    Personal
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Task Status</Label>
                <Select
                  onValueChange={(value: TaskStatus) =>
                    setTask({ ...task, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose" />
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
                onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                value={task.dueDate}
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
              {task.attachments?.map((url, index) => (
                <div key={index} className="mt-2 text-sm text-gray-600">
                  {url.split("/").pop()}
                </div>
              ))}

              <input
                id="file-upload"
                type="file"
                className="hidden"
                multiple
                onChange={async (e) => {
                  if (!e.target.files) return;

                  const storageRef = ref(storage);
                  const uploadPromises = Array.from(e.target.files).map(
                    async (file) => {
                      const fileRef = ref(
                        storageRef,
                        `tasks/${task.id}/${file.name}`
                      );
                      await uploadBytes(fileRef, file);
                      return getDownloadURL(fileRef);
                    }
                  );

                  const urls = await Promise.all(uploadPromises);
                  setTask({
                    ...task,
                    attachments: [...(task.attachments ?? []), ...urls],
                  });
                }}
              />
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
                onClick={addTask.bind(null, task)}
              >
                Create
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
