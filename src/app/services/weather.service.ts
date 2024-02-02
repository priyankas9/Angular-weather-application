import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../models/weather.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherData(cityName: string): Observable<WeatherData> {
    const headers = new HttpHeaders()
      .set(environment.XRapidAPIHostHeaderName, environment.XRapidAPIHostHeaderValue)
      .set(environment.XRapidAPIKeyHeaderName, environment.XRapidAPIKeyHeaderValue);

    const params = new HttpParams()
      .set('city', cityName);

    return this.http.get<WeatherData>(environment.weatherApiBaseUrl, { headers, params })
      .pipe(
        map((response) => {
          // Convert temperatures from Kelvin to Celsius
          response.main.temp = response.main.temp - 273.15;
          response.main.temp_min = response.main.temp_min - 273.15;
          response.main.temp_max = response.main.temp_max - 273.15;
          response.main.feels_like = response.main.feels_like - 273.15;

          return response;
        })
      );
  }
}
