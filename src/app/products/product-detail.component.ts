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
  selectedProducts: IProduct [];
  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) {
    console.log(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${this.id}`;
    this.productService.getProducts().subscribe({
      next: products => {
        this.selectedProducts =
          products.filter (product =>
            (product.productId === this.id));
            console.log ('new new prod detail ' + this.selectedProducts);
      },
      error: err => this.errorMessage = err
  });

    this.product = this.selectedProducts.length > 0 ? this.selectedProducts[0] : {} as IProduct;
  }
  onBack(): void {
    this.router.navigate(['/products']);
  }
}
