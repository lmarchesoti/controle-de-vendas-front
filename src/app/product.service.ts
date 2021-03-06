import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Product } from './product';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

interface ProductGetResponse {
  _embedded: {
    products: Product[],
    _links: {self: {href: string}};
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = environment.apiURL + 'products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<ProductGetResponse>(this.productsUrl)
          .pipe(map(response => response._embedded.products),
            catchError(this.handleError<Product[]>([]))
    );
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      catchError(this.handleError<Product>())
    );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  updateProduct(product: Product): Observable<any> {
    const url = `${this.productsUrl}/${product.id}`;
    return this.http.put(url, product, httpOptions).pipe(
      catchError(this.handleError<any>())
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, httpOptions).pipe(
      catchError(this.handleError<Product>())
    );
  }

  deleteProduct(product: Product | number): Observable<Product> {
    const id = typeof product === 'number' ? product : product.id;
    const url = `${this.productsUrl}/${id}`;

    return this.http.delete<Product>(url, httpOptions).pipe(
      catchError(this.handleError<Product>())
    );
  }
}
