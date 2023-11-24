import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: any = [];

  changeUsersData(event: any) {
    while (this.users.length > 0) {
      this.users.pop();
    }
    this.users.push(...event);
  }
}
