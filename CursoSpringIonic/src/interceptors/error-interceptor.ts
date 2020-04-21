import { HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpRequest, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService,
        public alertCtrl: AlertController) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch((error, caught) => {
                let errorObj = error;
                if (errorObj.error) {
                    errorObj = errorObj.error
                }
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj)
                }
                console.log(errorObj)

                switch (errorObj.status) {
                    case 401:
                        this.handle401();
                        break;
                    case 403:
                        this.handle403();
                        break;
                    default:
                        this.handleDefaultError(errorObj);
                        break;
                }
                return Observable.throw(errorObj);
            }) as any;
    }

    handle403() {
        this.storage.setLocalUser(null);
    }

    handle401() {
        let alert = this.alertCtrl.create({
            title: 'Error 401: Falha de autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    handleDefaultError(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Error' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();

    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
}