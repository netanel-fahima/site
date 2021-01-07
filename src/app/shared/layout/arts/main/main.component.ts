import {AfterContentInit, ChangeDetectionStrategy, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../../../core/data.service';
import {ProductDialogComponent} from '../../../../features/product/product-dialog/product-dialog.component';
import {OffcanvasCartComponent} from '../offcanvas-cart/offcanvas-cart.component';


@Component({
  selector: 'smart-main',
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, AfterContentInit {

  @ViewChild('app_offcanvas_cart', {static: true}) cartComponent: OffcanvasCartComponent;


  constructor(private data: DataService, private zone: NgZone) {
    this.data.loadNecessary();
  }

  ngOnInit(): void {


  }

  ngAfterViewChecked(): void {

  }

  ngAfterViewInit(): void {

  }

  ngAfterContentInit(): void {
  }

}
