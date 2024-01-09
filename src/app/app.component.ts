import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

namespace ServerStatus {
  export interface Response {
    status: "UP" | "DOWN"
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  guest = signal('Friend');
  backendStatus = signal("Offline")

  constructor(private http: HttpClient) {
    // this represents an example of a computation that happens async
    this.greetEverybodyElseAtSomePoint();
    // another async operation, that but this time over the network
    this.reflectBackendServerStatus();
  }

  private greetEverybodyElseAtSomePoint() {
    setTimeout(() => this.guest.set('Everybody Else'), 1000);
  }

  private reflectBackendServerStatus() {
    this.http.get<ServerStatus.Response>("/api/status").subscribe({
      next: response => {
        let displayedStatus = response.status === "UP" ? "Online" : "Offline";
        this.backendStatus.set(displayedStatus);
      }
    })
  }
}
