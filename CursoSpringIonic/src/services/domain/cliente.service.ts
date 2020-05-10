import { API_CONFIG } from "../../config/api.config";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../app/models/cliente.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService {
  constructor(public http: HttpClient, public storage: StorageService) {}

  findByEmail(email: string) {
    return this.http.get(`${API_CONFIG.baseUrl}clientes/email?value=${email}`);
  }

  findById(id: string) {
    return this.http.get(`${API_CONFIG.baseUrl}clientes/${id}`);
  }

  getImageFromBucket(id: string): Observable<any> {
    //Url bucket
    let url = `${API_CONFIG.bucketBaseUrl}cp${id}.jpg`;
    return this.http.get(url, { responseType: "blob" });
  }

  insert(clienteObj: ClienteDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}clientes`, clienteObj, {
      observe: "response",
      //Evitar erro de parde se Json
      responseType: "text",
    });
  }
}
