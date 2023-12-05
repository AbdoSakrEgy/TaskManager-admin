import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTaskComponent } from '../add-new-task/add-new-task.component';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css'],
})
export class AllTasksComponent {
  tasks: any = [];
  isLoading = true;

  constructor(public dialog: MatDialog) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(AddNewTaskComponent, {
      width: '1000px',
    });
  }
  changeTasksData(event: any) {
    while (this.tasks.length > 0) {
      this.tasks.pop();
    }
    this.tasks.push(...event);
    console.log(this.tasks);
  }
}
