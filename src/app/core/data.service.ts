import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public productImages : any[] = [
    "assets/images/product/single/1/product-1.jpg",
    "assets/images/product/single/1/product-2.jpg",
    "assets/images/product/single/1/product-3.jpg",
    "assets/images/product/single/1/product-4.jpg"
  ];
  public productImagesZoom : any[] = [
    "assets/images/product/single/1/product-zoom-1.jpg",
    "assets/images/product/single/1/product-zoom-2.jpg",
    "assets/images/product/single/1/product-zoom-3.jpg",
    "assets/images/product/single/1/product-zoom-4.jpg",
  ];

  public wishList: any[] = [
    {
      id: 2,
      title: "MOMO",
      price: 20,

    }
  ];

  public products: any[] = [
    {
      id: 1,
      title: "RIO",
      price: 20,

    }
  ];

  public cart: any[] = [
    {
      id: 2,
      title: "MOMO",
      price: 20,
      quantity: 1

    }
  ];

  public categories: any[];

  constructor() {
  }


  public addToCart(p : any) {
    let as = this.cart.find(value => {return value.id === p.id});
    if(!as){
      this.cart.push(p)
    }
  }

  public totalCart() {
    let total = 0;
    this.cart.forEach(value => {
      total += value.price;
    });
    return total;
  }

  public removeCart(cart) {
    this.cart = this.cart.filter(h => h.id !== cart.id)
  }
}

export interface Product {
  reviews: any[];
  tags: string[];
  categories: any[];
  sku: string;
  options: [{ type: string, items: string[] }];
  description: string;
  id: number,
  title: string,
  price: number,
}
