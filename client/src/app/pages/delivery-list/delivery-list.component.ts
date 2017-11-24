import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {

  deliveries;
  show = true;

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit() {

    this.deliveryService.getDeliveries().subscribe(
      (deliveries) => {
        this.deliveries = deliveries;
        console.log(deliveries);
      }
    );
  }

  getTotalPrice(delivery) {
    return delivery.subtotal - delivery.discount;
  }

  accept(delivery) {
    this.toggle(delivery);
    // todo: processDelivery
  }

  refuse (delivery) {
    this.toggle(delivery);
    // todo: processDelivery
  }

  toggle(delivery) {
    this.show = !this.show;
    this.deliveries = this.deliveries.filter((deliveryItem) => {
       return (deliveryItem.deliveryId !== delivery.deliveryId);
    })
  }
}
