import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  innerWidth: any = screen.width;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  public registerForm = this.formBuilder.group(
    {
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ],
      ],
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
    { validator: this.checkIfMatchingPasswords('password', 'confirmPassword') }
  );
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private _snackBar: MatSnackBar,
  ) {}
  onRegister() {
    this.isLoading = true;
    this.errorMessage = '';
    const body = {
      email: this.registerForm.get('email')?.value!,
      password: this.registerForm.get('password')?.value!,
      username: this.registerForm.get('userName')?.value!,
      role: 'user',
    };
    this.authService.register(body).subscribe({
      next: (res: any) => {
        this.router.navigateByUrl('/tasks');
        this.tokenStorage.saveToken(res.token);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this._snackBar.openFromComponent(AlertComponent, {
          data: {
            message: 'Logged in successfully',
            backgroundColor: '#16a34a',
            textColor: '#ffffff',
            isCloseBtnHidden: true,
          },
          duration: 2 * 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      },
      error: (error) => {
        this.errorMessage = error;
        this.isSignUpFailed = true;
        this.isLoading = false;
      },
    });
  }
  // ---------------custom validator
  checkIfMatchingPasswords(
    passwordKey: string,
    passwordConfirmationKey: string
  ) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }
  // custom validator---------------
}
