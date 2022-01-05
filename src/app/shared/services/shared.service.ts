import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  isHeader: boolean = true;
  isFooter: boolean = true;
  isLogin: boolean = true;
  userdata: any;

  constructor() { }
}
