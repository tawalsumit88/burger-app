import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BurgersRoutingModule } from './burgers-routing.module';
import { BurgersComponent } from './burgers.component';
import { BurgersCommunicationService } from './services/burgers-communication.service';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [BurgersComponent],
  imports: [
    CommonModule,
    BurgersRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
  ],
  providers: [BurgersCommunicationService],
})
export class BurgersModule {}
