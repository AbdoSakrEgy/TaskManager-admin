import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { updatePaginationTasksData } from 'src/app/core/store/actions/paginationTasks.actions';
import { selectPaginationTasks } from 'src/app/core/store/selectors/paginationTasks.selectors';
import { selectTasks } from 'src/app/core/store/selectors/tasks.selectors';

@Component({
  selector: 'app-paginator-of-all-tasks',
  templateUrl: './paginator-of-all-tasks.component.html',
  styleUrls: ['./paginator-of-all-tasks.component.css'],
})
export class PaginatorOfAllTasksComponent implements OnInit {
  mainData: any[] = [];
  tasks: any[] = [];
  tasksPerPage = 4;
  selectedPage = 1;
  pageNumbers = [1];
  activePageNumber = 1;
  updateMainData$ = this.store.select(selectTasks).subscribe({
    next: (res: any) => {
      this.mainData = res;
      this.store.select(selectPaginationTasks).subscribe({
        next: (res: any) => {
          this.tasks = res.tasks;
          this.tasksPerPage = res.tasksPerPage;
          this.selectedPage = res.selectedPage;
          this.pageNumbers = res.pageNumbers;
          this.activePageNumber = res.activePageNumber;
        },
      });
      this.setPage(this.selectedPage);
    },
  });
  updateLocalPaginationTasks$ = this.store
    .select(selectPaginationTasks)
    .subscribe({
      next: (res: any) => {
        this.tasks = res.tasks;
        this.tasksPerPage = res.tasksPerPage;
        this.selectedPage = res.selectedPage;
        this.pageNumbers = res.pageNumbers;
        this.activePageNumber = res.activePageNumber;
      },
    });

  constructor(private store: Store) {}
  ngOnInit(): void {}
  setPage(page: number) {
    // set [mainData-tasksPerPage-selectedPage-pageNumbers-activePageNumber]
    const startIndex = (page - 1) * this.tasksPerPage;
    const endIndex = startIndex + this.tasksPerPage;
    this.tasks = this.mainData.slice(startIndex, endIndex);
    this.activePageNumber = page;
    this.selectedPage = page;
    // set pageNumbers
    const pageCount = Math.ceil(this.mainData.length / this.tasksPerPage);
    const maxPageCount = 100; // Choose a reasonable maximum page count
    this.pageNumbers = [];
    for (let i = 1; i <= Math.min(pageCount, maxPageCount); i++) {
      this.pageNumbers.push(i);
    }
    // update store data
    this.store.dispatch(
      updatePaginationTasksData({
        data: {
          tasks: this.tasks,
          tasksPerPage: this.tasksPerPage,
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
    this.tasksPerPage = +newSize;
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
