import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductCategoryModalPage } from './product-category-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ProductCategoryModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductCategoryModalPageRoutingModule {}
