import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderDto } from './../../../../../src/app/Models/OrderDto.Model';
import { OrderService } from '../../../../../src/app/_service/order.service';
import { items } from './../../../../../src/app/Models/items.Model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-AllOrders',
  templateUrl: './AllOrders.component.html',
  styleUrls: ['./AllOrders.component.scss']
})
export class AllOrdersComponent implements OnInit {
  OrdersList:OrderDto[];
  SearchOrdersList:OrderDto[];
  key:string='rowid';
  reverse:boolean=false;
  p:number=1;
  form: FormGroup;
  orderid:number;
  orderitemns:items[];
  neworderdata:any;
  vendorname:string;
  statusorderid:number;
  status:string;
  ordercurrentstatus:string;
  ss:boolean=false;
  orderstatus:FormGroup=new FormGroup({
    orderId:new FormControl(''),
    status: new FormControl('')
  
   });
  constructor(private SpinnerService: NgxSpinnerService,private orderservice:OrderService,private modalService: NgbModal,) { }

  ngOnInit() {
   
    this.GetOrders();
 
  
  }
  openOrderDetailLg(content,id:number) {
    debugger;
    var data=this.OrdersList.find(res=>res.orderId==id);
    this.orderitemns=data.items;
    
    this.modalService.open(content, { size: 'lg' });
  }
  openOrderUpdateLg(content,id:number) {
    debugger;
   this.statusorderid=id;
    var dd=this.SearchOrdersList.filter(x=>x.orderId==id);
    this.ordercurrentstatus=dd[0].status;
    this.modalService.open(content, { size: 'lg' });
  }
  onOptionsOrderStatusSelected(){

    ((this.orderstatus.get('orderId').patchValue(this.statusorderid)));
    this.orderservice.UpdateOrderStatus(this.orderstatus.value).subscribe((next:any) => {
     this.OrdersList.forEach(x=>{if(x.orderId==this.statusorderid){x.status=this.orderstatus.value.status}})
      this.modalService.dismissAll();
      this.orderstatus.reset();

    }, error => {
      console.log(error);
    });
    
  }
  onOptionsSelected(num){
    debugger;
    if(num=="0"){
      this.SearchOrdersList=this.OrdersList;
    }
    if(num=="1"){
      this.status="Pending";
      this.SearchOrdersList=this.OrdersList.filter(x=>x.status==this.status);
    }
    if(num=="2"){
      this.status="Active";
      this.SearchOrdersList=this.OrdersList.filter(x=>x.status==this.status);
    }
    if(num=="3"){
      this.status="Completed";
      this.SearchOrdersList=this.OrdersList.filter(x=>x.status==this.status);
    }
    if(num=="4"){
      this.status="Cancelled";
      this.SearchOrdersList=this.OrdersList.filter(x=>x.status==this.status);
    }

  }
  SearchRider(){
    if(this.vendorname==""){
      this.SearchOrdersList=this.OrdersList
     }
     else{
       if(this.OrdersList!=null){
         this.SearchOrdersList=this.OrdersList.filter(res=>{
           return res.vendorname.match(this.vendorname)
         })
       }
    
     }
  }
  GetOrders(){
    this.SpinnerService.show();
    this.orderservice.GetOrders().subscribe((next:any) => {
      this.OrdersList=[];
      this.OrdersList=next.res;console.log(next.res);
      this.SearchOrdersList=this.OrdersList;
      this.SpinnerService.hide();
      console.log(this.OrdersList)
    }, error => {
      console.log(error);
    });
 
  }

  Sort(key){
    this.key=key;
    this.reverse=!this.reverse;
  }

}
