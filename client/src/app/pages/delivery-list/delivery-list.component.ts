import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {

  show = false;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.show = !this.show;
  }

}
