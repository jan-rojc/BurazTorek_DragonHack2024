import { Component, OnInit } from '@angular/core';
import { BleService } from 'src/app/services/ble.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-smart-home',
  templateUrl: './smart-home.component.html',
  styleUrls: ['./smart-home.component.scss'],
})
export class SmartHomeComponent  implements OnInit {
  isLightOn = false;

  constructor(private bleService: BleService, private toastService: ToastService) { }

  ngOnInit() {
    this.bleService.checkForData();
    this.bleService.data$.subscribe(data => {
      if (data === 'button_pressed') {
        this.bleService.sendDataToDevice('off');
        this.isLightOn = !this.isLightOn;
        this.toastService.showToast('Turning the lights off!');
      } else {
        // console.log('Error or no data received.');
      }
    });
  }

}
