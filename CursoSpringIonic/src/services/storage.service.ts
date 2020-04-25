import { Injectable } from "@angular/core";
import { LocalUser } from "../app/models/local_user";
import { STORANGE_KEYS } from "../config/storage_keys.config";
import { CartItem } from "../app/models/cartItem.dto";
import { Cart } from "../app/models/cart.dto";

@Injectable()
export class StorageService {

    getLocalUser(): LocalUser {
        let user = localStorage.getItem(STORANGE_KEYS.localUser);
        if (user == null) {
            return null;
        } else {
            return JSON.parse(user);
        }

    }

    setLocalUser(obj: LocalUser) {
        if (obj == null) {
            localStorage.removeItem(STORANGE_KEYS.localUser);
        } else {
            localStorage.setItem(STORANGE_KEYS.localUser, JSON.stringify(obj))
        }
    }

    getLocalCart(): Cart {
        let cart = localStorage.getItem(STORANGE_KEYS.cart);
        if (cart == null) {
            return null
        } else {
            return JSON.parse(cart)
        }
    }

    setLocalCart(obj: Cart) {
        if (obj != null) {
            localStorage.setItem(STORANGE_KEYS.cart, JSON.stringify(obj));
        } else {
            localStorage.removeItem(STORANGE_KEYS.cart)
        }
    }

}