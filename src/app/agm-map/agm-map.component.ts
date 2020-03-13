import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TruckService } from './../services/truck.service';
import { ShareService } from './../services/share.service';
import { Marker } from './../marker';

@Component({
  selector: 'app-agm-map',
  templateUrl: './agm-map.component.html',
  styleUrls: ['./agm-map.component.css']
})
export class AgmMapComponent implements OnInit{
  public title: string;
  public lat: number;
  public lng: number;
  public marker: Marker;
  public markers: Array<Marker>;
  private subscriptionAlpha: Subscription;
  private subscriptionAddAsset: Subscription;
  private subscriptionDeleteMarker: Subscription;
  
  constructor(
    private truckService: TruckService, 
    private share: ShareService
  ){
    this.title = 'Asset Map'
    this.lat = 40.0000;
    this.lng = -98.0000;
    this.marker = {
      lat: null,
      lng: null,
      label: null,
      alpha: null,
      openInfoWindow: false
    };
    this.markers = [];
  }

  ngOnInit() {
    // Create markers from the list of the trucks
    this.createMarkers();
    // set the marker according selected truck 
    this.setMarker();
    // Get new truck from Add-Asset Component
    this.addNewAsset();
      // remove marker 
    this.deleteMarker();
  }

  public createMarkers(){
    this.truckService.getTrucks()
      .subscribe(trucks => {
        for(let truck of trucks){
          this.marker = {
            lat: truck.lat,
            lng: truck.lng,
            label: truck.label,
            alpha: 0
          };
          this.markers.push(this.marker);
        }
      });
    return this.markers;
  }

  public setMarker(){
    this.subscriptionAlpha = this.share.getData()
      .subscribe(data => { 
        for(let marker of this.markers){
          if(marker.lat === data.lat && marker.lng === data.lng){
            marker.alpha = 1;
            marker.openInfoWindow = true;
          }
        }
      });
    return this.markers;  
  }

  public addNewAsset(){
    this.subscriptionAddAsset = this.share.getNewTruck()
      .subscribe(truck => { 
        this.marker = {
          lat: +truck.lat,
          lng: +truck.lng,
          label: truck.label,
          alpha: 1,
          openInfoWindow:true
        };
        this.markers.push(this.marker);
      });
    return this.markers;
  }

  public deleteMarker(){
    this.subscriptionDeleteMarker = this.share.getDeleteTruck()
      .subscribe(data => {
        for(let marker of this.markers){
          if(marker.lat === data.lat && marker.lng === data.lng ||
             marker.lat === +data.lat && marker.lng === +data.lng){
            const index = this.markers.indexOf(marker);
            this.markers.splice(index, 1);
          }
        }
      });
    return this.markers;
  }
}
