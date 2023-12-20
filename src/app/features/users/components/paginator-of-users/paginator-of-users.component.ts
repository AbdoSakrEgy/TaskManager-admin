import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { updatePaginationUsersInfo } from 'src/app/core/store/actions/paginationUsers.actions';
import { selectPaginationUsers } from 'src/app/core/store/selectors/paginationUsers.selectors';
import { selectUsers } from 'src/app/core/store/selectors/users.selectors';

@Component({
  selector: 'app-paginator-of-users',
  templateUrl: './paginator-of-users.component.html',
  styleUrls: ['./paginator-of-users.component.css'],
})
export class PaginatorOfUsersComponent {
  usersList = [];
  users: any[] = [];
  usersPerPage = 4;
  selectedPage = 1;
  pageNumbers = [1];
  activePageNumber = 1;
  isUsersListUpdated$ = this.store.select(selectUsers).subscribe({
    next: (res: any) => {
      this.store.select(selectPaginationUsers).subscribe({
        next: (res: any) => {
          this.users = res.users;
          this.usersPerPage = res.usersPerPage;
          this.selectedPage = res.selectedPage;
          this.pageNumbers = res.pageNumbers;
          this.activePageNumber = res.activePageNumber;
        },
      });
      this.usersList = res;
      this.setPage(this.selectedPage);
    },
  });

  constructor(private store: Store) {}
  ngOnInit(): void {}
  setPage(page: number) {
    // set [usersList-usersPerPage-selectedPage-pageNumbers-activePageNumber]
    const startIndex = (page - 1) * this.usersPerPage;
    const endIndex = startIndex + this.usersPerPage;
    this.users = this.usersList.slice(startIndex, endIndex);
    this.activePageNumber = page;
    this.selectedPage = page;
    // set pageNumbers
    const pageCount = Math.ceil(this.usersList.length / this.usersPerPage);
    const maxPageCount = 100; // Choose a reasonable maximum page count
    this.pageNumbers = [];
    for (let i = 1; i <= Math.min(pageCount, maxPageCount); i++) {
      this.pageNumbers.push(i);
    }
    // update data to store
    this.store.dispatch(
      updatePaginationUsersInfo({
        data: {
          users: this.users,
          usersPerPage: this.usersPerPage,
          selectedPage: this.selectedPage,
          pageNumbers: this.pageNumbers,
          activePageNumber: this.activePageNumber,
        },
      })
    );
  }
  // changePageSize() - changePage()
  changePageSize(event: Event) {
    const newSize = (event.target as HTMLInputElement).value;
    this.usersPerPage = +newSize;
    this.setPage(1);
  }
  changePage(page: any) {
    if (page >= 1 && page <= this.pageNumbers.length) {
      this.setPage(page);
    }
  }
  // previousPage() - nextPage()
  previousPage() {
    this.changePage(this.selectedPage - 1);
  }
  nextPage() {
    this.changePage(this.selectedPage + 1);
  }
}
