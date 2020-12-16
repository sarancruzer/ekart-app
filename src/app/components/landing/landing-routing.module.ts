import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { LandingComponent } from './landing/landing.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing/landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    component: LandingComponent,
    data: {  }
  },
  {
    path: 'cart',
    component: CartComponent,
    data: {  }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
