import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatListOption, MatSelectionList } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Selection } from '../selection';
import { SelectionService } from '../selection.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.sass']
})
export class SelectionComponent implements OnInit {

  public isDeleteDisabled = true;

  public isUpdateDisabled = true;

  public isCreateDisabled = false;

  private selections: Observable<Selection[]>;

  @ViewChild('list', { static: false })
  private list: MatSelectionList;

  public constructor(
    private service: SelectionService,
    private location: Location,
    private router: Router,
  ) {
  }

  public ngOnInit() {
    this.selections = this.service.getAllSelections();
  }

  public navigateBack() {
    this.location.back();
  }

  public delete() {
    console.log('delete selections');

    const promises = [];
    for (const selected of this.list.selectedOptions.selected.values()) {
      const promise = this.service.deleteSelection(selected.value).toPromise();
      promises.push(promise);
    }

    Promise.all(promises).then(() => {
      this.ngOnInit();
      console.log(`finished deleting selections`);
    });
  }

  public update() {
    const selectedSelectionId = this.list.selectedOptions.selected.values().next().value.value;
    console.log(`update selection with id ${selectedSelectionId}`);
    this.router.navigate([`/selections/${selectedSelectionId}/update`]);
  }

  public create() {
    this.router.navigate(['/selections/create']);
  }

  public selectionChange(selected: MatListOption[]) {
    if (selected.length === 0) {
      this.isDeleteDisabled = true;
      this.isUpdateDisabled = true;
    } else if (selected.length === 1) {
      this.isUpdateDisabled = false;
      this.isDeleteDisabled = false;
    } else if (selected.length > 1) {
      this.isUpdateDisabled = true;
      this.isDeleteDisabled = false;
    }
  }
}
