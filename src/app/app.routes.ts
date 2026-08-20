import { Routes } from '@angular/router';
import { TaskList } from './components/task-list/task-list';
import { TaskDetails } from './components/task-details/task-details';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'tasks', component: TaskList },
    { path: 'task/:id', component: TaskDetails },
    { path: '**', component: TaskList }
];
