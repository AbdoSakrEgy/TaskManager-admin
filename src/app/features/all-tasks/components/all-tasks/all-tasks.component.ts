import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AddNewTaskComponent } from '../add-new-task/add-new-task.component';
import { DataService } from 'src/app/core/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css'],
})
export class AllTasksComponent {
  tasks: any = [];
  isLoading = true;

  constructor(public dialog: MatDialog) {}
  createTaskDialog(): void {
    const dialogRef = this.dialog.open(AddNewTaskComponent, {
      width: '1000px',
    });
  }
  removeTaskDialog(taskId: any): void {
    const dialogRef = this.dialog.open(RemoveTaskConfirm, {
      data: { taskId: taskId },
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

// standalone component
@Component({
  selector: 'remove-task-confirm',
  templateUrl: '../../pages/remove-task-confirm.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    // MatDialogTitle,
    // MatDialogContent,
    // MatDialogActions,
    // MatDialogClose,
  ],
})
export class RemoveTaskConfirm {
  constructor(
    public dialogRef: MatDialogRef<RemoveTaskConfirm>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  removeTask() {
    console.log(this.data.taskId);
    this.dataService.removeTask(this.data.taskId).subscribe({
      next: (res: any) => {
        console.log(res);
        this._snackBar.openFromComponent(AlertComponent, {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 4 * 1000,
          data: {
            message: 'Task removed successfully',
            backgroundColor: '#16a34a',
            textColor: '#ffffff',
            isCloseBtnHidden: false,
          },
        });
        this.dialogRef.close();
      },
      error: (error) => {
        console.log(error);
        this._snackBar.openFromComponent(AlertComponent, {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 4 * 1000,
          data: {
            message: 'Error!',
            backgroundColor: '#df1e1e',
            textColor: '#ffffff',
            isCloseBtnHidden: false,
          },
        });
        this.dialogRef.close();
      },
    });
  }
}
