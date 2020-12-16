import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing/landing.component';
import { CartCheckDirective } from 'src/app/directives/cart-check.directive';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    LandingComponent,
    CartCheckDirective,
    CartComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }
