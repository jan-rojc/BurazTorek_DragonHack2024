import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BleService } from 'src/app/services/ble.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-backbone',
  templateUrl: './backbone.component.html',
  styleUrls: ['./backbone.component.scss'],
})
export class BackboneComponent  implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  statusMessage: string = '';

  constructor(
    private bleService: BleService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  async connect() {
    this.statusMessage = 'Scanning for device...';
    const device = await this.bleService.getDevice();
    if (device) {
      this.statusMessage = 'Connecting...';
      const connectionStatus = await this.bleService.connectToDevice();
      if (connectionStatus) {
        this.toastService.showToast('Connected to ' + device.name + '!');
      } else {
        this.statusMessage = 'Failed to connect to device!';
      }
    } else {
      this.statusMessage = 'No device found!';
    }
  }
}
