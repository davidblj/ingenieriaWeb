import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { logging } from 'selenium-webdriver';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {

  deliveries;
  show = false;
  state;

  constructor(private deliveryService: DeliveryService,
              private modalService: NgbModal) { }

  ngOnInit() {

    this.deliveryService.getDeliveries().subscribe(
      (deliveries) => {
        this.deliveries = deliveries;
        if(deliveries.length === 0) {
          this.show = true;
        }
        console.log(deliveries);
      }
    );
  }

  getTotalPrice(delivery) {
    return delivery.total;
  }

  getShippingPrice(delivery) {
    return delivery.total - (delivery.subtotal - delivery.discount)
  }

  send(delivery, content, state) {

    this.state = state;
    this.deliveryService.processDelivery(state, delivery.deliveryId).subscribe(
      () => {
        console.log('success');
        this.toggle(delivery, content);
      },
      () => {
        // todo: display the message error
      }
    );
  }

  toggle(delivery, content) {
    this.deliveries = this.deliveries.filter((deliveryItem) => {
       return (deliveryItem.deliveryId !== delivery.deliveryId);
    });

    if(this.deliveries.length === 0) {
      this.show = true;
    }
    this.modalService.open(content);
  }
}
