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

  constructor(private GTFS: GTFSAPIService) {}

  async ngOnInit() {
    this.agencies = await this.GTFS.getAgencies();
    console.log(this.agencies);
  }

  changeAgencies(event) {
    const agencyId = event.target.value;
    this.getRoutes(agencyId);
  }

  private async getRoutes(agencyId: string) {
    this.routes = await this.GTFS.getRoutesByAgencyId(agencyId);
    console.log(this.routes);
  }

  changeRoute(event) {
    const routeId = event.target.value;
    this.getTrips(routeId);
  }

  private async getTrips(routeId: string) {
    this.trips = await this.GTFS.getTripsByRouteId(routeId);
    console.log(this.trips);
  }

  changeTrip(event) {
    const tripId = event.target.value;
    this.selectedTripId = tripId;
    this.getStops(tripId);
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
    console.log(this.stops);
  }

  changeStop(event) {
    const stopName = event.target.value;
    this.getTimes(this.selectedTripId, stopName);
    console.log(this.selectedTripId);
  }

  private async getTimes(tripId: string, stopName: string) {
    this.times = await this.GTFS.getTimesByTripIdAndStopName(tripId, stopName);
    console.log('Times: ', this.times);
  }
}
