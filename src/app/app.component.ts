import { GTFSAPIService, Agencies, Routes, Trips, Stops, Times } from './gtfs-api.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
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

  constructor(private GTFS: GTFSAPIService) {}

  async ngOnInit() {
    this.agencies = await this.GTFS.getAgencies();
    // console.log(this.agencies);
  }

  changeAgencies(event) {
    const agencyId = event.target.value;
    this.getRoutes(agencyId);
  }

  private async getRoutes(agencyId: string) {
    this.routes = await this.GTFS.getRoutesByAgencyId(agencyId);
    // console.log(this.routes);
  }

  changeRoute(event) {
    const routeId = event.target.value;
    this.selectedRouteId = routeId;
    this.getTrips(routeId);
  }

  private async getTrips(routeId: string) {
    this.trips = await this.GTFS.getTripsByRouteId(routeId);
    // console.log(this.trips);
  }

  changeTrip(event) {
    const tripId = event.target.value;
    this.selectedDirectionId = this.getDirectionbyTripId(tripId);
    this.getStops(tripId);
    //console.log(this.selectedTripId);
  }

  getDirectionbyTripId(tripIdIn: string): string {
    for (let i = 0; i < this.trips.length; i++) {
      if (this.trips[i]['tripId'] == tripIdIn) {
        let tripObj = this.trips[i];
        let result = Object.values(tripObj)[5];
        return result;
      }
    }
  }

  removeDuplicates(input) {
    let tempObject = {};
    for ( let i = 0, len = input.length; i < len; i++ ) {
      tempObject[input[i]['name']] = input[i];
    }
    input = new Array();
    for (let key in tempObject) {
      input.push(tempObject[key]);
    }
    return input;
  }

  private async getStops(tripId: string) {
    this.stops = await this.GTFS.getStopsByTripId(tripId);
    // console.log('dirction: ', this.stops);
  }

  changeStop(event) {
    const stop = event.target.value;
    console.log('selectedroute:', this.selectedRouteId);
    this.getTimes(this.selectedRouteId, this.selectedDirectionId, stop);
  }

  private async getTimes(routeId: string, directionId: string, stopName: string) {
    console.log('routeId: ', routeId, 'directionId: ', directionId, 'stopName: ', stopName);
    this.times = await this.GTFS.getTimes(routeId, directionId, stopName);
    console.log('Times: ', this.times);
  }
}
