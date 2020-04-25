import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../app/models/endereco.dto';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  addresses: EnderecoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.addresses = [{
      id: "1",
      logradouro: "Rua guia Lopes",
      numend: "208",
      complemento: "Apto 208",
      bairro: "Santo Antonio",
      cep: "89215060",
      cidade: {
        id: "1",
        name: "Uberlândia",
        estado: {
          id: "1",
          name: "Minas Gerais"
        }
      }
    },
    {
      id: "2",
      logradouro: "Rua guia Lopes2",
      numend: "300",
      complemento: null,
      bairro: "Centro",
      cep: "89215060",
      cidade: {
        id: "3",
        name: "Sao Paulo",
        estado: {
          id: "2",
          name: "São Paulo"
        }
      }
    }
    ]
  }

}
