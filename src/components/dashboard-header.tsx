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
import Image from "next/image";
import { auth } from "@/lib/firebase";

interface DashboardHeaderProps {
  view: ViewType;
  onViewChange: (view: ViewType) => void;
  userImage: string;
  onCategoryChange: (category: string) => void;
}

export function DashboardHeader({
  view,
  onViewChange,
  userImage,
  onCategoryChange,
}: DashboardHeaderProps) {
  const handleSignout = () => {
    try {
      if (auth.currentUser) {
        auth.signOut();
      }
    } catch (error) {
      console.error("Error signing out:", error);
      return <div>Error signing out</div>;
    }
  };
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
          <div className="w-8 h-8 bg-gray-200 rounded-full">
            <Image
              src={userImage}
              alt="User avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
          <div>
            <Button onClick={handleSignout} className="flex-1">
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2">
          <Select onValueChange={onCategoryChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Work">Work</SelectItem>
              <SelectItem value="Personal">Personal</SelectItem>
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
