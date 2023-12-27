import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './features/users/users.module';
import { httpInterceptorProviders } from './core/interceptors';
import { StoreModule } from '@ngrx/store';
import { tasksReducer } from './core/store/reducers/tasks.reducers';
import { paginationTasksReducer } from './core/store/reducers/paginationTasks.reducers';
import { usersReducer } from './core/store/reducers/users.reducers';
import { paginationUsersReducer } from './core/store/reducers/paginationUsers.reducers';
import { TasksModule } from './features/tasks/tasks.module';
// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    TasksModule,
    UsersModule,
    StoreModule.forRoot({
      tasks: tasksReducer,
      paginationTasks: paginationTasksReducer,
      users: usersReducer,
      paginationUsers: paginationUsersReducer,
    }),
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      // this code added to try fix i18n not working on production
      // defaultLanguage: 'en',
      defaultLanguage: 'en',
    }),
  ],
  providers: httpInterceptorProviders,
  bootstrap: [AppComponent],
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
