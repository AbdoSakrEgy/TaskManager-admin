import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { DataService } from 'src/app/core/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { selectPaginationTasks } from 'src/app/core/store/selectors/paginationTasks.selectors';
import { selectIsLoadingTasks } from 'src/app/core/store/selectors/tasks.selectors';
import { selectUsers } from 'src/app/core/store/selectors/users.selectors';
import { SharedModule } from 'src/app/shared/shared.module';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  innerWidth: any = screen.width;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  tasksToView: any[] = [];
  firstRowPosition: number = 1;
  isLoading = true;
  page = '';
  limit = '';
  status = '';
  fromDate = '';
  toDate = '';
  range = new FormGroup({
    start: new FormControl<Date | ''>(''),
    end: new FormControl<Date | ''>(''),
  });
  userId = '';
  keyword = '';

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
  users$ = this.store.select(selectUsers);

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private dataService: DataService
  ) {}
  ngOnInit(): void {
    this.getAllTasks(
      this.page,
      this.limit,
      this.status,
      this.fromDate,
      this.toDate,
      this.userId,
      this.keyword
    );
  }
  createTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '1000px',
      data: {
        isDialogForUpdateTask: false,
        task: '',
      },
    });
  }
  updateTaskDialog(task: any): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '1000px',
      data: {
        isDialogForUpdateTask: true,
        task: task,
      },
    });
  }
  removeTaskDialog(taskId: any): void {
    const dialogRef = this.dialog.open(RemoveTaskConfirm, {
      data: { taskId: taskId },
    });
  }
  setDate() {
    const startDate = new Date(this.range.get('start')?.value!);
    const endDate = new Date(this.range.get('end')?.value!);
    this.fromDate =
      startDate.getFullYear() +
      '-' +
      (startDate.getMonth() + 1) +
      '-' +
      startDate.getDate();
    this.toDate =
      endDate.getFullYear() +
      '-' +
      (endDate.getMonth() + 1) +
      '-' +
      endDate.getDate();
  }
  resetDate() {
    this.range.reset();
    this.fromDate = '';
    this.toDate = '';
    this.range.get('start')?.markAsPristine();
    this.range.get('end')?.markAsPristine();
    this.getAllTasks();
  }
  getAllTasks(
    page = this.page,
    limit = this.limit,
    status = this.status,
    fromDate = this.fromDate,
    toDate = this.toDate,
    userId = this.userId,
    keyword = this.keyword
  ) {
    if (this.range.dirty) {
      this.setDate();
    }
    this.dataService._getAllTasks(
      page,
      limit,
      status,
      fromDate,
      toDate,
      userId,
      keyword
    );
  }
}

// ======================== standalone component ========================
@Component({
  selector: 'remove-task-confirm',
  template: `
    <main class="p-5">
      <div class="text-lg mb-5">
        {{ 'tasks.removeTaskMessage' | translate }}
      </div>
      <div class="flex justify-start gap-5">
        <button mat-stroked-button (click)="onNoClick()">
          {{ 'buttons.cancle' | translate }}
        </button>
        <button mat-raised-button color="warn" (click)="removeTask()">
          {{ 'buttons.delete' | translate }}
        </button>
      </div>
    </main>
  `,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    SharedModule,
  ],
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
        this.dataService._getAllTasks();
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
