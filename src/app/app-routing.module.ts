import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './reports/report.component';
import { CreateSelectionComponent } from './selections/create/create-selection.component';
import { SelectionComponent } from './selections/list/selection.component';
import { UpdateSelectionComponent } from './selections/update/update-selection.component';

const routes: Routes = [
  {
    path: 'reports/:control',
    component: ReportComponent,
  },
  {
    path: 'selections/create',
    component: CreateSelectionComponent,
  },
  {
    path: 'selections/:id/update',
    component: UpdateSelectionComponent,
  },
  {
    path: 'selections',
    component: SelectionComponent,
  },
  {
    path: '',
    redirectTo: `reports/${(new Date()).toISOString().split('T')[0]}`,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
