import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { StockinService } from '../../../../../src/app/_service/stockin.service';
import { Supplier } from '../../../../../src/app/Models/Supplier.model';
import { ProductService } from '../../../../../src/app/_service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-AddInventory',
  templateUrl: './AddInventory.component.html',
  styleUrls: ['./AddInventory.component.scss']
})
export class AddInventoryComponent implements OnInit {
  supplier: Supplier []=[];
  Addtocart: any []=[];
  productlist:any[];
  productid:number;
  supplierid:number;
  quantity:number=0;
 unit:string
  costPerUnit:number=0;
  totalCost:number=0;
  pricePerUnit:number=0;
  totalPrice:number=0;
  TotalQty:number=0;
  TotalcostPrice=0;
  TotalSalePrice=0;
  Searchableproductlist:any[];
  constructor(    private SpinnerService: NgxSpinnerService,
    private productservice: ProductService,
    private service:StockinService,
    private modalService: NgbModal,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.Getsalesmans();
    this.getproducts();
  }
 
  Getsalesmans(){
   
    this.productservice.GetSupplier().subscribe((next:any) => {
      this.supplier=[];
      this.supplier=next;
     // this.supplier=this.supplier;
     
    }, error => {
      console.log(error);
    });
  }
  Add()
  {
    if(this.supplierid>0 && this.productid>0 &&this.quantity>=1&&this.costPerUnit>=1&&this.pricePerUnit>=1)
    {
    var name=this.productlist.find(x=>x.product.id==this.productid).product.name;
   var obj={

      "productid":this.productid,
      "productname":name,
      "supplierid":this.supplierid,
      "quantity":this.quantity,
      "unit":this.unit,
      "status":true,
      "remainingQuantity":this.quantity,
      "costPerUnit":this.costPerUnit,
      "totalCost":this.quantity*this.costPerUnit,
      "pricePerUnit":this.pricePerUnit,
      "totalPrice":this.quantity*this.pricePerUnit
  }

  this.Addtocart.push(obj);
  this.TotalQty=0;
  this.TotalcostPrice=0;
  this.TotalSalePrice=0;
  this.Addtocart.forEach(a => this.TotalQty += a.quantity)
  this.Addtocart.forEach(a => this.TotalSalePrice += a.totalPrice)
  this.Addtocart.forEach(a => this.TotalcostPrice += a.totalCost)
  this.productid=0;
  this.quantity=0;
  this.unit="";
  this.costPerUnit=0;
  this.totalCost=0;
  this.pricePerUnit=0;
  this.totalPrice=0;
}
  }
  SaveInventory(){

    if(this.Addtocart.length>0)
    {
      this.Addtocart.forEach(element => {
        delete element.productname
       });
     
       
          this.service.PostInventory(this.Addtocart).subscribe(next => {
            
           this.Addtocart=[];
           this.TotalQty=0;
          this.TotalcostPrice=0;
          this.TotalSalePrice=0;
          this.router.navigate(['/inventory']);
             }, error => {
           
             });
            }

   
  }

remove(id:number)
{
 let index=this.Addtocart.indexOf(x=>x.productid==id)
 this.Addtocart.splice(index, 1);
}
  getproducts(){
    
    this.SpinnerService.show();
    this.productservice.GetAllProducts().subscribe((next:any) => {
      this.productlist=[];
    
      this.productlist=next;
      this.SpinnerService.hide();
      console.log(this.productlist);
      // this.listData = new MatTableDataSource(this.productlist);
      // this.listData.sort=this.sort;
      // this.listData.paginator=this.paginator;
    }, error => {
      console.log(error);
    });

  }

}
