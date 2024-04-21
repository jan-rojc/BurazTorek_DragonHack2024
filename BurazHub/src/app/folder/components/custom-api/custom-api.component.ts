import { Component, OnInit } from '@angular/core';
import { BleService } from 'src/app/services/ble.service';

@Component({
  selector: 'app-custom-api',
  templateUrl: './custom-api.component.html',
  styleUrls: ['./custom-api.component.scss'],
})
export class CustomApiComponent  implements OnInit {

  constructor(private bleService: BleService) { }

  ngOnInit() {}

  async sendData(action: string) {
    this.bleService.sendDataToDevice(action);
  }
}
