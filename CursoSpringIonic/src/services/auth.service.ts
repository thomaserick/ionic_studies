import { Injectable } from "@angular/core"
import { LoginDTO } from "../app/models/login.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthService {

    constructor(public http: HttpClient) {

    }

    authenticate(logins: LoginDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}login`,
            logins,
            {
                observe: 'response',
                responseType: 'text'
            })
    }


}
