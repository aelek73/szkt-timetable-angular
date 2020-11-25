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
@Injectable({
  providedIn: 'root'
})
export class GTFSAPIService {
  constructor(private http: HttpClient) {}

  public getAgencies(): Promise<Agencies[]> {
    return this.http.get<Agencies[]>(`${GTFS_API_END}/agencies`).toPromise();
  }
}
