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
  constructor() { }

  ngOnInit() {
    
  }
}
