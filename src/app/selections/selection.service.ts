import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateSelection, Selection } from './selection';

@Injectable({
  providedIn: 'root',
})
export class SelectionService {

  private url = 'http://localhost:9080/report_war/api/selections';

  public constructor(
    private http: HttpClient,
  ) {
  }

  public getSelection(id: number): Observable<Selection> {
    console.log(`selection service: get selection with id ${id}`);
    return this.http.get<Selection>(`${this.url}/${id}`);
  }

  public getAllSelections(): Observable<Selection[]> {
    console.log('selection service: get all selections');
    return this.http.get<Selection[]>(this.url);
  }

  public createSelection(selection: CreateSelection): Observable<string> {
    console.log('selection service: create selection');
    return this.http.post<string>(this.url, selection);
  }

  public deleteSelection(id: number): Observable<void> {
    console.log(`selection service: delete selection with id ${id}`);
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  public updateSelection(id: number, selection: CreateSelection): Observable<void> {
    console.log(`selection service: update selection with id ${id}`);
    return this.http.put<void>(`${this.url}/${id}`, selection);
  }
}
