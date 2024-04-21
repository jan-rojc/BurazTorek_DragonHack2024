import { Injectable } from '@angular/core';
import { BleClient, BleDevice, dataViewToText, textToDataView } from '@capacitor-community/bluetooth-le';
import { BehaviorSubject, Observable, Subject, catchError, interval, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BleService {
  deviceName: string = 'BurazCompanion';
  devices: BleDevice[] = [];
  connectedDevice: BleDevice | null = null;
  companionDevice: BleDevice | null = null;
  SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
  CHARACTERISTIC_UUID = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';

  private _connectionStatus$ = new BehaviorSubject<boolean>(false);
  connectionStatus$ = this._connectionStatus$.asObservable();
  private dataSubject = new Subject<any>();
  data$ = this.dataSubject.asObservable();

  constructor() { }

  async getDevice(): Promise<BleDevice | null> {
    try {
      await BleClient.initialize();

      const options = {
        services: [], // Optional: specify services to scan for
      };

      BleClient.requestLEScan(options, (device) => {
        if (device.device.name === this.deviceName) {
          // alert('Device found! ' + device.device.name);
          this.companionDevice = device.device;
          BleClient.stopLEScan();
        }
      });

      return new Promise((resolve) => {
        setTimeout(() => {
          BleClient.stopLEScan();
          resolve(this.companionDevice);
        }, 5000);
      });
    } catch (error) {
      alert(error);
      return null;
    }
  }

  async connectToDevice(): Promise<boolean> {
    if (!this.companionDevice) {
      this.noDeviceFound();
      return false;
    }
    try {
      await BleClient.connect(this.companionDevice.deviceId);
      return true;
    } catch (error) {
      return false;
    }
  }

  async sendDataToDevice(action: string) {
    if (!this.companionDevice) {
      this.noDeviceFound();
      return;
    }
    await BleClient.write(this.companionDevice.deviceId, this.SERVICE_UUID, this.CHARACTERISTIC_UUID, textToDataView(action));
    await BleClient.startNotifications(
      this.companionDevice.deviceId,
      this.SERVICE_UUID,
      this.CHARACTERISTIC_UUID,
      (value) => {
        alert('Received value: ' + value.getUint8(0));
      }
    );
  }

  checkForData(): void {
    interval(1000)
      .subscribe(async () => {
        const data = await this.getDataFromDevice();
        if (data) {
          // alert('Data received: ' + data);
          this.dataSubject.next(data);
        }
      });
  }

  async getDataFromDevice() {
    if (!this.companionDevice) {
      this.noDeviceFound();
      return;
    }
  
    try {
      const data = await BleClient.read(this.companionDevice.deviceId, this.SERVICE_UUID, this.CHARACTERISTIC_UUID);
      const textData = dataViewToText(data);
      // alert('Received value: ' + textData);
      // if (textData === 'button_pressed') {
      //   this.sendDataToDevice('off');
      // }
      return textData; // Assuming successful conversion, return data for emission
    } catch (error) {
      console.error('Error reading or converting data:', error);
      return null; // Or handle error differently (e.g., emit an error object)
    }
  }

  async disconnectFromDevice() {
    if (!this.companionDevice) {
      this.noDeviceFound();
      return;
    }
    BleClient.disconnect(this.companionDevice.deviceId);
  }

  private noDeviceFound(): void {
  }

  // getStatusMessage(): string {
  //   return this.statusMessage;
  // }
}
