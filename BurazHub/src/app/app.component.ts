import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/companion/home', icon: 'podium' },
    { title: 'Smart home', url: '/companion/smart-home', icon: 'home' },
    { title: 'Reminders', url: '/companion/reminders', icon: 'notifications' },
    { title: 'Calendar', url: '/companion/calendar', icon: 'calendar' },
    { title: 'Weather', url: '/companion/weather', icon: 'sunny' },
    { title: 'Favorites', url: '/companion/favorites', icon: 'heart' },
    { title: 'Custom API', url: '/companion/custom-api', icon: 'code' },
    { title: 'Settings', url: '/companion/settings', icon: 'settings' },
  ];
  public labels = ['Custom API', 'App theme', 'Notes', 'Language', 'Travel', 'Reminders'];
  constructor() {}
}
