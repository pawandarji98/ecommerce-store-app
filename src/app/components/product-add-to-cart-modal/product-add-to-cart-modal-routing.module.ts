import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductAddToCartModalPage } from './product-add-to-cart-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ProductAddToCartModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductAddToCartModalPageRoutingModule {}
