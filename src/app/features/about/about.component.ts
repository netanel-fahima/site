import {Component, Input, NgZone, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay, filter} from 'rxjs/operators';
import {BehaviorSubject, pipe, Subject} from 'rxjs';

import {environment as env} from '../../../environments/environment';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  @Input() post = 727;
  public text: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public header: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, public zone: NgZone) {


  }

  ngOnInit(): void {
    const requestData = {
      url: `${env.origin}/wp-json/wp/v2/posts/${this.post}`,
      method: 'GET'
    };

    this.http.get<any>(requestData.url)
      .subscribe(value => {
        this.header.next(value.title.rendered);
        this.text.next(value.content.rendered);
      });
  }

}
