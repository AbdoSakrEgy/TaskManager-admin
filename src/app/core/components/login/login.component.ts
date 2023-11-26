import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../../services/login-register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(10)],
    ],
  });
  isAdmin = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginRegisterService: LoginRegisterService
  ) {}
  onLogin() {
    this.isLoading = true;
    this.errorMessage = '';
    const MODEL = {
      email: this.loginForm.get('email')?.value!,
      password: this.loginForm.get('password')?.value!,
      role: this.isAdmin ? 'admin' : 'user',
    };
    this.loginRegisterService.login(MODEL).subscribe({
      next: (res: any) => {
        this.router.navigateByUrl('/all-tasks');
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error;
      },
    });
  }
}
