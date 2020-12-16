import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import {
  FooterComponent,
  SidebarComponent,
  HeaderComponent,
  NavbarComponent
 } from './components/shared';
import {
  DashboardLayoutComponent,
  AdminLayoutComponent
} from './components/layouts';

const APP_LAYOUTS = [
  DashboardLayoutComponent,
  AdminLayoutComponent
];

const APP_COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SidebarComponent,
  NavbarComponent
];

@NgModule({
  declarations: [
    AppComponent,
    APP_COMPONENTS,
    APP_LAYOUTS    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
