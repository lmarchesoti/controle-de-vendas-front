import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from './product';
import { Sale } from './sale';
import { Salesperson } from './salesperson';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products = [
      { id: 0, name: 'Caixa de Som', price: 50.37 },
      { id: 1, name: 'Pen Drive', price: 15.00 },
      { id: 2, name: 'Caneta esferográfica', price: 2.15 },
      { id: 3, name: 'Caneca térmica', price: 15.22 },
      { id: 4, name: 'Power bank', price: 70.99 }
    ];

    const sales = [];

    const salespeople = [
      { id: 0, name: 'Jonathan Smith' },
      { id: 1, name: 'Barbara' },
    ];

    return { products, sales, salespeople };
  }

  genId<T extends Product | Sale | Salesperson>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  }
}