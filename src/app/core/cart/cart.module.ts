import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, MatButtonModule, CartRoutingModule],
})
export class CartModule {}
