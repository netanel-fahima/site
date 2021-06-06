import {Injectable} from '@angular/core';
import {getImageName} from '../../features/product/utils/productUtil';
import {Cloudinary} from '@cloudinary/angular-5.x';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private cloudinary: Cloudinary) {
  }

  public getImages(product: any, index: number = 0, options: object): string[] {
    return product.images.map((image) => {
      return this.getImageSrc(image.src, options);
    });
  }

  public getImage(product: any, options: object, index: number = 0): string {
    return this.getImageSrc(product.images?.[index]?.name, options);
  }

  public getImageSrc(src, options, defImg = 'assets/images/product/cart-product-1.jpg'): string {
    if (!src) {
      return defImg;
    }
    const img = this.cloudinary.url(src, options);

    return img;
  }


  private randomIntFromInterval(min, max): number { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public randomImg(): string {
    return 'img-bg-' + this.randomIntFromInterval(0, 18);
  }
}
