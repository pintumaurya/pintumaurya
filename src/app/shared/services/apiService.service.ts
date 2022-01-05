import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { config } from "../../constant";
import { environment } from "../../../environments/environment";
import { ApiService } from '../../core/services/api.service';

@Injectable({
    providedIn: 'root'
})
export class apiService {

    constructor(private apiService: ApiService) { }

    userProfile(userId: any, data: any): Observable<any> {
        return this.apiService.post(environment.API_URL + config.AUTHENTICATE + config.UPDATEPROFILE + userId, data)
    }
}