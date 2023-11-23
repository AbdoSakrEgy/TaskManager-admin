import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public registerForm = this.formBuilder.group(
    {
      userName: ['', [Validators.required, isUserNameLengthValid()]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    },
    { validator: passwordMatchValidator() }
  );

  constructor(private formBuilder: FormBuilder, private router: Router) {}
  onRegister() {
    this.router.navigateByUrl('/all-tasks');
  }
}
// custom validators
export function isUserNameLengthValid() {
  return (control: AbstractControl) => {
    if (control.value.length < 4 || control.value.length > 10) {
      return { lengthInvalid: true };
    }
    return null;
  };
}
export function passwordMatchValidator() {
  return (control: AbstractControl) => {
    if (
      control.get('password')?.value != control.get('confirmPassword')?.value
    ) {
      return { passwordMismatch: true };
    }
    return null;
  };
}
