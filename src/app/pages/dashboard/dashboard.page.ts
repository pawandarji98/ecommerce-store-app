import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { DashboardService } from 'src/app/services/dashboard.service';
declare const google;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit , AfterViewInit {
  nearbyStoreList:any = [];
  searchList:any = [];
  searchName;
  isSearchingOn:boolean = false;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  params = {
    page:1,
    limit:3,
    search:''
  };
  categories = [
    {name:'condom'},
    {name:'condom'},
    {name:'condom'},
    {name:'condom'}
  ];
  constructor(private authService:AuthService,
              private router: Router,
              private daashboardService:DashboardService) { }


  ngAfterViewInit(): void {
  }

  async ngOnInit() {
    this.authService.presentLoading("Getting near by stores");
    await this.getSubCategoryByCategoryId();
    await this.getnearbyShops();
  }

  getnearbyShops() {
    this.daashboardService.getStoresNearby('nalasopara').subscribe((res:any) => {
      if(res.status === "success") {
        this.nearbyStoreList = res.data;
      } else {
        console.log("No nearby store found");
      }
    } , (err) => {
      console.log("Error" , err);
    })
  }

  async onSearchMedicines() {
    if(this.searchName.length > 2) {
      this.isSearchingOn = true;
      this.params.search = this.searchName;
      await this.daashboardService.searchMedicinesByKey(this.params).subscribe((res:any) => {
        if(res.status === 'Success') {
          this.searchList = res.storesList;
        }
      } , (err) => {
        console.log("Error while getting search results");
      });
    }
  }

  onEnter() {
    this.isSearchingOn = true;
  }
  logout() {
    this.authService.logout();
  }

  onBackSpace() {
    if(this.searchName.length < 4) {
      this.isSearchingOn = false;
      this.params.page = 1;
      this.searchList = [];
    }
  }

  onClickStore(item) {
    this.router.navigate([`/store-detail/${item._id}`]);
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

  async getSubCategoryByCategoryId() {
    await this.daashboardService.getAllSubCategoriesByCategory().subscribe((res:any) => {
      if(res.status === 'Success') {
        this.categories = res.data;
        console.log("this.categories" , this.categories);
      }
    } , (err) => {
      console.log("Error while getting sub cateogries by category id" , err);
    });
  }

}
