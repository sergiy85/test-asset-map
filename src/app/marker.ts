export interface Marker{
  lat: number;
  lng: number;
  visible?: boolean;
  label?:string;
  alpha?: number;
  openInfoWindow?: boolean;
}