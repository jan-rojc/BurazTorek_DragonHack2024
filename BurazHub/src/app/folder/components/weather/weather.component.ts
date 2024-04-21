import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent  implements OnInit {
  weatherLJ: any;
  weatherMB: any;
  weatherCE: any;
  weatherKP: any;
  isWeatherData = false;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    const locations = ['Ljubljana', 'Maribor', 'Celje', 'Koper'];

    this.getWeather(locations[0]);
  }

  getWeather(location: string) {
    this.weatherService.getWeather(location).subscribe((data: any) => {
      switch (location) {
        case 'Ljubljana':
          this.weatherLJ = data;
          break;
        case 'Maribor':
          this.weatherMB = data;
          break;
        case 'Celje':
          this.weatherCE = data;
          break;
        case 'Koper':
          this.weatherKP = data;
          break;
      }
    });
  }
}
