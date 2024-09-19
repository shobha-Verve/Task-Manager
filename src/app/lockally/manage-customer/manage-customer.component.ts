import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ManageCustomerService } from '../../service/manage-customer.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-customer',
  standalone: true,
  imports: [RouterModule, CommonModule,NgxPaginationModule,FormsModule],
  templateUrl: './manage-customer.component.html',
  styleUrl: './manage-customer.component.css'
})
export class ManageCustomerComponent implements OnInit {
  customer: any = [];
  p: number =1;
  count: any;
  tableSize:any = 10;
  currentPage: number = 1;
  searchQuery: any;
  sort_field = 'name';
  sort_type:number = 1;
  isActive:boolean=false;
  constructor(private service: ManageCustomerService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void { 
     this.customerList(1);
  }

  customerList(page:any) {
    console.log(page);
    this.currentPage = page
    
    let res: any = {
      limit: this.tableSize,
      page: page,
      search_query: this.searchQuery,
      sort_field: this.sort_field,
      sort_type: this.sort_type,
      store_id: 315,

    }
    this.service.getCustomerList(res).subscribe((response: any) => {
      
      if(response.status == 1){
        this.count = response.count;  
        this.customer = response.data;
      }else{
        this.count = 0;
        this.customer = [];
      }
    })
    error:(error:any)=>{
      this.toastr.error("Fetching! Error")
    }

  }

clear(){
  this.searchQuery = '';
  this.customerList(1);  
}

addCustomer(){
  this.router.navigate(['/add-customer'])
}
search() {
  // .pipe(debounceTime(1000),distinctUntilChanged())
//  const serachBox = document.getElementsByClassName('search');
  // const keyup$ = fromEvent(document,'keyup');
  //       const result = keyup$.pipe(debounceTime(1000),distinctUntilChanged());
        // .subscribe((x:any) => this.toastr.error("error"))
  this.customerList(1)
}


sort(field:string){
  if (this.sort_field === field) {
    this.sort_type = this.sort_type === 1 ? 2 : 1; 
  } else {
    this.sort_field = field;
    this.sort_type = 1; 
  }
  this.customerList(1);

}

sortIcon(field:string){
  if(this.sort_field = field){
    return this.sort_type == 1 ? 'fa-solid fa-arrow-down-wide-short sortA': 'fa-solid fa-arrow-up-wide-short sortD';
  }
  return ''
}

// colorChnage(){
// this.isActive = !this.isActive;
// }


selectedColor: string = '#ffffff'; 
colorPicker(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  this.selectedColor = inputElement.value; 
}



}
