import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Truck } from './../truck'

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() { }

  public createDb(){
    const trucks:Truck[] = [
      {
        id: '0o1',
        label : 'Truck 1001',
        lat : 43.7000,
        lng : -79.4000
      },
      {
        id: '0o2',
        label : 'Truck 1002',
        lat : 40.6700,
        lng : -73.9400
      },
      {
        id: '0o3',
        label : 'Truck 1003',
        lat : 41.8819,
        lng : -87.6278
      },
      {
        id: '0o4',
        label : 'Truck 1004',
        lat : 34.0500,
        lng : -118.2500
      },
      {
        id: '0o5',
        label : 'Truck 1005',
        lat : 36.0800,
        lng : -115.3322
      },
      {
        id: '0o6',
        label : 'Truck 1006',
        lat : 36.1220,
        lng : -114.4422
      },
      {
        id: '0o7',
        label : 'Truck 1007',
        lat : 36.0800,
        lng : -113.1322
      }
    ];
    return {trucks};
  }

  // Overrides the genId method to ensure that a truck always has an id.
  // If the trucks array is empty,
  // the method below returns the initial number (01).
  // if the trucks array is not empty, the method below returns the highest
  // truck id + 1.

  public genId(trucks: Truck[]):string {
    return trucks.length > 0 ? Math.max(...trucks.map(truck => +truck.id)) + '1' : '0o8';
  }
}
