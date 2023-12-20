import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DataService } from './core/services/data.service';
import { Store } from '@ngrx/store';
import { updateTasksList } from './core/store/actions/tasks.actions';
import { updateUsers } from './core/store/actions/users.actions';

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
    private store: Store
  ) {}
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
    this.dataService.getAllTasks(1, 10).subscribe({
      next: (res: any) => {
        this.store.dispatch(updateTasksList({ data: res.tasks.reverse() }));
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getAllUsers() {
    this.dataService.getAllUsers().subscribe({
      next: (res: any) => {
        this.store.dispatch(updateUsers({ data: res.users }));
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
