import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly tasksKey = 'tasks';
  private tasksSubject = new BehaviorSubject<Task[]>(this.getTasksFromLocalStorage());

  tasks$ = this.tasksSubject.asObservable();

  constructor() {}

  private getTasksFromLocalStorage(): Task[] {
    const tasksString = localStorage.getItem(this.tasksKey);
    return tasksString ? JSON.parse(tasksString) : [];
  }

  private updateLocalStorage(tasks: Task[]): void {
    localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
    this.tasksSubject.next(tasks);
  }

  getTasks(): Task[] {
    return this.tasksSubject.value;
  }

  addTask(task: Task): void {
    const tasks = this.getTasksFromLocalStorage();
    tasks.push(task);
    this.updateLocalStorage(tasks);
  }

  updateTask(updatedTask: Task): void {
    const tasks = this.getTasksFromLocalStorage();
    const index = tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = { ...updatedTask };
      this.updateLocalStorage(tasks);
    }
  }

  deleteTask(taskId: number): void {
    let tasks = this.getTasksFromLocalStorage();
    tasks = tasks.filter(t => t.id !== taskId);
    this.updateLocalStorage(tasks);
  }

  generateId(): number {
    const tasks = this.getTasksFromLocalStorage();
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;
    return maxId + 1;
  }
}
