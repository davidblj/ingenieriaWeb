import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {

  deliveries;
  show = true;

  constructor(private deliveryService: DeliveryService,
              private modalService: NgbModal) { }

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

  accept(delivery, content) {
    this.toggle(delivery, content);
    // todo: processDelivery
  }

  refuse (delivery, content) {
    this.toggle(delivery, content);
    // todo: processDelivery
  }

  toggle(delivery, content) {
    this.show = !this.show;
    this.deliveries = this.deliveries.filter((deliveryItem) => {
       return (deliveryItem.deliveryId !== delivery.deliveryId);
    })

    this.modalService.open(content);
  }
}
