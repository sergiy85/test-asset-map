export interface Marker{
  lat: number;
  lng: number;
  label?:string;
  alpha?: number;
  openInfoWindow?: boolean;
}