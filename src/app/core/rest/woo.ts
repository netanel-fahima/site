import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/internal/Observable';
import {EntityType} from '../store/actions';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'any'
})
export class WooApi {


  constructor(private http: HttpClient, private api: ApiService) {

  }


  public async postCoCart(cmd: any, payload: any): Promise<any> {
    return this.api.post(`${cmd}/add-item`, payload, 'POST', 'wp-json/cocart/v2');
  }


  public async postCoupon(cmd: any, payload: any): Promise<any> {
    return this.api.post(`${cmd}`, payload, 'POST', 'wp-json/cocart/v1');
  }

  public getCoCart(payload: any): Observable<any> {
    return this.api.get('cart', payload, 'wp-json/cocart/v2');
  }


  public async deleteCoCart({id, cart_key}: any): Promise<any> {
    return this.api.delete(`/${id}?cart_key=cd65fc3efac58de0088cebde953a4568`, 'wp-json/cocart/v2/cart/item');
  }


  public async putCoCart(payload: any): Promise<any> {
    return this.api.put('add-item', payload, 'wp-json/cocart/v2/cart');
  }

  public getEntity(cmd: EntityType, params: object): Observable<any> {
    return this.api.get(cmd, params);
  }

  public addEntity(cmd: EntityType, p: any): Promise<any> {
    return this.api.post(cmd, p);
  }

  public updateEntity(cmd: EntityType, p: any): Promise<any> {
    return this.api.put(cmd, p);
  }


  public deleteEntity(id: any, cmd: EntityType): Promise<any> {
    return this.api.delete(`${cmd}/${id}`);
  }

}
