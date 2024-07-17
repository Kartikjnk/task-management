import { Injectable } from '@angular/core';
import { TaskHistory } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  constructor() {}

  logHistory(taskId: number, action: string): void {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const historyEntry: TaskHistory = {
        timestamp: new Date(),
        action
      };
      task.history.push(historyEntry);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
}
