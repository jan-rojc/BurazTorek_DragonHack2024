import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
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

  constructor() { }

  ngOnInit() { }

}
