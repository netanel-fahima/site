import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {Init} from "../../../../assets/js/init";
import {DataService} from "../../../core/data.service";
import {PageTitleSectionComponent} from "../../../shared/layout/arts/page-title-section/page-title-section.component";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})



export class ProductDetailsComponent implements OnInit , AfterViewChecked {


  constructor(public data: DataService,private store: Store<any>) {}

  product: any = {
    categories: ["מטפית"],
    description: "מוצר צמוייןח שלדמסש שלדמחסשדס שלחמדלסשד שלחדמסשמ",
    id: 1,
    options: [{type: "גודל", items: ["קטן", "גדול"]}],
    price: 200,
    reviews: [1],
    sku: "02051",
    tags: ["צדיקות"],
    title: "מטפחת ריו",
  };

  ngOnInit(): void {

  }

  ngAfterViewChecked(): void {
    Init.first();
    Init.qtyBtn();
    Init.galleryPopup();
    Init.productZoom();
    Init.productGallerySlider();
  }

}
