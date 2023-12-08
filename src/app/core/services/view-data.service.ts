import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class ViewDataService {
  tasksDataList = [];
  tasksData: any[] = [];
  tasksDataPerPage: number = 4;
  public selectedPage = 1;
  activePageNumber = 1;
  isLoading: boolean = false;

  constructor(private dataService: DataService) {}
  getAllTasks() {
    this.dataService.getAllTasks(1, 10).subscribe({
      next: (res: any) => {
        this.tasksDataList = res.tasks.reverse();
        let pageIndex = (this.selectedPage - 1) * this.tasksDataPerPage;
        this.tasksData = this.tasksDataList.slice(
          pageIndex,
          this.tasksDataPerPage
        );
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }
  changePageSize(event: Event) {
    const newSize = (event.target as HTMLInputElement).value;
    this.tasksDataPerPage = Number(newSize);
    this.changePage(1);
  }
  get pageNumbers(): number[] {
    return Array(Math.ceil(this.tasksDataList.length / this.tasksDataPerPage))
      .fill(0)
      .map((x, i) => i + 1);
  }
  changePage(page: any) {
    this.selectedPage = page;
    this.slicedTasks();
    this.activePageNumber = page;
  }
  slicedTasks() {
    let pageIndex = (this.selectedPage - 1) * this.tasksDataPerPage;
    let endIndex =
      (this.selectedPage - 1) * this.tasksDataPerPage + this.tasksDataPerPage;
    this.tasksData = [];
    this.tasksData = this.tasksDataList.slice(pageIndex, endIndex);
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
