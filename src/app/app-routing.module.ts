import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'shopping-cart',
    loadChildren: () => import('./pages/shopping-cart/shopping-cart.module').then( m => m.ShoppingCartPageModule)
  },
  {
    path: 'store-detail/:id',
    loadChildren: () => import('./pages/store-detail/store-detail.module').then( m => m.StoreDetailPageModule)
  },
  {
    path: 'product-category-modal',
    loadChildren: () => import('./components/product-category-modal/product-category-modal.module').then( m => m.ProductCategoryModalPageModule)
  },
  {
    path: 'product-add-to-cart-modal',
    loadChildren: () => import('./components/product-add-to-cart-modal/product-add-to-cart-modal.module').then( m => m.ProductAddToCartModalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
