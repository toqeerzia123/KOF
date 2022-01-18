import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllOrdersComponent } from './AllOrders/AllOrders.component';
import { PosOrderComponent } from './PosOrder/PosOrder.component';

const routes: Routes = [
  {
    path: '',
    component: AllOrdersComponent,
    data: {
      breadcrumb: ' Orders',
      icon: 'icofont-table bg-c-blue',
      breadcrumb_caption: 'All Orders',
      status: true
    }
  },
  {
    path: 'posorders',
    component: PosOrderComponent,
    data: {
      breadcrumb: 'Pos Orders',
      icon: 'icofont-table bg-c-blue',
      breadcrumb_caption: 'All Pos Orders Detail',
      status: true
    }
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
