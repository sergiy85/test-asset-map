import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';

import { TruckService } from './../services/truck.service';
import { ShareService } from './../services/share.service';
import { Truck } from './../truck';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css']
})
export class AddAssetComponent implements OnInit {
  public addAssetForm: FormGroup;
  public trucks: any;
  private subscription: Subscription;

  constructor(
    private truckService: TruckService,
    private share: ShareService
  ){
    this.trucks = [];
    this.addAssetForm = new FormGroup({
      'label': new FormControl(null),
      'lat': new FormControl(null),
      'lng': new FormControl(null)
    });
  }

  ngOnInit() {
    this.formInit();
    this.getTrucksFromTrucksComponent();
  }

  public formInit(){
    this.addAssetForm = new FormGroup({
      'label': new FormControl(''),
      'lat': new FormControl('', [
        Validators.pattern(/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/) 
      ]),
      'lng': new FormControl('', [
        Validators.pattern(/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/) 
      ])
    });
  }

  public getTrucksFromTrucksComponent(){
    this.subscription = this.share.getData()
      .subscribe(data => { 
        this.trucks = data;
      });
  }

  public sendNewTruck(value){
    this.share.sendNewTruck(value);
  }

  onSubmit(form: FormGroup, isValid: boolean){
    if(isValid === true){
      return this.truckService.addTruck(this.addAssetForm.value as Truck)
        .subscribe(truck =>{
          this.trucks.push(truck);
          this.addAssetForm.get('label').setValue('');
          this.addAssetForm.get('lat').setValue('');
          this.addAssetForm.get('lng').setValue('');
        })
    }
  }

}
