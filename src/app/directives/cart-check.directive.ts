import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { SessionService } from '../services/session.service';

@Directive({
  selector: '[appCartCheck]'
})
export class CartCheckDirective {

  @Input('appCartCheck') productId: string;
  cartItems: [];
  constructor(
    private el: ElementRef, 
    private renderer: Renderer2,
    private sessionService: SessionService
    ) {
  }

  ngOnInit() {
    
    let cartFlag = false;
    this.cartItems = JSON.parse(this.sessionService.getLocal('cartItems'));
    if (this.cartItems && this.cartItems.length > 0) {
      cartFlag = this.checkItemExists(this.productId);
    }    
    if (cartFlag) {
      this.el.nativeElement.classList.remove('add-to-cart-btn');
      this.el.nativeElement.classList.add('go-to-cart-btn');     
      this.el.nativeElement.textContent = 'Goto cart';
      this.el.nativeElement.innerHTML = '<i class="fa fa-shopping-cart"></i> Goto to cart';
      this.renderer.setAttribute(this.el.nativeElement,'cart-flag', 'true')
    } else {
      this.el.nativeElement.classList.add('add-to-cart-btn');
      this.el.nativeElement.textContent = 'Add to cart';
      this.el.nativeElement.innerHTML = '<i class="fa fa-shopping-cart"></i> Add to cart';
      this.renderer.setAttribute(this.el.nativeElement,'cart-flag', 'false')
    } 

    }


    checkItemExists(productId: string) {
      const productExists = this.cartItems.filter(ele => ele['id'] === productId);
      if(productExists.length > 0) {
        return true;
      } else {
        return false;
      }
    }

}
