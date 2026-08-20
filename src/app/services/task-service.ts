import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Service()
export class TaskService {
    private httpClient = inject(HttpClient);
    private localJsonServerUrl = 'http://localhost:3000/tasks'

    getTasks(): Observable<Task[]> {
        return this.httpClient.get<Task[]>(this.localJsonServerUrl);
    }

    getTaskById(id: number): Observable<Task> {
        return this.httpClient.get<Task>(`${this.localJsonServerUrl}/${id}`);
    }
}
