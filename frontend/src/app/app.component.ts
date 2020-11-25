import { GTFSAPIService, Agencies, Routes } from './gtfs-api.service';
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
  }
}
