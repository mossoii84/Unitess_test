import { Component, inject, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { EventModelType} from '../../types/event-model-type.type';
import { ModelFormControls } from '../../types/model-form-controls.type';
import { CommonModule } from '@angular/common';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../services/api-service.service';
import { Select } from 'primeng/select';
import { EnumEventType } from '../../enums/enumEventType.enum';
import { SportEventFormComponent } from '../sport-event-form-component/sport-event-form.component';
import { MusicEventFormComponent } from '../music-event-form-component/music-event-form.component';

@Component({
  selector: 'app-event-popup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FloatLabel,
    Dialog,
    ButtonModule,
    FormsModule,
    InputTextModule,
    Select,
    SportEventFormComponent,
    MusicEventFormComponent,
  ],
  templateUrl: './event-popup.component.html',
  styleUrl: './event-popup.component.scss',
})
export class EventPopupComponent {
  apiService = inject(ApiService);
  eventsList = this.apiService.eventsListSignal;
  visible = signal(false);
  openEditEvent = signal(false);
  enumEventTypes = Object.values(EnumEventType); // array enum

  public formForEvent: FormGroup<ModelFormControls<Partial<EventModelType>>> =
    new FormGroup<ModelFormControls<Partial<EventModelType>>>({
      id: new FormControl<number | null>(0),
      name: new FormControl<string | null>('', Validators.required),
      description: new FormControl<string | null>('', Validators.required),
      address: new FormControl<string | null>('', Validators.required),
      type: new FormControl<string | null>('другое', Validators.required),
      sport: new FormControl<number | null>(0,  Validators.pattern(/^\d+$/)),
      music: new FormControl<string | null>(''),
    });

  name: string | undefined;
  description: string | undefined;
  address: string | undefined;
  type: string | undefined;
  selectedEvent: EventModelType | undefined;
  currentValue = signal('');

  get sport(): FormControl<number | null> {
    return this.formForEvent.get('sport') as FormControl<number | null>;
  }
  get music(): FormControl<string | null> {
    return this.formForEvent.get('music') as FormControl<string | null>;
  }


  showDialog() {
    this.openEditEvent.set(false);
    this.currentValue.set('другое');
    this.formForEvent.reset();
    this.visible.update((v) => !v);
  }

  showDialogForEdit(event: EventModelType) {
    this.currentValue.set(event.type);
    this.visible.set(true);
    this.openEditEvent.set(true);
    if (event) {
      this.formForEvent.patchValue({
        id: event.id,
        name: event.name,
        description: event.description,
        address: event.address,
        type: event.type,
        sport: event.type === 'спорт' ?  event.sport : null,
        music: event.type === 'музыка' ?  event.music : null,
      });
      this.selectedEvent = { ...event };
    }
  }

  saveEdit() {
    const id = this.formForEvent.value.id;
    if (id && this.formForEvent.value) {

      const type = this.formForEvent.value.type;
      if (type === 'другое') {
        this.formForEvent.patchValue({ sport: null, music: null });
      } else if (type === 'спорт') {
        this.formForEvent.patchValue({ music: null });
      } else if (type === 'музыка') {
        this.formForEvent.patchValue({ sport: null });
      }

      this.apiService.editEventById(id, this.formForEvent.value as EventModelType );
    }
    this.formForEvent.reset();
    this.visible.set(false);
  }

  onSubmit(): void {
    if (this.openEditEvent()) {
      this.saveEdit();
    } else if (this.formForEvent.valid) {
      this.formForEvent.patchValue({ id: this.eventsList().length + 1 });
      this.apiService.addEvent(this.formForEvent.value as EventModelType);
      console.log('Форма отправлена', this.formForEvent.value);
      this.visible.set(false);
    } else {
      console.log('Форма невалидна');
    }
  }

  onTypeChange(event: any) {
    this.currentValue.set(event.value);
  }
}
