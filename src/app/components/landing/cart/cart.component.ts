import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: any = [];
  cartItemsCount = 0;
  totalAmount = 0;

  purchased = false;

  constructor(
    private sessionService: SessionService,
    private cartService: CartService,
    private router: Router
  ) {
    
   }

  ngOnInit(): void {
    const cartItems = this.sessionService.getLocal('cartItems');
    if (cartItems) {
      this.cartItems = JSON.parse(cartItems);
      this.cartItemsCalc();
    }

  }

  removeItemCart(data: any) {
    this.cartItems = this.cartItems.filter((ele) => ele['id'] !== data.id);
    this.cartItemsCalc();
    this.sessionService.setLocal('cartItems', JSON.stringify(this.cartItems));
    this.cartService.updateCart(data);
  }

  cartItemsCalc() {
    this.cartItemsCount = this.cartItems.reduce((sum, item) => sum + Number(item['itemsCount']), 0);
    const total = this.cartItems.reduce((sum, item) => sum + Number(item['offerPrice'] * item['itemsCount']), 0);
    this.totalAmount = total;
  }
  

  itemtoCart(data: any, type: string) {    
    if (type == 'ADD') {
      this.cartItems = this.cartItems.filter((ele) => {
        if (ele.id === data.id) {
          ele.itemsCount++;
          ele.totalPrice = Number(ele.totalPrice) + Number(data.offerPrice); 
          ele.totalOfferPrice = Number(ele.actualPrice) * Number(ele.itemsCount);
        } 
        return ele;

      });
      this.totalAmount = this.totalAmount + Number(data.offerPrice);

    } else {
      this.cartItems = this.cartItems.filter((ele) => {
        if (ele.id === data.id) {
          ele.itemsCount--;
          ele.totalPrice = Number(ele.totalPrice) - Number(data.offerPrice);
          ele.totalOfferPrice = Number(ele.actualPrice) * Number(ele.itemsCount);          
        } 
        return ele;
      });
      this.totalAmount = this.totalAmount - Number(data.offerPrice);
    }
    this.sessionService.setLocal('cartItems', JSON.stringify(this.cartItems));
    this.cartService.updateCart(data);
  }


  placeOrder() {
    this.purchased = true;
    this.sessionService.clearLocal(); 
    this.cartService.updateCart('');
    setTimeout(() => {
      // this.router.navigate(['/landing/landing'])
    }, 1000);
  }
}
