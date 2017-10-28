import { Component, OnInit } from '@angular/core';
import {ReportService} from "../../../services/report.service";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  productList = [];
  couponList = [];

  constructor(private reportService: ReportService) { }

  ngOnInit() {

    this.reportService.getReports().subscribe(
      (reports) => {

        this.process(reports);
      }
    )
  }


  public process(reports) {

  }

}
