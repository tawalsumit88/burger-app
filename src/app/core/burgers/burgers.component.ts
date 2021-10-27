import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { AppUtilService } from 'src/app/services/app-util.service';
import { CartStateService } from '../cart/services/cart-state.service';
import { Ingredient, Product } from './interface/burgers.interface';
import { BurgersCommunicationService } from './services/burgers-communication.service';

@Component({
  selector: 'app-burgers',
  templateUrl: './burgers.component.html',
  styleUrls: ['./burgers.component.scss'],
})
export class BurgersComponent implements OnInit, OnDestroy {
  private _compActive: boolean = true;

  public burgurForm: FormGroup = {} as FormGroup;
  public productList: Array<Product> = [];
  public product: Product = {} as Product;
  public total: number = 0;

  constructor(
    private _appUtil: AppUtilService,
    private _cart: CartStateService,
    private _communication: BurgersCommunicationService,
    private _fb: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._createForm();
    this._getProductList();
  }

  ngOnDestroy(): void {
    this._compActive = false;
  }

  private _createForm(): void {
    this.burgurForm = this._fb.group({
      productId: ['', Validators.required],
      count: ['1', Validators.required],
    });
  }

  private _getProductList(): void {
    this._communication
      .getBurgers()
      .pipe(takeWhile(() => this._compActive))
      .subscribe((list) => {
        this.productList = list;
        this.productList.forEach((product: Product) => {
          product.ingredients = product.ingredients.map(
            (ingredient: Ingredient) => {
              ingredient = Object.assign(ingredient, {
                field: ingredient.name.replace(' ', '_'),
                quantity: 0,
                decider: false,
              });
              return ingredient;
            }
          );
        });
        this.product = JSON.parse(JSON.stringify(this.productList[0]));
        this._appendProductDetails();
      });
  }

  private _appendProductDetails() {
    this.product.ingredients.forEach((ingredient: Ingredient) => {
      if (ingredient.type === 'decider') {
        this.burgurForm.addControl(ingredient.field, new FormControl(false));
      } else {
        this.burgurForm.addControl(ingredient.field, new FormControl('0'));
      }
    });
    this.calculate();
  }

  public inc(ingredient: AbstractControl): void {
    let value = parseInt(ingredient.value) || 0;
    if (value > -1) {
      ingredient.setValue(++value);
      this.calculate();
    }
  }
  public dec(ingredient: AbstractControl): void {
    let value = parseInt(ingredient.value) || 0;
    if (value > 0) {
      ingredient.setValue(--value);
      this.calculate();
    }
  }
  public changeDecider(ingredient: AbstractControl): void {
    this.calculate();
  }
  public calculate(): void {
    let values = this.burgurForm.value;
    this.product.total =
      values.count *
      (this.product.basePrise +
        this.product.ingredients.reduce(
          (acc: number, ingredient: Ingredient) => {
            return acc + values[ingredient.field] * ingredient.price;
          },
          0
        ));
  }

  public add(): void {
    let values = this.burgurForm.value;
    this.product.ingredients.forEach((ingredient: Ingredient) => {
      ingredient.quantity = values[ingredient.field]
        ? values[ingredient.field]
        : 0;
      ingredient.decider = values[ingredient.field];
    });
    this._cart.addToCart({ id: +new Date(), product: this.product });
    this._appUtil.showNotification('Product added to cart successfully');
    this._resetForm();
  }

  private _resetForm(): void {
    this.product = JSON.parse(JSON.stringify(this.productList[0]));
    this.burgurForm.reset();
    let values: any = {
      count: 1,
    };
    this.product.ingredients.forEach((ingredient: Ingredient) => {
      values[ingredient.field] = ingredient.type === 'decider' ? false : 0;
    });
    this.burgurForm.patchValue(values);
    this.calculate();
  }

  public gotoCart(): void {
    this._router.navigate(['/core/cart']);
  }
}
