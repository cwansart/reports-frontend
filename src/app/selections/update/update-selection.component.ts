import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateSelection, Selection } from '../selection';
import { SelectionService } from '../selection.service';

@Component({
  selector: 'app-update-selection',
  templateUrl: './update-selection.component.html',
  styleUrls: ['./update-selection.component.sass'],
})
export class UpdateSelectionComponent implements OnInit {
  private id: number;

  public title: FormControl = new FormControl(null, [Validators.required]);

  public description: FormControl = new FormControl('');

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SelectionService,
  ) {
  }

  public ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));

      this.service.getSelection(this.id).subscribe(selection => {
        this.title = new FormControl(selection.title, [Validators.required]);
        this.description = new FormControl(selection.description || '');
      });
    });
  }

  public updateSelection() {
    const selection: CreateSelection = {
      title: this.title.value,
      description: this.description.value,
    };

    console.log('update selection', selection);

    this.service.updateSelection(this.id, selection).subscribe(() => {
      console.log('finished update selection');
      this.router.navigate(['/selections']);
    });
  }

  public navigateBack() {
    this.router.navigate(['/selections']);
  }
}
