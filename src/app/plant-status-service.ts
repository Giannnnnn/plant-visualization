// plant-status.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlantStatusService {
    private baseUrl = 'http://localhost:3000'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getHelloWorld(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }
  getAverageWaterLevel(): Observable<any> {
    return this.http.get(`${this.baseUrl}/average-water-level`);
  }

  getAverageSoilMoisture(): Observable<any> {
    return this.http.get(`${this.baseUrl}/average-soil-moisture`);
  }

  getLastWaterPumpActivations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/last-water-pump-activations`);
  }
}