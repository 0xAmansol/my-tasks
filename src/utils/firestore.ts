import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { Task } from "@/types/task";
import { getAuth } from "firebase/auth";

//add a task
export const addTask = async (task: Task) => {
  const auth = getAuth();

  const user = auth.currentUser;
  if (!user || !user.email) {
    return "User not authenticated";
  }

  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      title: task.title,
      attachments: task.attachments,
      status: task.status,
      dueDate: task.dueDate,
      category: task.category,
      userId: user.email,
    });
    return docRef.id;
  } catch (error) {
    return error;
  }
};

//get all tasks
export const getAllTasks = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user || !user.email) {
    return "User not authenticated";
  }
  try {
    const tasksCollection = query(collection(db, "tasks"));
    const tasksQuery = query(
      tasksCollection,
      where("userId", "==", user.email)
    );
    const querySnapshot = await getDocs(tasksQuery);
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
