import { Component, OnInit } from '@angular/core';
import { ReportService } from "../../../services/report.service";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  productList = [];
  productsSold;
  usedDiscounts = 0;
  couponList = [];
  totalGained = 0;
  totalLost = 0;

  constructor(private reportService: ReportService) { }

  ngOnInit() {

    const user = localStorage.getItem('currentUser');
    const token = JSON.parse(user).token;

    console.log(token);

    this.reportService.getReports(token).subscribe(
      (reports) => {

        this.processReport(reports);
      }
    )
  }

  public processReport(reports) {

    let productsPerReport;
    let discount;
    let subtotal;

    reports.batch.forEach((report,index) => {

      productsPerReport = 0;
      subtotal = report.subtotal;
      discount = report.discount;

      report.products.forEach((product) => {
        this.totalGained += product.price;
        this.productList.push(product);

        productsPerReport++;   //discount group
      });

      if(discount !== 0){
        this.usedDiscounts ++;

        let coupon = {};
        coupon['subtotal'] = subtotal;
        coupon['discount'] = discount;
        coupon['quantity'] = productsPerReport;
        this.couponList.push(coupon);

        this.totalLost += discount;
      }
    });

    this.productsSold = this.productList.length;
  }
}

