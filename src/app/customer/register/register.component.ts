import { Component, OnInit } from '@angular/core';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { SharedService } from "../../shared/services/shared.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signupFormValue: any = {};
  isError: boolean = false;
  errMessage: any;

  constructor(
    public sharedService: SharedService,
    private signupService: LoginSignupService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sharedService.isHeader = false;
    this.sharedService.isFooter = false;
  }

  onSubmitSignUp() {
    this.isError = false;
    const user = {
      username: this.signupFormValue.username,
      email: this.signupFormValue.email,
      password: this.signupFormValue.password
    }

    if (user.username == null || user.password == null) {
      this.isError = true;
    }
    else {
      this.isError = false;
      this.signupService.userRegister(user).subscribe(data => {
        this.sharedService.userdata = data;
        this.clearModel();
        this.router.navigate(['/signin']);
        if (data.success == false) {
          this.toastr.error(data.Message);
        } else {
          this.toastr.success(data.Message);
        }
      }, err => {
        this.toastr.error("Internal server Error!");
      });
    }
  }

  clearModel() {
    this.signupFormValue.username = "";
    this.signupFormValue.email = "";
    this.signupFormValue.password = "";
  }
}