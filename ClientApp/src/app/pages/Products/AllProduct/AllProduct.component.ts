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
  ImagebaseUrl = environment.Imagebaseurl + 'Images/ProductImages/';
  form: FormGroup;
  productuploadform:FormGroup;
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
  files: File[] = [];
  ActionName:string="Save";
  productimages:any[]=[];
  Title:string="Add New Product";
  //displayedColumns: string[] = ['productId','productName','brand_Name','barcode','description'];
  constructor(private alertify: AlertifyService,private SpinnerService: NgxSpinnerService,private productservice:ProductService,private modalService: NgbModal, public fileUploadService: FileuploadService, private fb:FormBuilder,private productmodel:Product,private brandservice:BrandService) { }
 
  singleproductform:FormGroup=new FormGroup({
    id: new FormControl(0),
   
    categoryId: new FormControl(0),
    name: new FormControl(""),
    about: new FormControl(""),
    // product_Qty: new FormControl(this.productmodel.product_Qty),
    // product_TotalPrice: new FormControl(this.productmodel.product_TotalPrice),
    // sellingprice: new FormControl(this.productmodel.sellingprice),
    // unit_Price: new FormControl(this.productmodel.unit_Price),
    description:new FormControl(""),
    isActive: new FormControl(false),    // brand_Name:new FormControl(this.productmodel.brandNameEng)
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
  onSelect(event) {
		console.log(event);
		this.files.push(...event.addedFiles);
	}

	onRemove(event) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}
  openLg(content,id:number) {
    this.Title="Add New Product";
    this.ActionName="Add";
 
    this.GetBrands();
    this.Getcategorey();
    this.modalService.open(content, { size: 'lg' });
  }
  Addimage(content,data:any) {
    
    this.productimages=null;
    this.productid=data.id;

  this.productimages=data.productImages;

    this.modalService.open(content, { size: 'lg' });
  }
  openLgEdit(content,data:any){

 this.Title="Update Product";
 this.ActionName="Update Now";
  this.singleproductform.setValue({
    name:data.name,

id:data.id,
categoryId:data.categoryId,
 description:data.description,
about:data.about,
isActive:data.isActive,
//  brand_Name:this.singleproduct.brand_Name
  });

 
    this.modalService.open(content, { size: 'lg' });
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  Getcategorey(){
    this.SpinnerService.show();
    this.productservice.GetCategorey().subscribe((next:any) => {
      this.categoreylist=[];
      this.categoreylist=next;
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
    
    this.SpinnerService.show();
    this.productservice.GetAllProducts().subscribe((next:any) => {
      this.productlist=[];
    
      this.productlist=next;
      this.Searchableproductlist=next;
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
  
// uploadFile(event) {

//   const file = (event.target as HTMLInputElement).files[0];
//   this.form.patchValue({
//     avatar: file
//   });
//   this.form.get('avatar').updateValueAndValidity();
 
//}
uploadFile(event) {
  
  const file = (event.target as HTMLInputElement).files[0];
  this.productuploadform.get("image").patchValue(file);
  this.productuploadform.get("ProductId").patchValue(this.productid);
}
SubmitImage() {
  this.SpinnerService.show();
  
    this.fileUploadService.uploadproductimage(this.files,"UpdateProductImage",this.productid
    ).subscribe((event: HttpEvent<any>) => {
      this.files=[];
      this.modalService.dismissAll();
     
      this.getproducts();
      this.alertify.success("Images Added Successfully");
    })
    this.SpinnerService.hide();
  
  
}


changestatus(data:any){
  this.productservice.productstatus(data).subscribe((next:any)=>{
    this.getproducts();
    // this.productlist.forEach(x=>{if(x.productId==id){x.status=!x.status}});
  }, error => {
        console.log(error);
      })
    }
    Saveproduct(){
      
      if(this.singleproductform.value.id==null||this.singleproductform.value.id==0)
      {
        this.productservice.Postproduct(this.singleproductform.value).subscribe(next => {
          
            this.modalService.dismissAll();
             this.singleproductform.reset();
             this.getproducts();
             this.alertify.success('Product Created seccussfully');
            
           }, error => {
            this.modalService.dismissAll();
            this.singleproductform.reset();
            this.alertify.success('Product Created seccussfully');
             console.log(error);
           });
      }else{
        if(this.singleproductform)
        this.productservice.UpdateProduct(this.singleproductform.value).subscribe(next => {
       
         this.modalService.dismissAll();
          this.singleproductform.reset();
          this.getproducts();
          this.alertify.success('Product Updated seccussfully');
         
        }, error => {
        
         this.alertify.warning('Somethink want to ');
          console.log(error);
        });
      }
 
      console.log(this.singleproductform.value)
    }


}
