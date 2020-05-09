import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { PedidoDTO } from "../../app/models/pedido.dto";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@IonicPage()
@Component({
  selector: "page-payment",
  templateUrl: "payment.html",
})
export class PaymentPage {
  pedido: PedidoDTO;
  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuild: FormBuilder
  ) {
    //Pega obj pedido da pagina
    this.pedido = this.navParams.get("pedido");

    this.formGroup = this.formBuild.group({
      numParcelas: [1, Validators.required],
      "@type": ["pagamentoComCartao", Validators.required],
    });
  }

  nextPage() {
    console.log(this.formGroup.value);
    this.pedido.pagamento = this.formGroup.value;
    console.log(this.pedido);
  }
}
