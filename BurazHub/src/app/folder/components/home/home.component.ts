import { Component, OnInit } from '@angular/core';
import { BleService } from 'src/app/services/ble.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  statusMessage: string = '';

  constructor(
    private bleService: BleService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    // this.statusMessage = this.bleService.statusMessage;
  }
}
