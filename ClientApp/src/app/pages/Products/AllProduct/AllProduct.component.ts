import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileuploadService } from './../../../_service/fileupload.service';
import { Product } from './../../../Models/Product.Model';
import { ProductService } from './../../../_service/product.service';
import { environment } from './../../../../../src/environments/environment.prod';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from '../../../../../src/app/_service/alertify.service';
import { BrandService } from '../../../../../src/app/_service/brand.service';

@Component({
  selector: 'app-AllProduct',
  templateUrl: './AllProduct.component.html',
  styleUrls: ['./AllProduct.component.scss']
})
export class AllProductComponent implements OnInit {
  ImagebaseUrl = environment.Imagebaseurl + 'ProductImages/';
  form: FormGroup;
   progress: number = 0;
  listData: MatTableDataSource<any>;
  searchKey: string;
  productlist:any[];
  Searchableproductlist:any[];
  Barcode:any;
  key:string='rowid';
  reverse:boolean=false;
  disable:boolean=false;
  p:number=1;
  productid:number
  EditProduct:any;
  noimage="";
  AllBrands:any[];
  singleproduct:Product;
  categoreylist:any[];
  //displayedColumns: string[] = ['productId','productName','brand_Name','barcode','description'];
  constructor(private alertify: AlertifyService,private SpinnerService: NgxSpinnerService,private productservice:ProductService,private modalService: NgbModal, public fileUploadService: FileuploadService, private fb:FormBuilder,private productmodel:Product,private brandservice:BrandService) { }
 
  singleproductform:FormGroup=new FormGroup({
    productName: new FormControl(this.productmodel.productName),
   
    barcode: new FormControl(this.productmodel.barcode),
    category_Name: new FormControl(this.productmodel.category_Name),
    category_Id: new FormControl(this.productmodel.category_Id),
    // product_Qty: new FormControl(this.productmodel.product_Qty),
    // product_TotalPrice: new FormControl(this.productmodel.product_TotalPrice),
    // sellingprice: new FormControl(this.productmodel.sellingprice),
    // unit_Price: new FormControl(this.productmodel.unit_Price),
    productImage:new FormControl(this.productmodel.productImage),
    productId: new FormControl(this.productmodel.productId),
    description: new FormControl(this.productmodel.description),
    brandId: new FormControl(this.productmodel.brandId),
    dateTime: new FormControl(this.productmodel.dateTime),
    description_Urdu: new FormControl(this.productmodel.description_Urdu),
    productName_Urdu: new FormControl(this.productmodel.productName_Urdu),
    // brand_Name:new FormControl(this.productmodel.brandNameEng)
   });
  ngOnInit() {
    
    this.Getcategorey();
    this.form = this.fb.group({
    
      avatar: [null]
    })
    this.getproducts();
   
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  openLg(content,id:number) {
    this.productid=id;
    this.GetBrands();
    this.Getcategorey();
    this.modalService.open(content, { size: 'lg' });
  }

  openLgEdit(content,id:number){
    var data=this.Searchableproductlist.find(res=>res.productId==id);
  this.singleproduct=data;
  this.singleproductform.setValue({
productName:this.singleproduct.productName,

barcode:this.singleproduct.barcode,
category_Name:this.singleproduct.category_Name,
 category_Id:this.singleproduct.category_Id,
description:this.singleproduct.description,
productId:this.singleproduct.productId,
productImage:this.singleproduct.productImage,
brandId:this.singleproduct.brandId,
dateTime:this.singleproduct.dateTime,
description_Urdu:this.singleproduct.description_Urdu,
 productName_Urdu:this.singleproduct.productName_Urdu,
//  brand_Name:this.singleproduct.brand_Name
  });
  console.log(this.singleproduct);
 
    this.modalService.open(content, { size: 'lg' });
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  Getcategorey(){
    this.SpinnerService.show();
    this.productservice.GetCategorey().subscribe((next:any) => {
      this.categoreylist=[];
      this.categoreylist=next.resp;
      this.SpinnerService.hide();
      console.log(this.categoreylist)
    }, error => {
      console.log(error);
    });

   
  }
  GetBrands(){

    this.brandservice.GetBrands().subscribe((next:any) => {
      this.AllBrands=[];
      this.AllBrands=next.resp;
   
      console.log(this.AllBrands)
    }, error => {
      console.log(error);
    });

  }
  getproducts(){
    debugger;
    this.SpinnerService.show();
    this.productservice.GetAllProducts().subscribe((next:any) => {
      this.productlist=[];
    
      this.productlist=next.resp;
      this.Searchableproductlist=next.resp;
      this.SpinnerService.hide();
      console.log(this.productlist);
      // this.listData = new MatTableDataSource(this.productlist);
      // this.listData.sort=this.sort;
      // this.listData.paginator=this.paginator;
    }, error => {
      console.log(error);
    });

  }
  SearchProduct(){
    if(this.Barcode==""){
     this.productlist=this.Searchableproductlist
    }
    else{
      if(this.productlist!=null){
        this.productlist=this.Searchableproductlist.filter(res=>{
          return res.barcode.match(this.Barcode)
        })
      }
   
    }
  }
  Sort(key){
    this.key=key;
    this.reverse=!this.reverse;
  }
  
uploadFile(event) {

  const file = (event.target as HTMLInputElement).files[0];
  this.form.patchValue({
    avatar: file
  });
  this.form.get('avatar').updateValueAndValidity();
 
}

SubmitImage() {
  this.SpinnerService.show();
  if(this.form.value.avatar!=null){
    var apipath="UploadProductImage";
    
    this.fileUploadService.uploadproductimage(
   
      this.form.value.avatar,apipath,
      this.productid
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          this.form.reset();
  this.modalService.dismissAll();
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          setTimeout(() => {
            this.progress = 0;
          }, 1500);
  
      }
      this.form.reset();
      this.getproducts();
    })
    this.SpinnerService.hide();
  }
  
}
changestatus(id:number){
  this.productservice.ChangeStatus(id).subscribe((next:any)=>{
    this.productlist.forEach(x=>{if(x.productId==id){x.status=!x.status}});
  }, error => {
        console.log(error);
      })
    }
UpdateProuct(){
  debugger;
 this.productservice.UpdateProduct(this.singleproductform.value).subscribe(next => {

  this.modalService.dismissAll();
   this.singleproductform.reset();
   this.getproducts();
   this.alertify.success('Product Updated seccussfully');
  
 }, error => {
  this.modalService.dismissAll();
  this.singleproductform.reset();
  this.alertify.success('Product Updated seccussfully');
   console.log(error);
 });
  console.log(this.singleproductform.value)
}
}
