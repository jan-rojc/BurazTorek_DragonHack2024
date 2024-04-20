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
  // BLE Setup
  
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
    
  }

  getWeather(location: string) {
    this.weatherService.getWeather(location).subscribe((data: any) => {
      this.weatherData = data;
    });
  }
}
