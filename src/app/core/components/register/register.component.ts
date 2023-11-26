import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../../services/login-register.service';

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
  isLoading = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginRegisterService: LoginRegisterService
  ) {}
  onRegister() {
    this.isLoading = true;
    this.errorMessage = '';
    const MODEL = {
      email: this.registerForm.get('email')?.value!,
      password: this.registerForm.get('password')?.value!,
      username: this.registerForm.get('userName')?.value!,
      role: 'user',
    };
    this.loginRegisterService.register(MODEL).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/all-tasks');
      },
      error: (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      },
    });
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
