import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TruckService } from './../services/truck.service';
import { ShareService } from './../services/share.service';
import { Truck } from './../truck';

@Component({
  selector: 'app-trucks',
  templateUrl: './trucks.component.html',
  styleUrls: ['./trucks.component.css']
})
export class TrucksComponent implements OnInit {
  public trucks: Truck[];
  public searchText: string;
  private subscriptionDeleteTruck: Subscription;
  
  constructor(
    private truckService: TruckService, 
    private share: ShareService){ 
    this.trucks = [];
  }

  ngOnInit() {
    this.getTrucks();
    this.deleteTruck();
  }
  
  public getTrucks(){
    return this.truckService.getTrucks()
      .subscribe(trucks => this.trucks = trucks);
  }
  
  // send data trucks to agm-map component
  public sendData(value): void {
    this.share.sendData(value);
  }
  
  public deleteTruck(){
    this.subscriptionDeleteTruck = this.share.getDeleteTruck()
      .subscribe(data => { 
        for(let truck of this.trucks){
          if(truck === data){
            const index = this.trucks.indexOf(truck);
            this.trucks.splice(index, 1);
          }
        }
      });
  }

}
