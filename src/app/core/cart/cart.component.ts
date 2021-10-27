import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { Product } from '../burgers/interface/burgers.interface';
import { CartItem } from './interface/cart.interface';
import { CartStateService } from './services/cart-state.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  private _compActive: boolean = true;

  public selectedProducts: Array<CartItem> = [];
  public total: number = 0;

  constructor(private _router: Router, private _cart: CartStateService) {}

  ngOnInit(): void {
    this._subscribeCart();
  }

  private _subscribeCart(): void {
    this._cart
      .subscribeCart()
      .pipe(takeWhile(() => this._compActive))
      .subscribe((products: Array<CartItem>) => {
        this.selectedProducts = products;
        this.total = this.selectedProducts.reduce(
          (acc, cartItem) => acc + cartItem.product.total,
          0
        );
      });
  }

  public gotoProduct(): void {
    this._router.navigate(['/core/burgers']);
  }

  public clearCart(): void {
    this._cart.clearCart();
  }

  public gotoPayment(): void {
    alert(`Make payment of Rs.${this.total} only!!`);
  }
}
