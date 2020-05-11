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
  //Lista Vazia
  produtos: ProdutoDTO[] = [];

  page: number = 0;

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

    this.produtoService.findByCategoria(categoria_id, this.page, 10).subscribe(
      (response) => {
        let start = this.produtos.length;
        this.produtos = this.produtos.concat(response["content"]);
        let end = this.produtos.length - 1;
        loader.dismiss();
        console.log(this.page);
        console.log(this.produtos);
        this.loadImageUrls(start, end);
      },
      (error) => {
        loader.dismiss();
      }
    );
  }

  loadImageUrls(start: number, end: number) {
    for (var i = start; i < end; i++) {
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
    this.page = 0;
    this.produtos = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    //Page add e chama novamente a Load da Tela
    this.page++;
    this.loadData();

    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
