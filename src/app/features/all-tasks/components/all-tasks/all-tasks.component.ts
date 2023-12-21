import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { AddNewTaskComponent } from '../add-new-task/add-new-task.component';
import { DataService } from 'src/app/core/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { updateTasks } from 'src/app/core/store/actions/tasks.actions';
import { selectPaginationTasks } from 'src/app/core/store/selectors/paginationTasks.selectors';
import { selectIsLoadingTasks } from 'src/app/core/store/selectors/tasks.selectors';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css'],
})
export class AllTasksComponent implements OnInit {
  tasksToView: any[] = [];
  firstRowPosition: number = 1;
  isLoading = true;
  isTasksLoading$ = this.store.select(selectIsLoadingTasks).subscribe({
    next: (res: any) => {
      this.isLoading = res;
    },
  });
  isTasksToViewUpdated$ = this.store.select(selectPaginationTasks).subscribe({
    next: (res: any) => {
      const firstRowPosition = res.tasksPerPage * (res.selectedPage - 1) + 1;
      this.firstRowPosition = firstRowPosition;
      this.tasksToView = res.tasks;
    },
  });

  constructor(public dialog: MatDialog, private store: Store) {}
  createTaskDialog(): void {
    const dialogRef = this.dialog.open(AddNewTaskComponent, {
      width: '1000px',
    });
  }
  ngOnInit(): void {}
  removeTaskDialog(taskId: any): void {
    const dialogRef = this.dialog.open(RemoveTaskConfirm, {
      data: { taskId: taskId },
    });
  }
}

// ======================== standalone component ========================
@Component({
  selector: 'remove-task-confirm',
  template: `
    <main class="p-5">
      <div class="text-lg mb-5">Do you want to remove the task?</div>
      <div class="flex justify-start gap-5">
        <button mat-stroked-button (click)="onNoClick()">Cancle</button>
        <button mat-raised-button color="warn" (click)="removeTask()">
          Delete
        </button>
      </div>
    </main>
  `,
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})
export class RemoveTaskConfirm {
  constructor(
    public dialogRef: MatDialogRef<RemoveTaskConfirm>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    private _snackBar: MatSnackBar,
    private store: Store
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  removeTask() {
    this.dataService.removeTask(this.data.taskId).subscribe({
      next: (res: any) => {
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
        this.dataService.getAllTasks(1, 10).subscribe({
          next: (res: any) => {
            this.store.dispatch(updateTasks({ payload: res.tasks.reverse() }));
          },
          error: (error) => {
            console.log(error);
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
