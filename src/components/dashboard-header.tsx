import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ViewType } from "@/types/task";
import { Search } from "lucide-react";
import { CreateTaskDialog } from "./createTaskDialog";

interface DashboardHeaderProps {
  view: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function DashboardHeader({ view, onViewChange }: DashboardHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="w-8 h-8 bg-purple-600 rounded-lg"></span>
          <h1 className="text-xl font-semibold">TaskBuddy</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-1">
            <Button
              variant={view === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => onViewChange("list")}
            >
              List
            </Button>
            <Button
              variant={view === "board" ? "default" : "outline"}
              size="sm"
              onClick={() => onViewChange("board")}
            >
              Board
            </Button>
          </div>
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Due Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input className="pl-8" placeholder="Search" />
          </div>
          <CreateTaskDialog />
        </div>
      </div>
    </div>
  );
}
