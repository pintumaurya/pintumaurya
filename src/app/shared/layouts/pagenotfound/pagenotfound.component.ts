import { Component, OnInit } from '@angular/core';
// import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.scss']
})
export class PagenotfoundComponent implements OnInit {

  constructor(
    // private location: Location
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  cancel() {
    // this.location.back();
    this.router.navigateByUrl("/");
  }


}
