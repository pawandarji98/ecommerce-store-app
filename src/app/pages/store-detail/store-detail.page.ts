import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ProductAddToCartModalPage } from 'src/app/components/product-add-to-cart-modal/product-add-to-cart-modal.page';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { StoreService } from 'src/app/services/store.service';
import {ProductCategoryModalPage} from './../../components/product-category-modal/product-category-modal.page';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.page.html',
  styleUrls: ['./store-detail.page.scss'],
})
export class StoreDetailPage implements OnInit {
  productsList:any = [];
  storeDetailList:any;
  storeId:string;
  searchList = [];
  searchName;
  categoryList:[];
  params = {
    page:1,
    limit:3,
    search:'',
    storeId:'',
    productSubCategoryId:''
  };
  isSearchingOn:boolean = false;
  constructor(private storeService:StoreService,
              private route: ActivatedRoute,
              private daashboardService:DashboardService,
              private modalCtrl:ModalController,
              private authService: AuthService) { }

  async ngOnInit() {
    if (await this.route.snapshot.paramMap.get('id')) {
      this.storeId = await this.route.snapshot.paramMap.get('id');
      await this.getAllSubCategories();
      await this.getStoreDetailData(this.storeId);
    }
  }

  async getStoreDetailData(storeId) {
    this.authService.presentLoading("Getting products");
    this.params.storeId = storeId;
    await this.storeService.getStoreDetailData(this.params).subscribe(async (res:any) => {
      if(res.status === 'Success') {
        this.authService.dismissLoading();
        this.productsList = await res.StoreDetaildata.products;
        this.storeDetailList = await res.StoreDetaildata.store;
      }
    } , (err) => {
      console.log('Error while getting store products' , err);
    });
  }

  async onSearchMedicines() {
    if(this.searchName.length > 2) {
      this.isSearchingOn = true;
      await this.storeService.searchProductsByStore(this.searchName , this.storeDetailList._id).subscribe((res:any) => {
        if(res.status === 'Success') {
          this.searchList = res.productDetailData;
        }
      } , (err) => {
        console.log("Error while getting products" , err);
      });
    }
  }

  onEnter() {
    this.isSearchingOn = true;
  }

  onBackSpace() {
    if(this.searchName.length < 4) {
      this.isSearchingOn = false;
    }
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      let params = this.params;
      params.page += 1;
      params.search = this.searchName;
      this.daashboardService.searchMedicinesByKey(params).subscribe((res:any) => {
        if(res.status === 'Success') {
          this.searchList = this.searchList.concat(res.productDetailData);
          event.target.disabled = true;
        }
      } , (err) => {
        console.log("Error while getting search results");
      });
    }, 500);
  }

  async onCategoryModal() {
    const modal = await this.modalCtrl.create({
      component:ProductCategoryModalPage,
      cssClass:'transparent-modal',
      componentProps: { categories: this.categoryList }
    });
    modal.onDidDismiss().then((dataReturned:any) => {
      if (dataReturned !== null) {
        this.params.productSubCategoryId = dataReturned.data._id;
        this.getStoreDetailData(this.storeId);
      }
    });
    await modal.present();
  }

  async onAddToCartModal(data) {
    const modal = await this.modalCtrl.create({
      component:ProductAddToCartModalPage,
      cssClass:'small-modal',
      componentProps: { productData: data}
    });
    await modal.present();
  }

  async getAllSubCategories() {
    await this.daashboardService.getAllSubCategoriesByCategory().subscribe((res:any) => {
      if(res.status === 'Success') {
        this.categoryList = res.data;
      }
    } , (err) => {
      console.log("Error while getting all sub categories" , err);
    });
  }

}
