import { Component, OnInit } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
        .subscribe(products => this.products = products);
  }

  add(name: string, price: number): void {
    name = name.trim();
    if (!name || !price) { return; }
    this.productService.addProduct({ name, price } as Product)
      .subscribe(product => {
        this.products.push(product);
      });
  }

  delete(product: Product): void {
    this.products = this.products.filter(p => p !== product);
    this.productService.deleteProduct(product).subscribe();
  }
}
