import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskListPaginatorComponent } from './components/task-list-paginator/task-list-paginator.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskListPaginatorComponent,
    TaskFormComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class TasksModule {}
