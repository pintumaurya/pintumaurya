import { Component, OnInit } from '@angular/core';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { SharedService } from "../../shared/services/shared.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signInFormValue: any = {};
  user: any;
  isError: boolean = false;

  constructor(
    public sharedService: SharedService,
    private loginService: LoginSignupService,
    public router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.sharedService.isHeader = false;
    this.sharedService.isFooter = false;
  }

  onSubmitSignIn() {
    this.isError = false;
    const userData = {
      username: this.signInFormValue.username,
      password: this.signInFormValue.password
    }

    if (this.signInFormValue.username == null || this.signInFormValue.password == null) {
      this.isError = true;
    }
    else {
      this.isError = false;
      this.loginService.authLogin(userData).subscribe(data => {
        this.sharedService.userdata = data;
        this.clearModel();

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        if (this.sharedService.userdata.token != null) {
          this.sharedService.isLogin = false;
          this.router.navigate(['/']);
          this.toastr.success("Login success");
        } else {
          this.router.navigate(['/**']);
        }
      }, err => {
        this.isError = true;
        this.toastr.error("Internal server Error!");
      })
    }
  }

  clearModel() {
    this.signInFormValue.username = "";
    this.signInFormValue.password = "";
  }

  //   if (this.user_data.length == 1) {
  //     // alert("Validate")
  //     if (this.user_data[0].role == "seller") {
  //       sessionStorage.setItem("user_session_id", this.user_data[0].id);
  //       sessionStorage.setItem("role", this.user_data[0].role);
  //       this.router.navigateByUrl('/seller-dashboard');
  //     } else if (this.user_data[0].role == "buyer") {
  //       sessionStorage.setItem("user_session_id", this.user_data[0].id);
  //       sessionStorage.setItem("role", this.user_data[0].role);
  //       this.router.navigateByUrl('/buyer-dashboard');
  //     } else {
  //       alert("Invalid-user-role")
  //     }
  //   } else {
  //     alert("Invalid")
  //   }
  //   console.log(this.user_data);

  // }, error => {
  //   console.log("My error", error);  
}