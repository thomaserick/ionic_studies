import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
} from "ionic-angular";
import { ProdutoDTO } from "../../app/models/produto.dto";
import { ProdutoService } from "../../services/domain/produto.service";
import { API_CONFIG } from "../../config/api.config";

@IonicPage()
@Component({
  selector: "page-produtos",
  templateUrl: "produtos.html",
})
export class ProdutosPage {
  produtos: ProdutoDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let categoria_id = this.navParams.get("categoria_id");

    //Loading
    let loader = this.presentLoading();

    this.produtoService.findByCategoria(categoria_id).subscribe(
      (response) => {
        this.produtos = response["content"];
        loader.dismiss();
        this.loadImageUrls();
      },
      (error) => {
        loader.dismiss();
      }
    );
  }

  loadImageUrls() {
    for (var i = 0; i < this.produtos.length; i++) {
      let produto = this.produtos[i];
      this.produtoService.getSmallImgFromBucket(produto.id).subscribe(
        (response) => {
          produto.imageUrl = `${API_CONFIG.bucketBaseUrl}prod${produto.id}-small.jpg`;
        },
        (error) => {}
      );
    }
  }

  showDetail(produto_id: string) {
    this.navCtrl.push("ProdutoDetailPage", { produto_id: produto_id });
  }

  presentLoading() {
    let loader = this.loadCtrl.create({
      content: "Aguarde...",
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
}
