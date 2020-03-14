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
      alpha: 1,
      visible: false,
      openInfoWindow: false
    };
    this.markers = [];
  }

  ngOnInit() {
    // Create markers from the list of the trucks
    this.createMarkers();
    // Get new truck from Add-Asset Component and assign it marker
    this.addMarker();
    // set the marker according selected truck 
    this.setMarker();
      // remove marker 
    this.deleteMarker();
  }

  // Check on number method
  public isNumber(value:any):boolean {
    return !Number.isNaN(Number(value))
  };

  // Methods
  public createMarkers(){
    this.truckService.getTrucks()
      .subscribe(trucks => {
        for(let truck of trucks){
          this.marker = {
            lat: truck.lat,
            lng: truck.lng,
            label: truck.label,
            visible: false
          };
          this.markers.push(this.marker);
        }
      });
    return this.markers;
  }

  public setMarker(){
    this.subscriptionAlpha = this.share.getData()
      .subscribe(data => {
        if(!this.isNumber(data.lat) && !this.isNumber(data.lng)){
          data.lat = Number(data.lat);
          data.lng = Number(data.lng);
        } 
        for(let marker of this.markers){
          if(marker.lat === data.lat && marker.lng === data.lng){
            marker.visible = true;
            marker.openInfoWindow = true;
          }
          else{
            marker.visible = false;
          }
        }
      });
    return this.markers;
  }

  public addMarker(){
    this.subscriptionAddAsset = this.share.getNewTruck()
      .subscribe(data => {
        if(!this.isNumber(data.lat) && !this.isNumber(data.lng)){
          data.lat = Number(data.lat);
          data.lng = Number(data.lng);
        }
        this.marker = {
          lat: data.lat,
          lng: data.lng,
          label: data.label,
          visible: true,
          openInfoWindow: true
        };
        this.markers.push(this.marker);
      });
    return this.markers;
  }

  public deleteMarker(){
    this.subscriptionDeleteMarker = this.share.getDeleteTruck()
      .subscribe(data => {
        if(!this.isNumber(data.lat) && !this.isNumber(data.lng)){
          data.lat = Number(data.lat);
          data.lng = Number(data.lng);
        } 
        for(let marker of this.markers){
          if(marker.lat === data.lat && marker.lng === data.lng){
            const index = this.markers.indexOf(marker);
            this.markers.splice(index, 1);
          }
        }
      });
    return this.markers;
  }
}
