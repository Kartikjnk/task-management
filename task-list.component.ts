import { Component, OnInit } from '@angular/core';
import { Task, TaskHistory } from '../task.model';
import { TaskService } from '../task.service';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[];

  constructor(private taskService: TaskService, private historyService: HistoryService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  updateTaskStatus(task: Task, newStatus: string): void {
    const updatedTask = { ...task, status: newStatus };
    this.taskService.updateTask(updatedTask);
    this.historyService.logHistory(updatedTask.id, `Status changed to ${newStatus}`);
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
    this.historyService.logHistory(taskId, 'Task deleted');
  }
}
