import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from './components/layouts';


const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'landing',
        loadChildren: () => import('./components/landing/landing.module').then(m => m.LandingModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
