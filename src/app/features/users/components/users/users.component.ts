import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPaginationUsers } from 'src/app/core/store/selectors/paginationUsers.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  usersToView: any[] = [];
  firstRowPosition: number = 1;
  isusersToViewUpdated$ = this.store.select(selectPaginationUsers).subscribe({
    next: (res: any) => {
      const firstRowPosition = res.usersPerPage * (res.selectedPage - 1) + 1;
      this.firstRowPosition = firstRowPosition;
      this.usersToView = res.users;
    },
  });

  constructor(private store: Store) {}
}
