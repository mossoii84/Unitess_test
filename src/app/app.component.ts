import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseEventFormComponent } from "./events/base-event-form.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BaseEventFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
