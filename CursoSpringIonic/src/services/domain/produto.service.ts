import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { ProdutoDTO } from "../../app/models/produto.dto";

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient) { }

    findById(produto_id: string) {
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}produtos/${produto_id}`)
    }

    findByCategoria(categoria_id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}produtos/?categorias=${categoria_id}`);
    }

    getSmallImgFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}prod${id}-small.jpg`;
        return this.http.get(url, {
            responseType: 'blob'
        });
    }
    getImgFromBucket(produto_id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}prod${produto_id}.jpg`;
        return this.http.get(url, {
            responseType: 'blob'
        });
    }


}