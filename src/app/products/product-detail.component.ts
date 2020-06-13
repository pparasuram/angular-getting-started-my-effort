import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct;
  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string;
  id: number;
  // filteredProducts: IProduct [];
  selectedProducts: IProduct [] = [];
  products: IProduct [] = [];
  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) {
    console.log(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${this.id}`;
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.selectedProducts = products;
        console.log ('prod detail 1 ' + JSON.stringify(this.products));
        this.product = this.products.filter (product =>
            (product.productId === this.id))[0];
        console.log ('new new prod detail ' + this.selectedProducts);
      },
      error: err => this.errorMessage = err
    });
  }
  onBack(): void {
    this.router.navigate(['/products']);
  }
}
