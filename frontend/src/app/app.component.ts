import { GTFSAPIService, Agencies, Routes, Trips } from './gtfs-api.service';
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
  }
}
