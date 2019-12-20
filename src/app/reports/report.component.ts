import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Selection } from '../selections/selection';
import { SelectionService } from '../selections/selection.service';
import { CreateReport, Report } from './report';
import { ReportService } from './report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.sass']
})
export class ReportComponent implements OnInit {

  public freeTextControl = new FormControl('');

  public dateControl = new FormControl({
    value: new Date(),
    disabled: true,
  });

  public report: Report|CreateReport;

  public selections: Observable<Selection[]>;

  public isSelected = [];

  public isNewReport: boolean;

  public saved = false;

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportService,
    private selectionService: SelectionService,
  ) {
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const date = params.get('control');
      this.dateControl.setValue(new Date(date));
      this.isSelected = [];
      this.reportService.getReport(date).subscribe(respone => {
        if (respone.status === 200) {
          this.report = respone.body;
          this.freeTextControl = new FormControl(this.report.freeText);
          this.report.selection.forEach(s => this.isSelected[s.id] = true);
          this.isNewReport = false;
        }
      }, () => {
        this.freeTextControl = new FormControl();
        this.isNewReport = true;
      });
      this.selections = this.selectionService.getAllSelections();
    });
  }

  public saveReport(): void {
    const selectedIds = this.isSelected.reduce((result: number[], isSelected: boolean|undefined, index: number) => {
      if (isSelected === true) {
        result.push(index);
      }
      return result;
    }, []);

    const report: CreateReport = {
      creationDate: this.dateControl.value.toISOString().split('T')[0],
      freeText: this.freeTextControl.value,
      selectionIds: selectedIds,
    };

    if (this.isNewReport) {
      console.log('saving new report', report);

      this.reportService.saveReport(report).subscribe(() => {
        this.isNewReport = false;
        console.log('finished saving new report');
        this.showSaveInfo();
      });
    } else {
      console.log('updating report', report);

      this.reportService.updateReport(report).subscribe(() => {
        console.log('finished updating report');
        this.showSaveInfo();
      });
    }
  }

  private showSaveInfo(): void {
    this.saved = true;
    setTimeout(() => this.saved = false, 10000);
  }

  public updateSelection(id: number) {
    this.isSelected[id] = !this.isSelected[id];
  }

  public goToDate(date: Date) {
    this.router.navigate(['/reports', date.toISOString().split('T')[0]]);
  }

  public goToSettings(): void {
    this.router.navigate(['/selections']);
  }
}
