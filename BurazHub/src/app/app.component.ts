import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/companion/home', icon: 'home' },
    { title: 'Reminders', url: '/companion/reminders', icon: 'notifications' },
    { title: 'Calendar', url: '/companion/calendar', icon: 'calendar' },
    { title: 'Favorites', url: '/companion/favorites', icon: 'heart' },
    { title: 'Custom API', url: '/companion/custom-api', icon: 'code' },
    { title: 'Settings', url: '/companion/settings', icon: 'settings' },
  ];
  public labels = ['Custom API', 'App theme', 'Notes', 'Language', 'Travel', 'Reminders'];
  constructor() {}
}
