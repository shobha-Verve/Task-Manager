import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ManageCustomerService } from '../../service/manage-customer.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule,FormsModule,NgSelectModule,ImageCropperComponent],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent implements OnInit{
form : FormGroup | any;
countryData:any;
countryListData:any[] =[];
stateListData:any[]=[];
cityListData:any[]=[];
areaListData:any[]=[];
  // modelService: any;
constructor(private service:ManageCustomerService){}

ngOnInit(): void {
  this.loadForm()
  this.countryList()
}
  loadForm(){
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      mobile: new FormControl(null, [Validators.required]),
      email: new FormControl('', [Validators.required]),
      shopNo: new FormControl('', [Validators.required]),
      streetName: new FormControl(null, [Validators.required]),
      country: new FormControl(''),
      state: new FormControl(''),
      city:new FormControl(''),
      area:new FormControl(''),
      zipcode:new FormControl(''),
      khata: new FormControl(true),
    });
  }

  countryList(){
    this.service.getCountryList().subscribe((res:any)=>{
      this.countryListData = res.data;
      this.form.controls['country'].setValue(this.countryListData[0])
      this.stateList();
    })
  }

  changeCountry(){
    this.stateList()
  }

  stateList(){
    this.service.getStateList(this.form.value.country.id).subscribe((res:any)=>{
      this.stateListData = res.data;
      this.form.controls['state'].setValue(this.stateListData[0])
      this.cityList();
    })
  }
  changeState(){
    this.cityList()
  }
  cityList(){
    this.service.getCityList(this.form.value.state.id).subscribe((res:any)=>{
      this.cityListData = res.data;
      this.form.controls['city'].setValue(this.cityListData[0]);
      this.areaList();
    })
  }
  changeCity(){
    this.areaList();
  }

  areaList(){
    this.service.getAreaList(this.form.value.area.id).subscribe((res:any)=>{
      this.areaListData = res.data;
      this.form.controls['area'].setValue(this.areaListData[0])
    })
  }
  changeArea(){
    this.areaList();
  }



  //image cropper
  desiredWidth = 300;
  desiredRatioDen = 16;
  desiredRatioDiv = 9;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageChangedEvent = e.target.result; // Load the image as Base64
        console.log('Image as Base64:', this.imageChangedEvent);
      };
      reader.readAsDataURL(file); // Convert image file to base64 string
    } else {
      console.log('No file selected');
    }
  }
  
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64; // Already in base64 from the cropper
    console.log('Cropped Image as Base64:', this.croppedImage);
  }
  
  imageLoaded(event:any) {
    console.log('loaded', event);
    // show cropper
  }
  cropperReady(event:any) {
    console.log('cropper ready', event);
    // cropper ready
  }
  loadImageFailed(event:any) {
    console.log('load failed', event);
    // show message
  }
  get desiredRatio(): number {
    return this.desiredRatioDen / this.desiredRatioDiv;
  }

}
