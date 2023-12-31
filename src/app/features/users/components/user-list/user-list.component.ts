import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/core/services/data.service';
import { selectPaginationUsers } from 'src/app/core/store/selectors/paginationUsers.selectors';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import {
  updateIsLoadingUsers,
  updateUsers,
} from 'src/app/core/store/actions/users.actions';
import { selectIsLoadingUsers } from 'src/app/core/store/selectors/users.selectors';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  updateIsLoadingTasks,
  updateTasks,
} from 'src/app/core/store/actions/tasks.actions';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  innerWidth: any = screen.width;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  usersToView: any[] = [];
  firstRowPosition: number = 1;
  isLoading = true;
  name = '';
  isUsersLoading$ = this.store.select(selectIsLoadingUsers).subscribe({
    next: (res: any) => {
      this.isLoading = res;
    },
  });
  isusersToViewUpdated$ = this.store.select(selectPaginationUsers).subscribe({
    next: (res: any) => {
      const firstRowPosition = res.usersPerPage * (res.selectedPage - 1) + 1;
      this.firstRowPosition = firstRowPosition;
      this.usersToView = res.users;
    },
  });

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private dataService: DataService
  ) {}
  ngOnInit(): void {
    this.getAllUsers();
  }
  removeUserDialog(userId: any) {
    const dialogRef = this.dialog.open(RemoveTaskConfirm, {
      data: { userId: userId },
    });
  }
  getAllUsers() {
    this.store.dispatch(updateIsLoadingUsers({ payload: true }));
    this.dataService.getAllUsers(this.name).subscribe({
      next: (res: any) => {
        this.store.dispatch(updateUsers({ payload: res.users.reverse() }));
        this.store.dispatch(updateIsLoadingUsers({ payload: false }));
      },
      error: (error) => {
        console.log(error);
        this.store.dispatch(updateIsLoadingUsers({ payload: false }));
      },
    });
  }
  setUserState(id: any, status: any) {
    const body = {
      id: id,
      status: status,
    };
    this.dataService.setUserState(body).subscribe({
      next: (res: any) => {
        this.store.dispatch(updateIsLoadingUsers({ payload: true }));
        this.dataService.getAllUsers().subscribe({
          next: (res: any) => {
            this.store.dispatch(updateUsers({ payload: res.users.reverse() }));
            this.store.dispatch(updateIsLoadingUsers({ payload: false }));
          },
          error: (error) => {
            console.log(error);
            this.store.dispatch(updateIsLoadingUsers({ payload: false }));
          },
        });
      },
    });
  }
}

// ======================== standalone component ========================
@Component({
  selector: 'remove-task-confirm',
  template: `
    <main class="p-5">
      <div class="text-lg mb-5">
        {{ 'users.removeTaskMessage' | translate }}
      </div>
      <div class="flex justify-start gap-5">
        <button mat-stroked-button (click)="onNoClick()">
          {{ 'buttons.cancle' | translate }}
        </button>
        <button mat-raised-button color="warn" (click)="removeUser()" disabled>
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
  removeUser() {
    // ======================== Recall users and tasks after deleting user
    this.store.dispatch(updateIsLoadingTasks({ payload: true }));
    this.store.dispatch(updateIsLoadingUsers({ payload: true }));
    this.dataService.removeUser(this.data.userId).subscribe({
      next: (res: any) => {
        this.dataService.getAllTasks().subscribe({
          next: (res: any) => {
            this.store.dispatch(updateTasks({ payload: res.tasks.reverse() }));
            this.store.dispatch(updateIsLoadingTasks({ payload: false }));
          },
          error: (error) => {
            console.log(error);
            this.store.dispatch(updateIsLoadingTasks({ payload: false }));
          },
        });
        this.dataService.getAllUsers().subscribe({
          next: (res: any) => {
            this.store.dispatch(updateUsers({ payload: res.users.reverse() }));
            this.store.dispatch(updateIsLoadingUsers({ payload: false }));
          },
          error: (error) => {
            console.log(error);
            this.store.dispatch(updateIsLoadingUsers({ payload: false }));
          },
        });
        // Recall users and tasks after deleting user ========================
        this._snackBar.openFromComponent(AlertComponent, {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 4 * 1000,
          data: {
            message: 'User removed successfully',
            backgroundColor: '#16a34a',
            textColor: '#ffffff',
            isCloseBtnHidden: false,
          },
        });
        this.dialogRef.close();
      },
      error: (error: any) => {
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
