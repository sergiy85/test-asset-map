import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Truck } from './../truck';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  
  private subjectAlpha = new Subject<any>();
  private subjectAddAsset = new Subject<Truck>();
  private subjectDeleteTruck = new Subject<Truck>();

  constructor() {}
  
    // Different data
  public sendData(data: any) {
    this.subjectAlpha.next(data);
  }
  public getData(): Observable<any> {
    return this.subjectAlpha.asObservable();
  }

    // Add Asset data
  public sendNewTruck(data: Truck) {
    this.subjectAddAsset.next(data);
  }
  public getNewTruck(): Observable<Truck> {
    return this.subjectAddAsset.asObservable();
  }

    // Remove Asset data
  public sendDeleteTruck(data: Truck) {
    this.subjectDeleteTruck.next(data);
  }
  public getDeleteTruck(): Observable<Truck> {
    return this.subjectDeleteTruck.asObservable();
  }
}
