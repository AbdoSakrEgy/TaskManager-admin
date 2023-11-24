import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users/users.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [UsersComponent, PaginatorComponent],
  imports: [CommonModule, SharedModule],
})
export class UsersModule {}
