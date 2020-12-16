import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSource = new BehaviorSubject('');
  currentCart = this.cartSource.asObservable();

 constructor(
   private http: HttpClient,
   ) { }

   updateCart(message: any) {
    this.cartSource.next(message)
  }
}
