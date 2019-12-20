import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DATE_LOCALE,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule, MatExpansionModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatNativeDateModule, MatProgressSpinnerModule,
  MatToolbarModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportComponent } from './reports/report.component';
import { CreateSelectionComponent } from './selections/create/create-selection.component';
import { SelectionComponent } from './selections/list/selection.component';
import { UpdateSelectionComponent } from './selections/update/update-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    SelectionComponent,
    CreateSelectionComponent,
    UpdateSelectionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatListModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'de-DE'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
