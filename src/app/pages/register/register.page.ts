import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { format, parseISO } from 'date-fns';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  credentialsForm:FormGroup;
  GenderDBOptions = [
    {name:'male'},
    {name:'female'},
    {name:'other'},
  ];
  gender:any;
  DOB:any;
  dateValue;
  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router:Router) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      mobile:['' , Validators.required],
      name:['' , Validators.required],
      email:['' ,],
      password:['' , [Validators.required , Validators.minLength(6)]],
      passwordConfirm:['' , [Validators.required , Validators.minLength(6)]],
      address:['' , Validators.required],
      pincode:['' , Validators.required],
      gender:['' , Validators.required],
      dob:['' , Validators.required],
    })
  }

  async onSubmit() {
    await this.auth.presentLoading("Please wait while creating your account");
    let age = await this.calculateAge(this.credentialsForm.value.dob);
    if(age < 18) {
      await this.auth.dismissLoading();
      await this.auth.showAlert("You need to be 18+ for creating an account");
      return;
    }
    if(this.credentialsForm.valid) {
      await this.auth.register(this.credentialsForm.value).subscribe(async (res:any) => {
        if(res.status === "failed") {
          await this.auth.dismissLoading();
          await this.auth.showAlert(res.message);
          return;
        }
        if(res && res.user) {
          const loginData = await {
            mobile:this.credentialsForm.value.mobile,
            password:this.credentialsForm.value.password
          }
          await this.auth.login(loginData).subscribe(async (res) => {
            await this.auth.dismissLoading();
          } , (err) => {
           this.auth.dismissLoading();
          })
        } else {
          await this.auth.dismissLoading();
        }
      } , (err) => {
        this.auth.dismissLoading();
        this.auth.showAlert("Error while creating your account , please try again in sometime");
      })
    } else {
      await this.auth.dismissLoading();
      await this.auth.showAlert("Please enter valid details");
    }
  }

  calculateAge(birthday) { // birthday is a date
    var today = new Date();
    var birthDate = new Date(birthday);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd yyyy');
  }

  navigateLoginPage() {
    this.router.navigate(['/login'])
  }

}
