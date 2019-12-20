import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateSelection } from '../selection';
import { SelectionService } from '../selection.service';

@Component({
  selector: 'app-create-selection',
  templateUrl: './create-selection.component.html',
  styleUrls: ['./create-selection.component.sass'],
})
export class CreateSelectionComponent {

  public title = new FormControl(null, [Validators.required]);

  public description = new FormControl('');

  public constructor(
    private service: SelectionService,
    private router: Router,
  ) {
  }

  public saveSelection() {
    const selection: CreateSelection = {
      title: this.title.value,
      description: this.description.value,
    };

    console.log('saving selection', selection);

    this.service.createSelection(selection).subscribe(() => {
      console.log('finished saving selection');
      this.router.navigate(['/selections']);
    });
  }

  public navigateBack() {
    this.router.navigate(['/selections']);
  }
}
