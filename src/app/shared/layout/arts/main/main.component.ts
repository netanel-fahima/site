import {Component, ChangeDetectionStrategy, AfterContentChecked, OnInit, AfterViewChecked} from '@angular/core';
import {Init} from "../../../../../assets/js/init";


@Component({
  selector: 'smart-main',
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements   OnInit , AfterViewChecked {


  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {

  }

}
