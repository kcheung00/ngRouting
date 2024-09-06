import { Routes } from "@angular/router";

import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const routes: Routes = [
  {
    path: '', // <your-domain>/
    component: NoTaskComponent,
    title: 'No Task Titel'
  },
  {
    path: 'users/:userId', // <your-domain>/users/<uid>
    component: UserTasksComponent,
    data:{
      message: "Hello static data for route."
    },
    resolve:{
      userName: resolveUserName
    },
    children:[
      {
        path:'',
        redirectTo: 'task',
        pathMatch: 'prefix'
      },
      {
        path: 'tasks', // <your-domain>/users/<uid>/tasks
        component: TasksComponent,
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
      }
    ]    
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];
