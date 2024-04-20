import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  baseUrl = 'https://api.weatherapi.com/v1/';
  apiKey = '75b018014067423b85b143906242004';

  constructor(private http: HttpClient) { }

  getWeather(location: string) {
    return this.http.get(this.baseUrl + `current.json?key=${this.apiKey}&q=${location}`);
  }
}
