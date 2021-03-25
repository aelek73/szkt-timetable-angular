import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const GTFS_API_END = 'http://ec2-18-220-143-99.us-east-2.compute.amazonaws.com/api/v1';

export interface Agencies {
  agency_id: string;
  agency_lang: string;
  agency_name: string;
  agency_phone: string;
  agency_timezone: string;
  agency_url: string;
}

export interface Routes {
  agency_id: string;
  route_color: string;
  route_desc: string;
  route_id: string;
  route_long_name: string;
  route_short_name: string;
  route_text_color: string;
  route_type: string;
  route_url: string;
}

export interface Trips {
  direction_id: string;
  route_id: string;
  service_id: string;
  shape_id: string;
  trip_headsign: string;
  trip_id: string;
  wheelchair_accessible: string;
}

export interface Stops {
  stop_id: string;
  stop_lat: string;
  stop_lon: string;
  stop_name: string;
}

export interface Times {
  arrival_time: string;
  departure_time: string;
  drop_off_type: string;
  pickup_type: string;
  shape_dist_traveled: string;
  stop_id: string;
  stop_sequence: string;
  trip_id: string;
}
@Injectable({
  providedIn: 'root'
})
export class GTFSAPIService {
  constructor(private http: HttpClient) {}

  public getAgencies(): Promise<Agencies[]> {
    return this.http.get<Agencies[]>(`${GTFS_API_END}/agencies`).toPromise();
  }

  public getRoutesByAgencyId(agencyId: string): Promise<Routes[]> {
    return this.http.get<Routes[]>(`${GTFS_API_END}/routes?agencyId=${agencyId}`).toPromise();
  }

  public getTripsByRouteId(routeId: string): Promise<Trips[]> {
    return this.http.get<Trips[]>(`${GTFS_API_END}/trips?routeId=${routeId}`).toPromise();
  }

  public getStopsByTripId(tripId: string): Promise<Stops[]> {
    return this.http.get<Stops[]>(`${GTFS_API_END}/stops?tripId=${tripId}`).toPromise();
  }

  public getTimes(routeId: string, directionId: string, stopName: string): Promise<Times[]> {
    return this.http.get<Times[]>(`${GTFS_API_END}/times?routeId=${routeId}&directionId=${directionId}&stopName=${stopName}`).toPromise();
  }
}
