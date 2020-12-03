import { GTFSAPIService, Agencies, Routes, Trips, Stops, Times } from './gtfs-api.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
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
    const agencyId = event.target.value;
    this.getRoutes(agencyId);
  }

  private async getRoutes(agencyId: string) {
    if (this.onlineOffline) {
      this.routes = await this.GTFS.getRoutesByAgencyId(agencyId);
      localStorage.setItem('routes', JSON.stringify(this.routes));
    } else {
      this.routes = JSON.parse(localStorage.getItem('routes'));
    }
  }

  changeRoute(event) {
    const routeId = event.target.value;
    this.selectedRouteId = routeId;
    this.getTrips(routeId);
  }

  private async getTrips(routeId: string) {
    if (this.onlineOffline) {
      this.trips = await this.GTFS.getTripsByRouteId(routeId);
      localStorage.setItem('trips', JSON.stringify(this.trips));
    } else {
      this.trips = JSON.parse(localStorage.getItem('trips'));
    }
  }

  changeTrip(event) {
    const tripId = event.target.value;
    this.selectedDirectionId = this.getDirectionbyTripId(tripId);
    this.getStops(tripId);
  }

  getDirectionbyTripId(tripIdIn: string): string {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.trips.length; i++) {
      if (this.trips[i].tripId === tripIdIn) {
        const tripObj = this.trips[i];
        const result = tripObj.directionId;
        console.log('result: ', result);
        return result;
      }
    }
  }

  removeDuplicates(input) {
    const tempObject = {};
    for ( let i = 0, len = input.length; i < len; i++ ) {
      tempObject[input[i].name] = input[i];
    }
    input = new Array();
    // tslint:disable-next-line: forin
    for (const key in tempObject) {
      input.push(tempObject[key]);
    }
    return input;
  }

  private async getStops(tripId: string) {
    if (this.onlineOffline) {
      this.stops = await this.GTFS.getStopsByTripId(tripId);
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

  private async getTimes(routeId: string, directionId: string, stopName: string) {
    console.log('routeId: ', routeId, 'directionId: ', directionId, 'stopName: ', stopName);
    if (this.onlineOffline) {
      this.times = await this.GTFS.getTimes(routeId, directionId, stopName);
      localStorage.setItem('times', JSON.stringify(this.times));
    } else {
      this.times = JSON.parse(localStorage.getItem('times'));
    }
    console.log('Times: ', this.times);
    if (directionId !== '0' && directionId !== '1') {
      window.alert('This query successfully failed or maybe show wrong data');
    }
  }
}
