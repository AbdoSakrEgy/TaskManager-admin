import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.css'],
})
export class AddNewTaskComponent implements OnInit {
  newTaskForm = this.formBuilder.group({
    title: ['', Validators.required],
    userId: ['', Validators.required],
    image: ['', Validators.required],
    description: ['', Validators.required],
    deadline: ['', Validators.required],
  });
  users: any[] = [];
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddNewTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {}
  ngOnInit(): void {
    this.dataService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res.users;
        console.log(this.users);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  createTask() {
    this.isLoading = true;
    this.dataService.createTask(this.newTaskForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.newTaskForm.reset();
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }
  selectImage(event: any) {
    // console.log(event);
    // console.log(event.target.files[0]);
    // console.log(event.target.files.length);
    this.newTaskForm.get('image')?.setValue(event.target.files[0]);
  }
}
