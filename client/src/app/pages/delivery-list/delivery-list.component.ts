import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {

  data;
  error = true;

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    console.log(this.storageService.getScope());
    this.data = this.storageService.getScope();
  }
}
