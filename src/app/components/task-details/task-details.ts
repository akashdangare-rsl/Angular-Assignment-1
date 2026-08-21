import { Component, inject, signal, input, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task-service';
import { TitleCasePipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-details',
  imports: [TitleCasePipe, DatePipe, RouterLink],
  templateUrl: './task-details.html',
  styleUrl: './task-details.css',
})
export class TaskDetails implements OnInit {
  taskService = inject(TaskService);
  id = input<string>();
  task = signal<Task | null>(null);
  loading = signal<boolean>(false);
  isError = signal<boolean>(false);

  ngOnInit(): void {
    const taskId = this.id();
    if (taskId) {
      this.loading.set(true);
      this.taskService.getTaskById(Number(taskId)).subscribe({
        next: (task) => {
          this.task.set(task)
          this.loading.set(false);
        },
        error: () => {
          this.isError.set(true);
          this.loading.set(false);
        }
      });
    }
  }
}
