import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  guest = signal('Friend');

  constructor() {
    // this represents an example of a computation that happens async
    setTimeout(() => this.guest.set('Everybody Else'), 1000);
  }
}
