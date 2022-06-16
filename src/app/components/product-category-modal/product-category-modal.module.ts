import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductCategoryModalPageRoutingModule } from './product-category-modal-routing.module';

import { ProductCategoryModalPage } from './product-category-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductCategoryModalPageRoutingModule
  ],
  declarations: [ProductCategoryModalPage]
})
export class ProductCategoryModalPageModule {}
