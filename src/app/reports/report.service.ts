import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateReport, Report } from './report';

@Injectable({
  providedIn: 'root',
})
export class ReportService {

  private url = 'http://localhost:9080/report_war/api/reports';

  public constructor(
    private http: HttpClient,
  ) {
  }

  public getReport(date: string): Observable<HttpResponse<Report>> {
    console.log(`report service: delete report with creation date ${date}`);
    return this.http.get<Report>(`${this.url}/${date}`, {observe: 'response'});
  }

  public saveReport(report: CreateReport): Observable<string> {
    console.log('report service: create new report');
    return this.http.post<string>(this.url, report);
  }

  public updateReport(report: CreateReport): Observable<string> {
    console.log('report service: update report');
    return this.http.put<string>(this.url, report);
  }
}
