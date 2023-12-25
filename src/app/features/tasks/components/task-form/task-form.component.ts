import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/core/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { Store } from '@ngrx/store';
import { updateTasks } from 'src/app/core/store/actions/tasks.actions';
import { selectUsers } from 'src/app/core/store/selectors/users.selectors';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  taskForm = this.formBuilder.group({
    title: [
      this.data.task ? this.data.task.title : '',
      [Validators.required, Validators.minLength(5)],
    ],
    userId: [
      this.data.task ? this.data.task.userId._id : '',
      Validators.required,
    ],
    image: [this.data.task ? this.data.task.image : '', Validators.required],
    description: [
      this.data.task ? this.data.task.description : '',
      Validators.required,
    ],
    deadline: [
      this.data.task
        ? new Date(
            new Date(this.data.task.deadline).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            } as Intl.DateTimeFormatOptions)
          ).toISOString()
        : '',
      Validators.required,
    ],
  });
  isImageRequired = false;
  isLoading: boolean = false;
  imageFile: File | null = null;
  users$ = this.store.select(selectUsers);

  constructor(
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private _snackBar: MatSnackBar,
    private store: Store
  ) {}
  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  selectImage(event: any) {
    this.taskForm.get('image')?.setValue(event.target.files[0]);
    const imageFile: File = event.target.files[0];
    if (imageFile) {
      this.imageFile = imageFile;
    }
    this.setIsImageRequired();
  }
  setIsImageRequired() {
    if (this.taskForm.get('image')?.hasError('required')) {
      this.isImageRequired = true;
    } else {
      this.isImageRequired = false;
    }
  }
  createTask() {
    this.isLoading = true;
    const formData = new FormData();
    formData.append('title', this.taskForm.get('title')?.value!);
    formData.append('userId', this.taskForm.get('userId')?.value!);
    formData.append('image', this.taskForm.get('image')?.value!);
    formData.append('description', this.taskForm.get('description')?.value!);
    formData.append('deadline', this.taskForm.get('deadline')?.value!);
    this.dataService.createTask(formData).subscribe({
      next: (res: any) => {
        this.taskForm.reset();
        this.imageFile = null;
        this.isLoading = false;
        this._snackBar.openFromComponent(AlertComponent, {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 4000,
          data: {
            message: 'Task created successfully',
            backgroundColor: '#16a34a',
            textColor: '#ffffff',
            isCloseBtnHidden: false,
          },
        });
        this.dialogRef.close();
        this.dataService.getAllTasks().subscribe({
          next: (res: any) => {
            this.store.dispatch(updateTasks({ payload: res.tasks.reverse() }));
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this._snackBar.openFromComponent(AlertComponent, {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 4000,
          data: {
            message: 'Error!',
            backgroundColor: '#df1e1e',
            textColor: '#ffffff',
            isCloseBtnHidden: false,
          },
        });
      },
    });
  }
  updateTask() {
    this.isLoading = true;
    const formData = new FormData();
    formData.append('title', this.taskForm.get('title')?.value!);
    formData.append('userId', this.taskForm.get('userId')?.value!);
    formData.append('image', this.taskForm.get('image')?.value!);
    formData.append('description', this.taskForm.get('description')?.value!);
    formData.append('deadline', this.taskForm.get('deadline')?.value!);
    this.dataService.updateTask(this.data.task._id, formData).subscribe({
      next: (res: any) => {
        this.taskForm.reset();
        this.imageFile = null;
        this.isLoading = false;
        this._snackBar.openFromComponent(AlertComponent, {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 4000,
          data: {
            message: 'Task updated successfully',
            backgroundColor: '#16a34a',
            textColor: '#ffffff',
            isCloseBtnHidden: false,
          },
        });
        this.dialogRef.close();
        this.dataService.getAllTasks().subscribe({
          next: (res: any) => {
            this.store.dispatch(updateTasks({ payload: res.tasks.reverse() }));
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error: any) => {
        console.log(error);
        this.isLoading = false;
        this._snackBar.openFromComponent(AlertComponent, {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 4000,
          data: {
            message: 'Error!',
            backgroundColor: '#df1e1e',
            textColor: '#ffffff',
            isCloseBtnHidden: false,
          },
        });
      },
    });
  }
}
