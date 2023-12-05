import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTaskComponent } from '../add-new-task/add-new-task.component';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css'],
})
export class AllTasksComponent {
  users: any = [];
  isLoading = true;
  
  constructor(public dialog: MatDialog) {
    
  }
  changeUsersData(event: any) {
    while (this.users.length > 0) {
      this.users.pop();
    }
    this.users.push(...event);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddNewTaskComponent, {
      width: '1000px',
    });
  }
}
