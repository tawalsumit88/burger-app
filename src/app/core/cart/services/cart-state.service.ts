import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../burgers/interface/burgers.interface';
import { CART_CONSTANT } from '../constants/cart.contants';
import { CartItem } from '../interface/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartStateService {
  private cart: BehaviorSubject<Array<CartItem>>;
  public cartProducts$: Observable<Array<CartItem>>;

  constructor() {
    this.cart = new BehaviorSubject<Array<CartItem>>(this.getInitialValue());
    this.cartProducts$ = this.cart.asObservable();
  }

  private getInitialValue(): CartItem[] {
    let val = localStorage.getItem(CART_CONSTANT.CART_STORATE);
    return val ? JSON.parse(val) : [];
  }

  public subscribeCart(): Observable<Array<CartItem>> {
    return this.cart.asObservable();
  }
  public addToCart(cartItem: CartItem): void {
    const newState: Array<CartItem> = [...this.cart.value, cartItem];
    localStorage.setItem(CART_CONSTANT.CART_STORATE, JSON.stringify(newState));
    this.cart.next(newState);
  }

  public clearCart(): void {
    localStorage.setItem(CART_CONSTANT.CART_STORATE, JSON.stringify([]));
    this.cart.next([]);
  }
}
