import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';
import { AddNewTaskComponent } from './components/add-new-task/add-new-task.component';



@NgModule({
  declarations: [
    AllTasksComponent,
    AddNewTaskComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AllTasksModule { }
