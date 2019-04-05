import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, } from 'rxjs/operators';

import { Salesperson } from './salesperson';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SalespersonService {

  private salespeopleUrl = 'api/salespeople';

  constructor(private http: HttpClient) { }

  getSalespeople(): Observable<Salesperson[]> {
    return this.http.get<Salesperson[]>(this.salespeopleUrl)
          .pipe(catchError(this.handleError<Salesperson[]>([]))
    );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
