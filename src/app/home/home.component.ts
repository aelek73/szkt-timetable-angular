import { GTFSAPIService, Agencies, Routes, Trips, Stops, Times } from './../gtfs-api.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public agencies: Agencies[] = [];
  public selectedAgency: Agencies;
  public routes: Routes[] = [];
  public selectedRoute: Routes;
  public trips: Trips[] = [];
  public selectedTripId = '';
  public stops: Stops[];
  public selectedStops: Stops;
  public times: Times[] = [];
  public selectedDirectionId = '';
  public selectedStopName = '';
  public selectedRouteId: '';
  public onlineOffline: boolean = navigator.onLine;

  constructor(private GTFS: GTFSAPIService) {}

  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }

  async ngOnInit() {
    this.createOnline$().subscribe(isOnline => console.log(isOnline));
    if (this.onlineOffline) {
      this.agencies = await this.GTFS.getAgencies();
      localStorage.setItem('agencies', JSON.stringify(this.agencies));
    } else {
      this.agencies = JSON.parse(localStorage.getItem('agencies'));
    }
  }

  changeAgencies(event) {
    const agency_id = event.target.value;
    this.getRoutes(agency_id);
  }

  private async getRoutes(agency_id: string) {
    if (this.onlineOffline) {
      this.routes = await this.GTFS.getRoutesByAgencyId(agency_id);
      localStorage.setItem('routes', JSON.stringify(this.routes));
    } else {
      this.routes = JSON.parse(localStorage.getItem('routes'));
    }
  }

  changeRoute(event) {
    const route_id = event.target.value;
    this.selectedRouteId = route_id;
    this.getTrips(route_id);
  }

  private async getTrips(route_id: string) {
    if (this.onlineOffline) {
      this.trips = await this.GTFS.getTripsByRouteId(route_id);
      console.log(this.trips);
      localStorage.setItem('trips', JSON.stringify(this.trips));
    } else {
      this.trips = JSON.parse(localStorage.getItem('trips'));
    }
  }

  changeTrip(event) {
    const trip_id = event.target.value;
    this.selectedDirectionId = this.getDirectionbyTripId(trip_id);
    this.getStops(trip_id);
  }

  getDirectionbyTripId(tripIdIn: string): string {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.trips.length; i++) {
      if (this.trips[i].trip_id === tripIdIn) {
        const tripObj = this.trips[i];
        const result = tripObj.direction_id;
        console.log('result: ', result);
        return result;
      }
    }
  }

  private async getStops(trip_id: string) {
    if (this.onlineOffline) {
      this.stops = await this.GTFS.getStopsByTripId(trip_id);
      localStorage.setItem('stops', JSON.stringify(this.stops));
    } else {
      this.stops = JSON.parse(localStorage.getItem('stops'));
    }
  }

  changeStop(event) {
    const stop = event.target.value;
    console.log('selectedroute:', this.selectedRouteId);
    this.getTimes(this.selectedRouteId, this.selectedDirectionId, stop);
  }

  private async getTimes(route_id: string, direction_id: string, stop_id: string) {
    console.log('routeId: ', route_id, 'directionId: ', direction_id, 'stopName: ', stop_id);
    if (this.onlineOffline) {
      this.times = await this.GTFS.getTimes(route_id, direction_id, stop_id);
      localStorage.setItem('times', JSON.stringify(this.times));
    } else {
      this.times = JSON.parse(localStorage.getItem('times'));
    }
    console.log('Times: ', this.times);
    if (direction_id !== '0' && direction_id !== '1') {
      window.alert('This query successfully failed or maybe show wrong data');
    }
  }
}
