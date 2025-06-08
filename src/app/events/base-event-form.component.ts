import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  viewChild,
  signal,
  inject,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { EventModelType, TypeForEvent } from '../types/event-model-type.type';
import { ButtonModule } from 'primeng/button';
import { EventPopupComponent } from './event-popup/event-popup.component';
import { ApiService } from '../services/api-service.service';

@Component({
  selector: 'app-base-event-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    EventPopupComponent,
  ],
  templateUrl: './base-event-form.component.html',
  styleUrl: './base-event-form.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseEventFormComponent {
  apiService = inject(ApiService);
  eventsList = this.apiService.eventsListSignal;

  //слушаем компонент
  eventPopupComponent = viewChild(EventPopupComponent);
  eventById = signal<EventModelType | undefined>(undefined);

  editById(event: EventModelType) {
    this.eventById.set(event);
    const currentEvent = this.eventById();
    if (currentEvent) {
      this.eventPopupComponent()?.showDialogForEdit(currentEvent);
    }
  }

  deleteByName(id: number): void {
    this.apiService.deleteEventByName(id);
  }


  get existsItemSportInEventList(): boolean {
    return this.eventsList().some(
      event => event.type === 'спорт' as TypeForEvent
    );
  }
  get existsItemMusicInEventList(): boolean {
    return this.eventsList().some(
      event => event.type === 'музыка' as TypeForEvent
    );
  }


}
