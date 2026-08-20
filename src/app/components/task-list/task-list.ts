import { Component, computed, inject, signal } from '@angular/core';
import { Task } from '../../models/task';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { TaskService } from '../../services/task-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [TitleCasePipe, DatePipe, TruncatePipe, RouterLink],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})

export class TaskList {
  private taskSevice = inject(TaskService);

  isLoading = signal(false);
  tasks = signal<Task[]>([]);

  ngOnInit(): void {
    this.isLoading.set(true);
    this.taskSevice.getTasks().subscribe({
      next: (response: Task[]) => {
        this.tasks.set(response);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error(error);
        this.isLoading.set(false);
      }
    })
  }

  completedTasks = computed(() => {
    return this.tasks().filter((task) => task.completed)
  })

  toggleTaskCompletion(id: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed }
        }
        return task
      })
    })
  }
}
