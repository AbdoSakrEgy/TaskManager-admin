import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users/users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginatorOfUsersComponent } from './components/paginator-of-users/paginator-of-users.component';

@NgModule({
  declarations: [UsersComponent, PaginatorOfUsersComponent],
  imports: [CommonModule, SharedModule],
})
export class UsersModule {}
