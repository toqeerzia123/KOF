import { HttpClient, HttpClientModule, HttpEvent, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupplierService } from './../../../_service/supplier.service';
//import { Supplier } from 'src/app/Models/Supplier.model';
 import { Supplier } from './../../../Models/Supplier.model';
import { Product } from './../../../Models/Product.Model';
import { ProductService } from './../../../_service/product.service';
import { FileuploadService } from './../../../_service/fileupload.service';
import { AlertifyService } from '../../../../../src/app/_service/alertify.service';

@Component({
  selector: 'app-Add-Product',
  templateUrl: './Add-Product.component.html',
  styleUrls: ['./Add-Product.component.scss']
})
export class AddProductComponent implements OnInit {

  closeResult: string;
   supplierlist:Supplier[];
   categoreylist:any[];
   singlecategorey:any;
   categoreyproducts:Product[];
   showcategoreysection:boolean;
   barcodeproducts:[];
   form: FormGroup;
   progress: number = 0;
   selectedbarcodeproduct:Product;
   productinfos:FormGroup;
  selectedsupplier:any;
  hidden: boolean = false;
  CategoryDto:{};
  newpackage(){
    return this.fb.group({
      ProductId:new FormControl(this.productmodel.productId),
      ProductName:new FormControl(this.productmodel.productName),
      Barcode:new FormControl(this.productmodel.barcode),
      Brand_Name:new FormControl(this.productmodel.brand_Name),
      Description:new FormControl(this.productmodel.description),
      Product_Qty:new FormControl(this.productmodel.product_Qty),
     // Product_TotalPrice:new FormControl(this.productmodel.product_TotalPrice),
      Unit_Price:new FormControl(this.productmodel.unit_Price),
      ProductInventory_SellingPrice:new FormControl(this.productmodel.sellingprice),
  
    });
  }


  constructor(private modalService: NgbModal,private model:Supplier,private http:HttpClient,private supplierservice:SupplierService,private productmodel:Product, private fb:FormBuilder,private productservice:ProductService, public fileUploadService: FileuploadService,private alertify: AlertifyService)
   {
    this.productinfos=this.fb.group({ 
      products:this.fb.array([this.newpackage()])
   })
  }
  myNameElem: ElementRef;
  
 
  ngOnInit(
    
  ) {
    this.form = this.fb.group({
    
      avatar: [null]
    })
    this.GetSuppliers()
  }
 supplier:FormGroup=new FormGroup({
  supplier_Name: new FormControl(this.model.supplier_Name),
  supplier_CompanyName: new FormControl(this.model.supplier_CompanyName),
  supplier_ContactNo: new FormControl(this.model.supplier_ContactNo),
  supplier_Address: new FormControl(this.model.supplier_Address),
  supplier_CityName: new FormControl(this.model.supplier_CityName),
  supplier_Email: new FormControl(this.model.supplier_Email),

 });
 categorey:FormGroup=new FormGroup({
 
  category_Name: new FormControl('')

 });




 supplierinfo:FormGroup=new FormGroup({
   supplier_Id:new FormControl(this.model.supplier_Id)
 });
 categoreyinfo:FormGroup=new FormGroup({
  categorey_Id:new FormControl('')
});
// productinfo:FormGroup=new FormGroup({
//   ProductId:new FormControl(this.productmodel.ProductId),
//   ProductName:new FormControl(this.productmodel.ProductName),
//   Barcode:new FormControl(this.productmodel.Barcode),
//   Description:new FormControl(this.productmodel.Description),
//   Product_Qty:new FormControl(this.productmodel.Product_Qty),
//   Product_TotalPrice:new FormControl(this.productmodel.Product_TotalPrice),
//   Unit_Price:new FormControl(this.productmodel.Unit_Price),
//   sellingprice:new FormControl(this.productmodel.sellingprice),
// });

get formArr() {
 
 
  return this.productinfos.get('products') as FormArray;
}


addNewRow() {
  if(this.formArr.length >= 6){
    return false
  }
  else {
    this.formArr.push(this.newpackage());
 
  }
  if(this.formArr.length > 1){
    this.hidden = true
  } else{
    this.hidden = false
  }
}

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }
  openVerticallyCenteredCategorey(categoreycontent) {
    this.modalService.open(categoreycontent, { centered: true });
  }
  savecategorey(){
    this.productservice.postcategorey(this.categorey.value).subscribe(next => {
     
      
      this.categorey.reset();
      this.Getcategorey();
      this.modalService.dismissAll();

      
    }, error => {
      console.log(error);
    });
  }
  savesupplier(){
    
    
    this.supplierservice.postsupplier(this.supplier.value).subscribe(next => {
      console.log(next);
      this.GetSuppliers();
      this.supplier.reset();
     
      this.modalService.dismissAll();

      
    }, error => {
      console.log(error);
    });
  }
  removeQuantity(i:number) {
    if(this.formArr.length == 1){
      return false
    }
    else {
    this.formArr.removeAt(i);
    //this.hidden = true;
    }
  }
  GetSuppliers(){
    
    this.supplierservice.Getsupplier().subscribe((next:any) => {
      this.supplierlist=[];
    
      this.supplierlist=next;
      console.log(this.supplierlist);
    }, error => {
      console.log(error);
    });
  }
  Getcategorey(){
    
    this.productservice.GetCategorey().subscribe((next:any) => {
      this.categoreylist=[];
      this.categoreylist=next.resp;
      
      
    }, error => {
      console.log(error);
    });
  }
  saveproduct(){

  var  productobj={"supplier_Id":this.selectedsupplier.supplier_Id,"category_Id":this.singlecategorey.category_Id,"products":this.productinfos.value.products}
  console.log(productobj);
 
  this.http.post<any>('https://ewholesaler.conveyor.cloud/Api/ProductApi/AddSupplierWithProducts', productobj).subscribe(next => {
    console.log(next);
    this.productinfos.reset();
   this.singlecategorey=null;
  
    
  }, error => {
    console.log(error);
  });
  }
  onOptionsSelected(id){
console.log(id);

this.selectedsupplier=this.supplierlist.find(x=> x.supplier_Id == id);
this.showcategoreysection=true;
this.Getcategorey();
console.log(this.selectedsupplier);

  }
  onOptionsCategoreySelected(id:number){


this.CategoryDto={"Category_Id":this.ConvertToInt(id)};

this.productservice.GetCategoryProduct(this.CategoryDto).subscribe((res:any)=>{
this.categoreyproducts=res;


}, error => {
    console.log(error);
  });
this.singlecategorey=this.categoreylist.find(x=>x.category_Id==id)

  }
  onBarcodechange(Barcode,id){
    
    var productdetails=this.categoreyproducts.find(x=>x.barcode==Barcode);

if(productdetails!=null&&productdetails!=undefined){

  this.selectedbarcodeproduct=productdetails;
  ((this.productinfos.get('products') as FormArray).at(id) as FormGroup).get('ProductId').patchValue(this.selectedbarcodeproduct.productId);
  ((this.productinfos.get('products') as FormArray).at(id) as FormGroup).get('ProductName').patchValue(this.selectedbarcodeproduct.productName);
  ((this.productinfos.get('products') as FormArray).at(id) as FormGroup).get('Brand_Name').patchValue(this.selectedbarcodeproduct.brand_Name);
  ((this.productinfos.get('products') as FormArray).at(id) as FormGroup).get('Product_Qty').patchValue(this.selectedbarcodeproduct.product_Qty);
  ((this.productinfos.get('products') as FormArray).at(id) as FormGroup).get('Description').patchValue(this.selectedbarcodeproduct.description);
  ((this.productinfos.get('products') as FormArray).at(id) as FormGroup).get('Unit_Price').patchValue(this.selectedbarcodeproduct.unit_Price);
}
else{
  ((this.productinfos.get('products') as FormArray).at(id) as FormGroup).get('ProductId').patchValue(0);
  ((this.productinfos.get('products') as FormArray).at(id) as FormGroup).get('ProductName').patchValue("");
  ((this.productinfos.get('products') as FormArray).at(id) as FormGroup).get('Brand_Name').patchValue("");
  ((this.productinfos.get('products') as FormArray).at(id) as FormGroup).get('Product_Qty').patchValue("");
  ((this.productinfos.get('products') as FormArray).at(id) as FormGroup).get('Description').patchValue("");
  ((this.productinfos.get('products') as FormArray).at(id) as FormGroup).get('Unit_Price').patchValue("");
}


   
      }
  
  ConvertToInt(val){
        return parseInt(val);
      }
//fileupload
uploadFile(event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.form.patchValue({
    avatar: file
  });
  this.form.get('avatar').updateValueAndValidity()
}

submitUser() {
  var apipath="AddCatAndProductExcel";
  this.fileUploadService.uploadproductfile(
 
    this.form.value.avatar,apipath
  ).subscribe((event: HttpEvent<any>) => {
    switch (event.type) {
      case HttpEventType.Sent:
        console.log('Request has been made!');
        break;
      case HttpEventType.ResponseHeader:
     
        console.log('Response header has been received!11');
        this.form.reset();
    

this.modalService.dismissAll();
        break;
      case HttpEventType.UploadProgress:
        this.progress = Math.round(event.loaded / event.total * 100);
        console.log(`Uploaded! ${this.progress}%`);
        break;
      case HttpEventType.Response:
        this.modalService.dismissAll();
        this.form.reset();
          this.alertify.success('Data Updated seccussfully!');
          break;

        this.modalService.dismissAll();
        setTimeout(() => {
          this.progress = 0;
        }, 1500);
        default  :
        {
          this.modalService.dismissAll();
          this.form.reset();
          this.alertify.error('Some things Wrong  or file formate  is not supported');
        }

    }
   
  })
}

}