import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';
import { AddNewTaskComponent } from './components/add-new-task/add-new-task.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginatorOfAllTasksComponent } from './components/paginator-of-all-tasks/paginator-of-all-tasks.component';

@NgModule({
  declarations: [
    AllTasksComponent,
    AddNewTaskComponent,
    PaginatorOfAllTasksComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class AllTasksModule {}
