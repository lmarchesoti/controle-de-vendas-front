import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Sale } from './sale';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private salesUrl = 'api/sales';

  constructor(private http: HttpClient) { }

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.salesUrl)
          .pipe(catchError(this.handleError<Sale[]>([]))
    );
  }

  getSale(id: number): Observable<Sale> {
    const url = `${this.salesUrl}/${id}`;
    return this.http.get<Sale>(url).pipe(
      catchError(this.handleError<Sale>())
    );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  addSale(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(this.salesUrl, sale,
           httpOptions).pipe(
              catchError(this.handleError<Sale>())
    );
  }
}
