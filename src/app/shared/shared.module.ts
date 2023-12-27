import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialuiModule } from './materialui/materialui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { Spinner1Component } from './components/spinner1/spinner1.component';
import { AlertComponent } from './components/alert/alert.component';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [Spinner1Component, AlertComponent],
  imports: [
    CommonModule,
    MaterialuiModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    MatSelectModule,
    TranslateModule.forChild({
      extend: true,
    }),
  ],
  exports: [
    MaterialuiModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    Spinner1Component,
    MatSelectModule,
    TranslateModule,
  ],
})
export class SharedModule {}
