import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiUrl:string = 'http://localhost:8088/api/v1';

  // Initialize with default URL or environment-based config if available
  setApiUrl(url: string): void {
    this.apiUrl = url;
  }

  getApiUrl(): string {
    return this.apiUrl;
  }
}