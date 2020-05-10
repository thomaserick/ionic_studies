import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { PedidoDTO } from "../../app/models/pedido.dto";
import { CartItem } from "../../app/models/cartItem.dto";
import { CartService } from "../../services/domain/cart.service";
import { EnderecoDTO } from "../../app/models/endereco.dto";
import { ClienteDTO } from "../../app/models/cliente.dto";
import { ClienteService } from "../../services/domain/cliente.service";

@IonicPage()
@Component({
  selector: "page-order-confirmation",
  templateUrl: "order-confirmation.html",
})
export class OrderConfirmationPage {
  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService
  ) {
    this.pedido = this.navParams.get("pedido");
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findById(this.pedido.cliente.id).subscribe(
      (response) => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.findEndereco(
          this.pedido.enderecoEntrega.id,
          response["enderecos"]
        );
      },
      (error) => {
        this.navCtrl.setRoot("HomePage");
      }
    );
  }

  private findEndereco(id: string, list: EnderecoDTO[]): EnderecoDTO {
    let position = list.findIndex((x) => x.id == id);
    return list[position];
  }

  total() {
    this.cartService.total();
  }
}
