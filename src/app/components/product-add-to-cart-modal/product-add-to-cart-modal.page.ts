import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-product-add-to-cart-modal',
  templateUrl: './product-add-to-cart-modal.page.html',
  styleUrls: ['./product-add-to-cart-modal.page.scss'],
})
export class ProductAddToCartModalPage implements OnInit {
  @Input() productData:any;
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
    console.log(this.productData);
  }

  onCloseModal() {
    this.modalCtrl.dismiss();
  }

}
