import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

interface Task {
  id: string;
  task: string;
  isCompleted: boolean;
  isEditing: boolean;
  startTime: string;
  endTime: string;
}

export const useTasksStore = defineStore("tasks", {
  state: (): { tasks: Task[] } => ({
    tasks: [],
  }),

  actions: {
    saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },

    fetchTasks() {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks) as Task[];
      }
    },

    addTask(newTask: string, startTime: string, endTime: string) {
      this.tasks.push({
        id: uuidv4(),
        task: newTask,
        isCompleted: false,
        isEditing: false,
        startTime,
        endTime,
      });
      this.saveTasks();
    },

    toggleTaskCompletion(taskId: string) {
      const task = this.tasks.find((task) => task.id === taskId);
      if (task) task.isCompleted = !task.isCompleted;
      this.saveTasks();
    },

    editTask(taskId: string) {
      const task = this.tasks.find((task) => task.id === taskId);
      if (task) task.isEditing = true;
    },

    cancelEdit(taskId: string) {
      const task = this.tasks.find((task) => task.id === taskId);
      if (task) task.isEditing = false;
    },

    updateTask(taskId: string, newTaskValue: string, newStartTime: string, newEndTime: string) {
      const task = this.tasks.find((task) => task.id === taskId);
      if (task) {
        task.task = newTaskValue;
        task.startTime = newStartTime;
        task.endTime = newEndTime;
        task.isEditing = false;
      }
      this.saveTasks();
    },

    deleteTask(taskId: string) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
      this.saveTasks();
    },
  },
});
