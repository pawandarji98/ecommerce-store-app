import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public auth: AuthService,
    private router:Router
  ) {
    this.auth.authenticationState.subscribe(state => {
      if(state) {
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  onClickItem(name) {
    this.auth.activePage = name;
  }
}
