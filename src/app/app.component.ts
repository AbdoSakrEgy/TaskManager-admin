import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DataService } from './core/services/data.service';
import { Store } from '@ngrx/store';
import {
  updateIsLoadingUsers,
  updateUsers,
} from './core/store/actions/users.actions';
import {
  updateIsLoadingTasks,
  updateTasks,
} from './core/store/actions/tasks.actions';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from './core/services/token-storage.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TasksApp-admin';
  isNavbarHidden: boolean = false;

  constructor(
    private router: Router,
    private dataService: DataService,
    private store: Store,
    private translate: TranslateService,
    private tokenStorageService: TokenStorageService
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
  ngOnInit(): void {
    // Check if the user is logged in (you might have your own authentication logic)
    const token = this.tokenStorageService.getToken();
    if (token) {
      // Decode the JWT token
      const decodedToken: any = jwtDecode(token);
      // Check if the token is still valid or expired
      if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
        // Token is still valid, do nothing or perform any other necessary checks
        this.getAllTasks();
        this.getAllUsers();
      } else {
        // Token is expired or invalid, log out the user
        this.router.navigateByUrl('/login');
        this.tokenStorageService.signOut();
      }
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login') {
          this.isNavbarHidden = true;
        } else if (event.url === '/register') {
          this.isNavbarHidden = true;
        } else if (event.url === '/') {
          this.isNavbarHidden = true;
        } else {
          this.isNavbarHidden = false;
        }
      }
    });
  }
  getAllTasks() {
    this.store.dispatch(updateIsLoadingTasks({ payload: true }));
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
  }
  getAllUsers() {
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
  }
}
