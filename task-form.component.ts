import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  taskForm: FormGroup;
  priorities = ['low', 'medium', 'high'];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private historyService: HistoryService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['low', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: this.taskService.generateId(),
        ...this.taskForm.value,
        status: 'to-do',
        history: []
      };
      this.taskService.addTask(newTask);
      this.historyService.logHistory(newTask.id, 'Task created');
      this.taskForm.reset({
        priority: 'low'
      });
    }
  }
}
