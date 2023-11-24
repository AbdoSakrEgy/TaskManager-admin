import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';
import { AddNewTaskComponent } from './components/add-new-task/add-new-task.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AllTasksComponent, AddNewTaskComponent, PaginatorComponent],
  imports: [CommonModule, SharedModule],
})
export class AllTasksModule {}
