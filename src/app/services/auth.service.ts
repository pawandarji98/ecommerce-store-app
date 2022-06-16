import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import {tap , catchError} from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
const TOKEN_KEY = 'access-token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.url;
  user = null;
  authenticationState = new BehaviorSubject(false);
  activePage:string;

  constructor(private http:HttpClient,
              private helper:JwtHelperService,
              private storage:Storage,
              private plt:Platform,
              private alertContrller:AlertController,
              public loadingController: LoadingController) {
                this.plt.ready().then(() => {
                  this.checkToken();
                });
              }
  
  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if(token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);

        if(!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY);
        }
      }
    });
  }

  register(credentials) {
    return this.http.post(`${this.url}/users/signup` , credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }

  showAlert(msg) {
    let alert = this.alertContrller.create({
      message:msg,
      header:'Error',
      buttons:['OK']
    });
    alert.then(alert => alert.present());
  }

  login(credentials) {
    return this.http.post(`${this.url}/users/login` , credentials , {})
    .pipe(
      tap(res => {
        this.storage.set(TOKEN_KEY , res['token']);
        this.user = this.helper.decodeToken(res['token']);
        this.authenticationState.next(true);
      }),
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    )
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  presentLoading(msg) {
    this.loadingController.create({
      message: msg,
      duration: 1000
    }).then((response) => {
      response.present();
      response.onDidDismiss().then((response) => {
        console.log('Loader dismissed', response);
      });
    });
  } 

  dismissLoading() {
    this.loadingController.dismiss().then((response) => {
  }).catch((err) => {
      console.log('Error occured loader : ', err);
  });
  }
}
