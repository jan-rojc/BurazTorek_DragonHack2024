import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BleClient, BleDevice, textToDataView, numbersToDataView } from '@capacitor-community/bluetooth-le';
import { WeatherService } from '../services/weather.service';

import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar'

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  // BLE Setup
  devices: BleDevice[] = [];
  connectedDevice: BleDevice | null = null;
  companionDevice: BleDevice | null = null;
  SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
  CHARACTERISTIC_UUID = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';
  loading = false;
  statusMessage = 'Tap the button to start scanning for devices.';
  weatherData: any;

  calendarOptions: CalendarOptions = {
    plugins: [
      dayGridPlugin,
      googleCalendarPlugin
    ],
    initialView: 'dayGridMonth',
    weekends: false,
    // events: [
    //   { title: 'Meeting', start: new Date() },
    // ]
    events: {
      googleCalendarId: 'en.slovenian#holiday@group.v.calendar.google.com'
    },
    googleCalendarApiKey: 'AIzaSyAr3_1ML6lRcOtvvFh5KXaAS8WzN39LPM4'
  };

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  async scanForDevices() {
    try {
      this.loading = true;
      this.statusMessage = 'Scanning...';
      await BleClient.initialize();

      const options = {
        services: [], // Optional: specify services to scan for
      };

      BleClient.requestLEScan(options, (device) => {
        // console.log('Found device:', device);
        // this.devices.push(device.device);
        if (device.device.name === 'BurazCompanion') {
          this.loading = false;
          this.statusMessage = 'Found companion device!';
          this.companionDevice = device.device;
          BleClient.stopLEScan();
        }
      });

      // setTimeout(() => {
      //   BleClient.stopLEScan();
      //   console.log('Scan stopped');
      // }, 5000);
    } catch (error) {
      alert(error);
    }
  }

  async connectToDevice() {
    this.loading = true;
    // connect(deviceId: string, onDisconnect?: ((deviceId: string) => void) | undefined, options?: TimeoutOptions | undefined) => Promise<void>
    if (!this.companionDevice) {
      this.noDeviceFound();
      this.loading = false;
      return;
    }
    BleClient.connect((this.companionDevice.deviceId));
    this.statusMessage = 'Connected to device!';
    this.loading = false;
  }

  async sendDataToDevice(actionNumber: number) {
    if (!this.companionDevice) {
      this.noDeviceFound();
      return;
    }
    await BleClient.write(this.companionDevice.deviceId, this.SERVICE_UUID, this.CHARACTERISTIC_UUID, textToDataView("blink"));
    await BleClient.startNotifications(
      this.companionDevice.deviceId,
      this.SERVICE_UUID,
      this.CHARACTERISTIC_UUID,
      (value) => {
        alert('Received value: ' + value.getUint8(0));
      }
    );
  }

  async disconnectFromDevice() {
    if (!this.companionDevice) {
      this.noDeviceFound();
      return;
    }
    BleClient.disconnect(this.companionDevice.deviceId);
    this.statusMessage = 'Disconnected from device!';
  }

  private noDeviceFound(): void {
    this.statusMessage = 'No companion device found! Please scan for devices first.';
  }

  getWeather(location: string) {
    this.weatherService.getWeather(location).subscribe((data: any) => {
      this.weatherData = data;
    });
  }
}
