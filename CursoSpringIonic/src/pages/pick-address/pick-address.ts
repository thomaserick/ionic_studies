import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { EnderecoDTO } from "../../app/models/endereco.dto";
import { StorageService } from "../../services/storage.service";
import { ClienteService } from "../../services/domain/cliente.service";
import { PedidoDTO } from "../../app/models/pedido.dto";
import { CartService } from "../../services/domain/cart.service";

@IonicPage()
@Component({
  selector: "page-pick-address",
  templateUrl: "pick-address.html",
})
export class PickAddressPage {
  addresses: EnderecoDTO[];
  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService
  ) {}

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email).subscribe(
        (response) => {
          this.addresses = response["enderecos"];

          let cart = this.cartService.getCart();

          this.pedido = {
            cliente: { id: response["id"] },
            enderecoEntrega: null,
            pagamento: null,
            itens: cart.items.map((x) => {
              return {
                quantidade: x.quantidade,
                produto: { id: x.produto.id },
              };
            }),
          };
          //find image
        },
        (error) => {
          if (error.status == 403) {
            this.navCtrl.setRoot("HomePage");
          }
        }
      );
    } else {
      this.navCtrl.setRoot("HomePage");
    }
  }

  nextPage(address: EnderecoDTO) {
    this.pedido.enderecoEntrega = { id: address.id };
    this.navCtrl.push("PaymentPage", { pedido: this.pedido });
  }
}
