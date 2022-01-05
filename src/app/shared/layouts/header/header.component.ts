import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public sharedService: SharedService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  header() {
    this.sharedService.isHeader = false;
    this.sharedService.isFooter = false;
    this.router.navigate(['/signin']);
  }

  signOut() {
    this.sharedService.isLogin = true;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.toastr.warning("The account has been signed out!")
    this.router.navigate(['/']);
  }

  editProfile() {
    this.router.navigate(['/user-profile']);
  }
}
