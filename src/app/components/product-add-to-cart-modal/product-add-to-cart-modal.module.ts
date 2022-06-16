import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductAddToCartModalPageRoutingModule } from './product-add-to-cart-modal-routing.module';

import { ProductAddToCartModalPage } from './product-add-to-cart-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductAddToCartModalPageRoutingModule
  ],
  declarations: [ProductAddToCartModalPage]
})
export class ProductAddToCartModalPageModule {}
