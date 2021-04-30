import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/internal/Observable';
import {EntityType} from '../store/actions';

@Injectable({
  providedIn: 'any'
})
export class WooApi {

  constructor(private api: ApiService) {
  }

  public getEntity(cmd: EntityType): Observable<any> {
    return this.api.get(cmd);
  }

  public addEntity(cmd: EntityType, p: any): Promise<any> {
    return this.api.post(cmd, p);
  }


  public deleteEntity(id: any, cmd: EntityType): Promise<any> {
    return this.api.delete(`${cmd}/${id}`);
  }

}
