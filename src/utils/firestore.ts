import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { Task } from "@/types/task";

//add a task
export const addTask = async (task: Task) => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), task);
    return docRef.id;
  } catch (error) {
    return error;
  }
};

//get all tasks
export const getAllTasks = async () => {
  try {
    const q = query(collection(db, "tasks"));
    const querySnapshot = await getDocs(q);
    const tasks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return tasks;
  } catch (error) {
    return error;
  }
};

//delete a task
export const deleteTask = async (id: string) => {
  const taskRef = doc(db, "tasks", id);
  await deleteDoc(taskRef);
};

export const updateTask = async (task: Task) => {
  const taskRef = doc(db, "tasks", task.id);
  await updateDoc(taskRef, {
    title: task.title,
    dueDate: task.dueDate,
    category: task.category,
    status: task.status,
    attachments: task.attachments,
  });
};
