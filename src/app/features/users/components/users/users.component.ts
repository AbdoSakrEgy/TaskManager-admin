import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: any = [];
  isLoading = true;

  changeUsersData(event: any) {
    while (this.users.length > 0) {
      this.users.pop();
    }
    this.users.push(...event);
  }
}
