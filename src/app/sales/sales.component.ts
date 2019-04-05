import { Component, OnInit } from '@angular/core';

import { Sale } from '../sale';
import { SaleService } from '../sale.service';
import { Salesperson } from '../salesperson';
import { SalespersonService } from '../salesperson.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  sales: Sale[];
  salespeople: Salesperson[];
  products: Product[];

  constructor(
      private saleService: SaleService,
      private salespersonService: SalespersonService,
      private productService: ProductService
    ) { }

  ngOnInit() {
    this.getSales();
    this.getProducts();
    this.getSalespeople();
  }

  getSales(): void {
    this.saleService.getSales()
        .subscribe(sales => this.sales = sales);
  }

  getProducts(): void {
    this.productService.getProducts()
        .subscribe(products => this.products = products);
  }

  getSalespeople(): void {
    this.salespersonService.getSalespeople()
        .subscribe(salespeople => this.salespeople = salespeople);
  }

  add(salespersonId: number, productId: number): void {
    if (!salespersonId || !productId) { return; }
    const salesperson: Salesperson = this.salespeople.find(s => +s.id === +salespersonId);
    const product: Product = this.products.find(p => +p.id === +productId);
    this.saleService.addSale({ id: null, salespersonName: salesperson.name,
                               productName: product.name, price: product.price } as Sale)
      .subscribe(sale => {
        this.sales.push(sale);
      });
  }
}
