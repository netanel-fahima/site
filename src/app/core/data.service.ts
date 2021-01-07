import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RestService} from './rest/rest.service';
import {AsyncSubject, BehaviorSubject, EMPTY, forkJoin, from, Observable, Subject} from 'rxjs';
import {Params} from '@angular/router';
import {filter, shareReplay} from 'rxjs/operators';

function initUser() {
  const signed = localStorage.getItem('signed');
  if(!signed)
    localStorage.setItem('signed',JSON.stringify( {id: 1, profile: `GUEST` , firstName:'אורח'}));
  return localStorage.getItem('signed');
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  public productImages: any[] = [
    'assets/images/product/single/1/product-1.jpg',
    'assets/images/product/single/1/product-2.jpg',
    'assets/images/product/single/1/product-3.jpg',
    'assets/images/product/single/1/product-4.jpg'
  ];
  public productImagesZoom: any[] = [
    'assets/images/product/single/1/product-zoom-1.jpg',
    'assets/images/product/single/1/product-zoom-2.jpg',
    'assets/images/product/single/1/product-zoom-3.jpg',
    'assets/images/product/single/1/product-zoom-4.jpg',
  ];

  public user: any ;

  public userDetail: BehaviorSubject<any> = new BehaviorSubject<any>(JSON.parse(initUser()));

  public categories: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  public productAsync: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  public cart: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  public wishList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  public orders: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);


  public restService: RestService = RestService.getInstace('', this.http);

  constructor(private http: HttpClient) {
  }

  public loadNecessary() {

    this.restService.category().list()
      .pipe(
        shareReplay(),
      ).subscribe(value => {
      this.categories.next(value);
    });




    this.restService.cart().list().subscribe((data)=>{
      this.cart.next(data)
    });


  }

  public createCartItem(product: any) {
    return {
      cartId: this.cart.getValue()[0].id,
      productId: product.id,
      sku: product.sku,
      quantity: 1,
      createdAt: '2020-10-01 00:00:00' /*asString("YYYY-MM-DD HH:mm:ss", new Date())*/
    };
  }

  public createCart() {
    return {
      userId: this.user?.id,
      sessionId: new Date().getTime(),
      token: 1,
      status: 0,
      createdAt: '2020-10-01 00:00:00'
    };
  }

  public addToCart(p: any) {


  }

  public totalCart() {
    let total = 0;
    // this.cartList.getValue()[0].items.forEach(
    //   (c: any) => {
    //     total += c?.product.price * c.quantity;
    //   }
    // );
    return total;
  }

  public removeCart(p) {

  }

  public updateCartItems() {

  }

  addToWithList(product: any) {

  }

  public removeWishList(wish) {

  }



  public setUser() {
    const signed = localStorage.getItem('signed');
    this.user = JSON.parse(signed);
    this.userDetail.next(this.user);
  }

  signOut() {

  }

  getStatus(o: any) {
  }

  getCartsItem() {

  }

  getProduct(params: Params): Observable<any> {
    return this.restService.product().post({data: params, cmd: '/details'});
  }

}
