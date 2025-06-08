import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-sport-event-form',
  imports: [CommonModule, ReactiveFormsModule, TableModule, ButtonModule, FloatLabel, 
    ButtonModule, FormsModule, InputTextModule],
  templateUrl: './sport-event-form.component.html',
  styleUrl: './sport-event-form.component.scss',
  standalone:true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SportEventFormComponent {

  sport = input.required<FormControl>();

}
