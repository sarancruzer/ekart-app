import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isOpen = false;
  categoryList: any;
  subscription: any;
  cartItems = [];
  cartItemsCount = 0;
  totalAmount = 0;
  constructor(
    private categoryService: CategoryService,
    private cartService: CartService,
    private sessionService: SessionService,
    private router: Router
  ) { 
    this.subscription = this.cartService.currentCart.subscribe(data => {
    console.log("HeaderComponent - data", data);
      const cartItems = this.sessionService.getLocal('cartItems');
      if (cartItems) {
        this.cartItems = JSON.parse(cartItems);
      }
      this.cartItemsCalc();
    });

    const cartItems = this.sessionService.getLocal('cartItems');
    if (cartItems) {
      this.cartItems = JSON.parse(cartItems);
      this.cartItemsCalc();
    }

  }

  ngOnInit(): void {
    this.getCategoryList();
  }

  cartItemsCalc() {
    // this.cartItemsCount = Number(this.cartItems.length);
    this.cartItemsCount = this.cartItems.reduce((sum, item) => sum + Number(item['itemsCount']), 0);
    const total = this.cartItems.reduce((sum, item) => sum + Number(item['offerPrice'] * item['itemsCount']), 0);
    this.totalAmount = total;
  }

  getCategoryList() {
    this.categoryService.getCategory().subscribe(res => {
       this.categoryList = res;
     },
       err => {
         console.log('error msg');
         console.log(err);
       });
   }



   removeItemCart(item: any) {
   }

   viewCart() {
     this.isOpen = false;
     this.router.navigate(['/landing/cart']);
   }
  

   ngOnDestroy() {
    if(this.subscription) {
       this.subscription.unsubscribe();
     }
   }

}
