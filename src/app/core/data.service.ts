import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RestService} from "./rest/rest.service";
import {BehaviorSubject, EMPTY, forkJoin, Observable, Subject} from "rxjs";
import {Params} from "@angular/router";
import {map, publishReplay, refCount, take} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})

export class DataService {

  public productImages: any[] = [
    "assets/images/product/single/1/product-1.jpg",
    "assets/images/product/single/1/product-2.jpg",
    "assets/images/product/single/1/product-3.jpg",
    "assets/images/product/single/1/product-4.jpg"
  ];
  public productImagesZoom: any[] = [
    "assets/images/product/single/1/product-zoom-1.jpg",
    "assets/images/product/single/1/product-zoom-2.jpg",
    "assets/images/product/single/1/product-zoom-3.jpg",
    "assets/images/product/single/1/product-zoom-4.jpg",
  ];


  public user: any = {};
  public categories: Observable<any[]>;
  public product: any[] = [];
  public productAsync: Observable<any[]>;

  public cart: any = {};


  public cartItem: any[] = [];
  public cartEvent: EventEmitter<any> = new EventEmitter<any>();
  public menuSubject: Subject<any> = new BehaviorSubject<any>(this.cartItem);
  public menuActive = this.menuSubject.asObservable();

  private _wishList = [];
  public wishList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this._wishList);

  public orders: any[] = [];
  public orderItem: any[] = [];
  public transaction: any = {};


  private categoryRest: RestService = new RestService("category", this.http);
  private productRest: RestService = new RestService("product", this.http);

  public cartItemRest: RestService = new RestService("cart_item", this.http);
  private cartRest: RestService = new RestService("cart", this.http);

  public orderRest: RestService = new RestService("order", this.http);
  private orderItemRest: RestService = new RestService("order_item", this.http);

  constructor(private http: HttpClient) {
    /*    this.menuActive.subscribe(new Subscriber(value => {
          setInterval(() => {
            this.menuSubject.next(this.cartItem);
          },1000)
        }))*/
  }

  public loadNecessary() {

    this.user = JSON.parse(localStorage.getItem("signed"));

    this.categories = this.categoryRest.list().pipe(
      publishReplay(1),
      refCount(),
      take(10),
    );

    this.productAsync = this.productRest.list().pipe(publishReplay(1), refCount());

    forkJoin(
      {
        productAsync: this.productAsync,
        cartList: this.user ? this.cartRest.listBy({userId: this.user.id}) : EMPTY,
      }
    ).subscribe(value => {
      this.product = value.productAsync;
      this.cart = Array.isArray(value.cartList) ? value.cartList[value.cartList.length - 1] : null;
      if (!this.cart) {
        this.cartRest.insert(this.createCart()).subscribe(c => {
          this.cart = {id: c.insertId};
        })
      }
    });

  }

  public loadCartItem() {
    this.cartItemRest.listBy({cartId: this.cart.id}).subscribe(value => {
      // product to cart
      value.forEach(item => {
        item.product = this.product.find(value => {
          return value.id === item.productId
        });
        if (!!item.product)
          this.cartItem.push(item);
      });
    });
  }

  public loadOrders() {
    this.orderRest.listBy({userId: this.user.id}).subscribe(value => {
      this.orders = value;
    });
  }

  public createCartItem(product: any) {
    return {
      cartId: this.cart.id,
      productId: product.id,
      sku: product.sku,
      quantity: 1,
      createdAt: "2020-10-01 00:00:00" /*asString("YYYY-MM-DD HH:mm:ss", new Date())*/
    }
  }

  public createCart() {
    return {
      userId: this.getUserName().id,
      sessionId: new Date().getTime(),
      token: 1,
      status: 0,
      createdAt: "2020-10-01 00:00:00"
    }
  }


  public addToCart(p: any) {

    let found = this.cartItem.find(value => {
      return value?.product.id === p.id
    });

    if (!found) {
      let item = this.createCartItem(p);
      this.cartItemRest.insert(item).subscribe(value => {
        item["product"] = p;
        item["id"] = value.insertId;
        this.cartItem.push(item);
      });
    }

  }


  public totalCart() {
    let total = 0;
    this.cartItem.forEach(
      (c: any) => {
        total += c?.product.price * c.quantity;
      }
    );
    return total;
  }


  public removeCart(p) {
    console.log("remove cart ", p);
    forkJoin({
      delete: this.cartItemRest.delete(p),
    }).subscribe(value => {
      this.cartItem = this.cartItem.filter(c => c.product.id !== p.product.id);
    });
  }

  public updateCartItems() {
    this.cartItem.forEach(value => {
      this.cartItemRest.update(value).subscribe()
    })
  }


  addToWithList(product: any) {
    console.log("add to wish list ", product);
    this._wishList.push(product);
  }

  public removeWishList(wish) {
    this._wishList = this._wishList.filter(w => w.id !== wish.id);
    this.wishList.next(this._wishList);
  }

  public getUserName() {
    let signed = localStorage.getItem("signed");
    if (signed)
      return JSON.parse(signed).firstName;
    return "";
  }

  public getUser() {
    let signed = localStorage.getItem("signed");
    if (signed)
      return JSON.parse(signed);
    return {id: Math.random(), profile: "GUEST"};
  }

  signOut() {
    localStorage.removeItem("signed");
  }

  getStatus(o: any) {

  }

  getCartsItem() {
    return this.cartItem;
  }

  getProduct(params: Params): Observable<any> {
    return this.productRest.post(params, "/details")
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
