import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageCustomerService {

  constructor(private httpClient: HttpClient) { }
  public api = 'https://apilocal.lokaly.in';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Language-Code':'en'
    })
  }

  getCustomerList(data:any) {
    return this.httpClient.post<Observable<any>>(this.api + '/store/customer_list',data, this.httpOptions);
  }

  getCountryList(){
    return this.httpClient.get(this.api+'/user/countries_list',this.httpOptions)
  }

  getStateList(id:any){
    return this.httpClient.get(this.api+'/user/states_list?'+id,this.httpOptions)
  }

  getCityList(id:any){
    return this.httpClient.get(this.api+'/user/cities_list?'+id,this.httpOptions)
  }

  getAreaList(id:any){
    return this.httpClient.get(this.api+'/user/areas_list?'+id,this.httpOptions)
  }

}
