import { GTFSAPIService, Agencies } from './gtfs-api.service';
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

  constructor(private GTFS: GTFSAPIService) {}

  async ngOnInit() {
    this.agencies = await this.GTFS.getAgencies();
    console.log(this.agencies);
  }

  changeAgencies(event, agency) {
    this.selectedAgency = agency;
    console.log(agency.agencyId);
  }
}
