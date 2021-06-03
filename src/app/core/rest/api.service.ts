import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import { Router } from '@angular/router';
// import { AuthService } from './auth.service';
import {environment as env} from '../../../environments/environment';
import * as OAuth from 'oauth-1.0a';
import * as CryptoJS from 'crypto-js';
import * as $ from 'jquery';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'any'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  private basicAuth(key, secret): OAuth {
    const oauth = new OAuth({
      consumer: {
        key: env.woocommerce.consumer_key,
        secret: env.woocommerce.consumer_secret
      },
      signature_method: 'HMAC-SHA1',
      hash_function: function(base_string, key) {
        return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(base_string, key));
      }
    });

    return oauth;
  }

  public get(cmd: string, args: object): Observable<any> {

    const auth = this.basicAuth(env.woocommerce.consumer_key, env.woocommerce.consumer_secret);
    const requestData = {
      url: `${env.origin}/${env.wcEndpoint}/${cmd}`,
      method: 'GET'
    };

    const params = env.production ? {...{per_page: '100'}, ...args} : {};
    console.log(requestData.url);
    return this.http.get<any>(
      requestData.url +
      (env.production ? `?consumer_key=${env.woocommerce.consumer_key}&consumer_secret=${env.woocommerce.consumer_secret}`
        : '?' + $.param(auth.authorize(requestData))),
      {params}
    )
      .pipe(
        map((data) => {
          return data;
        }),
        //   tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  public put(cmd: string, body: object): Promise<object> {
    return this.post(cmd, body, 'PUT');
  }

  public async post(cmd: string, body: object, method = 'POST'): Promise<object> {
    const auth = this.basicAuth(env.woocommerce.consumer_key, env.woocommerce.consumer_secret);
    const requestData = {
      url: `${env.origin}/${env.wcEndpoint}/${cmd}`,
      method
    };

    return new Promise((resolve, reject) => {
      let response = null;
      try {
        response = fetch(requestData.url + '?' + $.param(auth.authorize(requestData)), {
          method, // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          body: JSON.stringify(body) // body data type must match "Content-Type" header
        });
        response.then(value => {
          resolve(value.json());
        }).catch(err => reject(err));
      }
      catch (e) {
        reject(e);
      }
    });

  }


  public async delete(cmd: string): Promise<object> {
    const auth = this.basicAuth(env.woocommerce.consumer_key, env.woocommerce.consumer_secret);
    const requestData = {
      url: `${env.origin}/${env.wcEndpoint}/${cmd}`,
      method: 'DELETE'
    };

    const response = await fetch(requestData.url + '?' + $.param(auth.authorize(requestData)), {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      redirect: 'follow', // manual body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  }


  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err?.error?.message}`;
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clu es as to what went wrong,
      errorMessage = `Backend returned code ${err?.status}: ${err?.body?.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }


}
