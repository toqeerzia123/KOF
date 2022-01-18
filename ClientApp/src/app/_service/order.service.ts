import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})


export class OrderService {
  
  baseUrl = environment.apiurl + 'OrderApi/';
  baseUrl2 = environment.apiurl + 'PosOrder/';
constructor(private http: HttpClient) { }
GetOrders(){
  return this.http.get<any>(this.baseUrl+'GetAllOrders',httpOptions)
};
GetPosOrders(){
  return this.http.get<any>(this.baseUrl2+'GetPosOrders',httpOptions)
};
UpdateOrderStatus(form:any){
  return this.http.post<any>(this.baseUrl+'OrderStatus',form)
};
};
var headers_object = new HttpHeaders({
  'Content-Type': 'application/json',
   'Authorization': "Bearer "+localStorage.getItem('token')
});
const httpOptions = {
  headers: headers_object
};