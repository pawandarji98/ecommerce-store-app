import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-product-category-modal',
  templateUrl: './product-category-modal.page.html',
  styleUrls: ['./product-category-modal.page.scss'],
})
export class ProductCategoryModalPage implements OnInit {
  @Input() categories:any;
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }

  onDismissModal() {
    this.modalCtrl.dismiss();
  }

  onClickCategory(data){
    this.modalCtrl.dismiss(data);
  }

}
