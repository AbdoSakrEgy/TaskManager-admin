import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-paginator-of-users',
  templateUrl: './paginator-of-users.component.html',
  styleUrls: ['./paginator-of-users.component.css'],
})
export class PaginatorOfUsersComponent {
  usersDataList: any[] = [];
  usersData: any[] = [];
  usersDataPerPage: number = 4;
  public selectedPage = 1;
  activePageNumber = 1;
  @Output() usersDataForParent = new EventEmitter<any>();
  @Output() isLoadin = new EventEmitter<boolean>(true);

  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    let pageIndex = (this.selectedPage - 1) * this.usersDataPerPage;
    this.usersData = this.usersDataList.slice(pageIndex, this.usersDataPerPage);
    this.usersDataForParent.emit(this.usersData);
    this.dataService.getAllUsers().subscribe({
      next: (res: any) => {
        console.log(res);
        this.usersDataList = res.users;
        this.slicedTasks();
        this.isLoadin.emit(false);
      },
      error: (error) => {
        console.log(error);
        this.isLoadin.emit(false);
      },
    });
  }
  changePageSize(event: Event) {
    const newSize = (event.target as HTMLInputElement).value;
    this.usersDataPerPage = Number(newSize);
    this.changePage(1);
  }
  get pageNumbers(): number[] {
    return Array(Math.ceil(this.usersDataList.length / this.usersDataPerPage))
      .fill(0)
      .map((x, i) => i + 1);
  }
  changePage(page: any) {
    this.selectedPage = page;
    this.slicedTasks();
    this.activePageNumber = page;
  }
  slicedTasks() {
    let pageIndex = (this.selectedPage - 1) * this.usersDataPerPage;
    let endIndex =
      (this.selectedPage - 1) * this.usersDataPerPage + this.usersDataPerPage;
    this.usersData = [];
    this.usersData = this.usersDataList.slice(pageIndex, endIndex);
    this.usersDataForParent.emit(this.usersData);
  }
  nextPage() {
    if (this.activePageNumber != this.pageNumbers.length) {
      this.activePageNumber = this.activePageNumber + 1;
      this.changePage(this.activePageNumber);
    }
  }
  previousPage() {
    if (this.activePageNumber != 1) {
      this.activePageNumber = this.activePageNumber - 1;
      this.changePage(this.activePageNumber);
    }
  }
}
