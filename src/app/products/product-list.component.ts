import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    titleAppendMessage: string = '';
    imageWidth: number = 50;
    imageMargin: number = 2;
    imageVisible: boolean = false;
    errorMessage: string;
    private _listFilter: string;

    get listFilter (): string {
        return this._listFilter;
    }
    set listFilter (listFilter: string) {
        this._listFilter = listFilter;
        console.log("entered setter");
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    filteredProducts: IProduct [];
    products: IProduct [] = [];
    constructor(private productService: ProductService) {
    }
    toggleImage() : void {
        this.imageVisible = !this.imageVisible;
    };
    ngOnInit () : void {
        console.log ('inside OnInit');
        this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
    }
    performFilter(listFilter: string): IProduct[] {
        listFilter = listFilter.toLowerCase();
        return (this.products.filter((product: IProduct) => product.productName.toLowerCase().indexOf(listFilter) !== -1));
    }
    onRatingClicked(message:string): void {
        console.log (`rating clicked in parent component ${message}`)
        this.titleAppendMessage = " " + message;
    }
}
