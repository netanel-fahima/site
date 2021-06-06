import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Init} from '../../../../../assets/js/init';
import {Router} from '@angular/router';
import {EntityService} from '../../../../core/store/entity.service';
import {ImageServiceService} from '../../../../core/utils/image-service.service';
import {getImageName} from '../../../../features/product/utils/productUtil';

@Component({
  selector: 'app-offcanvas-search',
  templateUrl: './offcanvas-search.component.html',
  styleUrls: ['./offcanvas-search.component.css']
})
export class OffcanvasSearchComponent implements OnInit, AfterViewChecked {

  name: any;

  ngAfterViewChecked(): void {

  }

  constructor(public data: EntityService, private router: Router, public imgService: ImageServiceService) {
  }

  ngOnInit(): void {
    Init.select2();
  }

  getImage(product: any): string {
    const src = product.images?.[0]?.src ? this.imgService.getImageSrc(product.images?.[0].src,
      {height: 437, width: 328, crop: 'fill'}) : 'sample';
    return src;
  }
}
