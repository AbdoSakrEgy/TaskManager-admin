import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserListPaginatorComponent } from './components/user-list-paginator/user-list-paginator.component';

@NgModule({
  declarations: [UserListComponent, UserListPaginatorComponent],
  imports: [CommonModule, SharedModule],
})
export class UsersModule {}
