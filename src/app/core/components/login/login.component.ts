import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(10)],
    ],
  });
  isLoginFailed = false;
  errorMessage = '';
  isLoading = false;
  isAdmin = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService
  ) {}
  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.router.navigateByUrl('/all-tasks');
    }
  }
  onLogin() {
    this.errorMessage = '';
    this.isLoading = true;
    const MODEL = {
      email: this.loginForm.get('email')?.value!,
      password: this.loginForm.get('password')?.value!,
      role: this.isAdmin ? 'admin' : 'user',
    };
    this.authService.login(MODEL).subscribe({
      next: (res: any) => {
        this.router.navigateByUrl('/all-tasks');
        console.log(res);
        this.tokenStorageService.saveToken(res.token);
      },
      error: (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      },
    });
  }
}
