import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const GTFS_API_END = '/api/v1';

export interface Agencies {
  agencyId: string;
  agencyName: string;
  agencyUrl: string;
  agencyTimezone: string;
  agencyPhone: string;
  agencyLang: string;
}

export interface Routes {
  routeId: string;
  agencyId: string;
  routeShortName: string;
  routeLongName: string;
  routeDesc: string;
  routeType: string;
  routeUrl: string;
  routeColor: string;
  routeTextColor: string;
}

export interface Trips {
  routeId: string;
  serviceId: string;
  tripId: string;
  tripHeadsign: string;
  directionId: string;
  shapeId: string;
  wheelchairAccessible: string;
  name: string;
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
}
