import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Cart } from "../../app/models/cart.dto";
import { ProdutoDTO } from "../../app/models/produto.dto";

@Injectable()
export class CartService {

    constructor(public storage: StorageService) { }


    createOrClearCart(): Cart {
        let cart: Cart = { items: [] };
        this.storage.setLocalCart(cart);
        return cart;

    }

    getCart(): Cart {
        let cart: Cart = this.storage.getLocalCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position == -1) {
            cart.items.push({ quantidade: 1, produto: produto })
        }
        this.storage.setLocalCart(cart);
        return cart;
    }

    removeProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            cart.items.splice(position, 1);  //Remove
        }
        this.storage.setLocalCart(cart);
        return cart;
    }

    increaseQuantity(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            cart.items[position].quantidade++;
        }
        this.storage.setLocalCart(cart);
        return cart;
    }

    decreaseQuantity(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            cart.items[position].quantidade--;
            console.log(cart.items[position].quantidade)
            if (cart.items[position].quantidade < 1) {
                cart = this.removeProduto(produto)
            }
        }
        this.storage.setLocalCart(cart);
        return cart;
    }

    total(): number {
        let cart = this.getCart();
        let sum = 0;
        for (let index = 0; index < cart.items.length; index++) {
            sum += cart.items[index].produto.preco * cart.items[index].quantidade;
        }
        return sum;
    }




}