import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class BurgersCommunicationService {
  constructor(private _http: HttpClient) {}

  public getBurgers(): Observable<any> {
    return this._http.get('/assets/burger-details.json');
  }
}
