import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {Init} from "../../../../assets/js/init";
import {DataService} from "../../../core/data.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',

  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit, AfterViewInit, AfterViewChecked {

  ngAfterViewChecked(): void {}

  private ps: Observable<any>;

  constructor(public data: DataService, private route: ActivatedRoute) {}

  product: any = {}

    /*{
    categories: ["מטפית"],
    description: "מוצר צמוייןח שלדמסש שלדמחסשדס שלחמדלסשד שלחדמסשמ",
    id: 1,
    options: [{type: "גודל", items: ["קטן", "גדול"]}],
    price: 200,
    reviews: [1],
    sku: "02051",
    tags: ["צדיקות"],
    title: "מטפחת ריו",
  }*/;

  ngOnInit(): void {
    this.ps = this.data.getProduct(this.route.snapshot.queryParams);
    this.ps.subscribe(product => {
      this.product = product[0];
      Init.first();
      Init.qtyBtn();
      Init.galleryPopup();
      Init.productZoom();
      Init.productGallerySlider();
    })


  }

  groupBy(options: any[], name: string) {
    let op = [];
    options.forEach(value => {

      let o = op.find(value1 => {
        return value1.type === (value[name])
      });
      if (!o)
        op.push({type: value[name], items: [value]})
      else
        o.items.push(value)
    });

    return op;
  }

  addToCart(p: any) {
    this.data.addToCart(p);
    Init.offcanvasOpen();
  }

  addToWish(p: any) {
    this.data.addToWithList(p);
    Init.offcanvasOpenWishlist();
  }

  ngAfterViewInit(): void {


  }
}
