import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap,map } from 'rxjs/operators';
import Maper from './mapFromServer'

export class RestService {

  private maper : Maper = new Maper
  private name: string;
  private url = 'http://localhost/wordpress/wp-json/wc/store';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic Y2tfNzA0ZWMwM2VhZGMwYjY1ZGNmMDRjOTgwMDJhZWMyMzlmOGI1ZDUxODpjc180MTQ0NTQ0Nzk2NTMyNDYxZGIzOGQwMDk3NDMxYTgzMmY5ZjE0YTI5'
    })
  };

  constructor(name: string, private http: HttpClient) {
    this.name = name;
    this.url += `/${name}`;
  }

  static getInstace(name: string, http: HttpClient) {
    return new RestService(name, http);
  }

  category(): RestService {
    return new RestService('products/categories', this.http);
  }


  product(): RestService {
    return new RestService('products', this.http);
  }

  cartItem(): RestService {
    return new RestService('cart_item', this.http);
  }

  cart(): RestService {
    return new RestService('cart', this.http);
  }

  order(): RestService {
    return new RestService('order', this.http);
  }

  orderItem(): RestService {
    return new RestService('order_item', this.http);
  }



  /** GET itemes from the server */
  read(): Observable<any> {
    return this.http.get<any>(this.url)
      .pipe(
        map((data:any) => this.maper.maper(this.name,data)),
        tap(_ => this.log('fetched itemes')),
        catchError(this.handleError<any[]>('getHeroes', []))
      );
  }

  /** GET itemes from the server */
  list(): Observable<any[]> {
    return this.http.get<any[]>(this.url)
      .pipe(
        map((data:any) => this.maper.maper(this.name,data)),
        tap(_ => this.log('fetched itemes')),
        catchError(this.handleError<any[]>('getHeroes', []))
      );
  }


  /** GET item by id. Will 404 if id not found */
  get(id: number): Observable<any[]> {
    const url = `${this.url}/${id}`;
    return this.http.get<any[]>(url).pipe(
      tap(_ => this.log(`fetched item id=${id}`)),
      catchError(this.handleError<any[]>(`getHero id=${id}`))
    );
  }

  /* GET itemes whose name contains search term */
  search(term: string): Observable<any[]> {
    if (!term.trim()) {
      // if not search term, return empty item array.
      return of([]);
    }
    return this.http.get<any[]>(`${this.url}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found itemes matching "${term}"`) :
        this.log(`no itemes matching "${term}"`)),
      catchError(this.handleError<any[]>('searchHeroes', []))
    );
  }


  post({ data, cmd = '' }: { data: any, cmd?: string }): Observable<any> {
    return this.http.post<any>(`${this.url.replace('store','v3')}${cmd}`, data, this.httpOptions).pipe(
      tap((entity: any) => this.log(`${entity}`)),
      catchError(this.handleError<any>('postError'))
    );
  }

  /** POST: add a new item to the server */
  listBy(item: any): Observable<any[]> {
    return this.http.post<any[]>(this.url + '/list', item, this.httpOptions).pipe(
      tap((newHero: any[]) => this.log(`added item w/ id=${newHero}`)),
      catchError(this.handleError<any[]>('addHero'))
    );
  }

  /** DELETE: delete the item from the server */
  delete(item: any | number): Observable<any[]> {
    const id = typeof item === 'number' ? item : item.id;
    const url = `${this.url}/delete/${id}`;

    return this.http.get<any[]>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted item id=${id}`)),
      catchError(this.handleError<any[]>('deleteHero'))
    );
  }

  /** PUT: update the item on the server */
  update(item: any): Observable<any> {
    return this.http.post(this.url + '/update', item, this.httpOptions).pipe(
      tap(_ => this.log(`updated item id=${item.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  insert(item: any): Observable<any> {
    return this.http.post(this.url + '/insert', item, this.httpOptions).pipe(
      tap(_ => this.log(`updated item id=${item.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // alert(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(mas: string) {
    console.log(mas);
  }

}
