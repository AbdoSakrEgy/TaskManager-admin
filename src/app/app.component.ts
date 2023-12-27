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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TasksApp-admin';
  isNavbarHidden: boolean = false;

  constructor(
    private route: Router,
    private dataService: DataService,
    private store: Store,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
  ngOnInit(): void {
    this.route.events.subscribe((event) => {
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
    this.getAllTasks();
    this.getAllUsers();
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
