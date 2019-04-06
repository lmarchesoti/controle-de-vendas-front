import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Salesperson } from './salesperson';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

interface SalespersonGetResponse {
  _embedded: {
    salespeople: Salesperson[],
    _links: {self: {href: string}};
  };
}

@Injectable({
  providedIn: 'root'
})
export class SalespersonService {

  private salespeopleUrl = environment.apiURL + 'salespeople';

  constructor(private http: HttpClient) { }

  getSalespeople(): Observable<Salesperson[]> {
    return this.http.get<SalespersonGetResponse>(this.salespeopleUrl)
          .pipe(map(response => response._embedded.salespeople),
                catchError(this.handleError<Salesperson[]>([]))
    );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
