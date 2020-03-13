import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TruckService } from './../services/truck.service';
import { ShareService } from './../services/share.service';
import { Truck } from './../truck';

@Component({
  selector: 'app-delete-asset',
  templateUrl: './delete-asset.component.html',
  styleUrls: ['./delete-asset.component.css']
})
export class DeleteAssetComponent implements OnInit {
  public truck: Truck;
  public trucks: Truck[];
  private subscription: Subscription;

  constructor(
    private truckService: TruckService,
    private share: ShareService
  ){
    this.truck = {
      id: null,
      label: null,
      lat: null,
      lng: null
    }
  }

  ngOnInit() {
    this.getTruckFromTrucksComponent();
  }

  // Delete selected truck 
  onSubmit(truck: Truck){
    return this.truckService.deleteTruck(this.truck)
      .subscribe();
  }

  public getTruckFromTrucksComponent(){
    this.subscription = this.share.getData()
      .subscribe(data => { 
        this.truck = data;
      });
  }

  // send data of remove truck to trucks.component and agm-map.component
  public deleteTruck(truck: Truck){
    this.share.sendDeleteTruck(truck);
  }
}
