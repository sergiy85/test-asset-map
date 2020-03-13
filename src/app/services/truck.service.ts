import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Truck } from './../truck';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TruckService {

  private trucksUrl:string = 'api/trucks';
  
  constructor(private http: HttpClient) { }

/* fetch the trucks */

  public getTrucks(): Observable<Truck[]> {
    return this.http.get<Truck[]>(this.trucksUrl)
      .pipe(
        tap(_ => console.log('fetched trucks')),
        catchError(error => {
          return of([]);
        })
      );
  }

  /* search truck method */

  public searchTruck(value: string): Observable<Truck[]> {
    if (!value.trim()) {
      return of([]);
    }
    return this.http.get<Truck[]>(`${this.trucksUrl}/?name=${value}`)
    .pipe(
      tap(_ => console.log(`found truck matching "${value}"`)),
      catchError(error => {
        return of([]);
      })
    );
  }

  /////// Save methods //////////
 
  /** POST: add a new truck to the server */
  public addTruck (truck: Truck){
    return this.http.post<Truck>(this.trucksUrl, truck, httpOptions)
    .pipe(
      tap((newTruck: Truck) => console.log(`added truck w/ id=${newTruck.id}`)),
      catchError(error => {
        return of([]);
      })
    );
  }
 
  /** DELETE: delete the truck from the server */
  public deleteTruck (truck: Truck | number){
    const id = typeof truck === 'number' ? truck : truck.id;
    const url = `${this.trucksUrl}/${id}`;
 
    return this.http.delete<Truck>(url, httpOptions)
    .pipe(
      tap(_ => console.log(`deleted truck id=${id}`)),
      catchError(error => {
        return of([]);
      })
    );
  }
}
