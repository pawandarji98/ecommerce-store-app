import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentialsForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
              private auth:AuthService,
              private router: Router) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      mobile:['' , Validators.required],
      password:['' , [Validators.required , Validators.minLength(6)]]
    })
  }

  onSubmit() {
    this.auth.presentLoading("Please wait");
    if(this.credentialsForm.valid) {
      console.log("cred" , this.credentialsForm.value);
      this.auth.login(this.credentialsForm.value).subscribe((res) => {
        console.log("user" , res);
        this.auth.dismissLoading();
      } , (err) => {
        this.auth.dismissLoading();
        this.auth.showAlert(err.error.message);
      });
    } else {
      this.auth.dismissLoading();
      this.auth.showAlert("Please enter valid phone or password");
    }
  }

  register() {
    this.auth.register(this.credentialsForm.value).subscribe(res => {
      this.auth.login(this.credentialsForm.value).subscribe();
    })
  }

  NavigateRegister() {
    this.router.navigate(['/register']);
  }
}
