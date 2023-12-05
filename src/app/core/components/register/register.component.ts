import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public registerForm = this.formBuilder.group(
    {
      userName: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(10)],
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
    private tokenStorage: TokenStorageService
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
    this.authService.register(MODEL).subscribe({
      next: (res: any) => {
        console.log(res);
        this.router.navigateByUrl('/all-tasks');
        this.tokenStorage.saveToken(res.token);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
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
