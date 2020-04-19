import { Injectable } from "@angular/core"
import { LoginDTO } from "../app/models/login.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../app/models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(public http: HttpClient, public storage: StorageService) { }

    authenticate(logins: LoginDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}login`,
            logins,
            {
                observe: 'response',
                responseType: 'text'
            })
    }

    successfulLogin(authorizationValue: string) {
        //Remove o Barer
        let token = authorizationValue.substring(7);
        let user: LocalUser = {
            token: token,
            email: this.jwtHelper.decodeToken(token).sub

        }
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
    }


}
