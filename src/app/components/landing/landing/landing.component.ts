import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  productList: any;
  cartItems = [];
  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const cartItems = this.sessionService.getLocal('cartItems');
    if (cartItems) {
      this.cartItems = JSON.parse(cartItems);
    }
    this.getProductList();
  }

  getProductList() {
    this.productsService.getProducts().subscribe(res => {
       this.productList = res;
     },
       err => {
         console.log('error msg');
         console.log(err);
       });
   }

   addToCart($event: any, data: any) {
    let cartFlag = $event.target.attributes['cart-flag'].value;
    if (cartFlag === 'false'){    
      $event.target.classList.remove('add-to-cart-btn'); 
      $event.target.classList.add('go-to-cart-btn'); 
      $event.target.attributes['cart-flag'].value = 'true';
      let htmlElement = '<i class="fa fa-shopping-cart"></i> Goto to cart';
      $event.target.innerHTML = htmlElement;
      data['itemsCount'] = 1;
      data['totalPrice'] = data['offerPrice'];
      data['totalOfferPrice'] = data['offerPrice'];
      this.cartItems.push(data);
      this.sessionService.setLocal('cartItems', JSON.stringify(this.cartItems));
      this.cartService.updateCart(data);

    }  else {
      this.router.navigate(['/landing/cart']);
    }    

   }

}
