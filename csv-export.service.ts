import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class CsvExportService {
  constructor() {}

  exportToCsv(tasks: Task[]): void {
    const csvContent = this.convertToCsv(tasks);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'tasks.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private convertToCsv(tasks: Task[]): string {
    const header = ['ID', 'Title', 'Description', 'Due Date', 'Priority', 'Status'].join(',');
    const rows = tasks.map(task =>
      [task.id, task.title, task.description, task.dueDate, task.priority, task.status].join(',')
    );
    return `${header}\n${rows.join('\n')}`;
  }
}
