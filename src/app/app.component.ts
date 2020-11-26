import { GTFSAPIService, Agencies, Routes, Trips, Stops } from './gtfs-api.service';
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
  public selectedTrip: Trips;
  public stops: Stops[];
  public selectedStops: Stops;

  constructor(private GTFS: GTFSAPIService) {}

  async ngOnInit() {
    this.agencies = await this.GTFS.getAgencies();
    console.log(this.agencies);
  }

  changeAgencies(event, agency) {
    this.selectedAgency = agency;
    console.log(agency.agencyId);
    this.getRoutes(agency.agencyId);
  }

  private async getRoutes(agencyId: string) {
    this.routes = await this.GTFS.getRoutesByAgencyId(agencyId);
    console.log(this.routes);
  }

  changeRoute(event, route) {
    this.selectedRoute = route;
    console.log(this.selectedRoute);
    this.getTrips(route.routeId);
  }

  private async getTrips(routeId: string) {
    this.trips = await this.GTFS.getTripsByRouteId(routeId);
    console.log(this.trips);
  }

  changeTrip(event, trip) {
    this.selectedTrip = trip;
    console.log(this.selectedTrip);
    this.getStops(trip.tripId);
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

  changeStop(event, stop) {
    this.selectedStops = stop;
    console.log(this.selectedStops);
  }
}
