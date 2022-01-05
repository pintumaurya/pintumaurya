import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { config } from "../../constant";

@Injectable({
    providedIn: 'root'
})
export class LoginSignupService {

    constructor(private apiService: ApiService) { }

    authLogin(data: any): Observable<any> {
        return this.apiService.post(environment.API_URL + config.AUTHENTICATE + config.LOGIN, data);
    }

    userRegister(user: any): Observable<any> {
        return this.apiService.post(environment.API_URL + config.AUTHENTICATE + config.REGISTER, user);
    }

    // adminLogin(username: string, password: string): Observable<any> {
    //     return this.apiService.get(this.url + '/user?email=' + username + '&password=' + password + '&role=admin');
    // }
}
