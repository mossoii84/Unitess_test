import { Injectable, WritableSignal, signal } from '@angular/core';
import { EventModelType } from '../types/event-model-type.type';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly eventlist = signal<EventModelType[]>([
    {
      id: 1,
      name: 'Спортивное событие',
      description: 'Мероприятие, включающее соревнования по футболу.',
      address: 'Городской стадион, ул. Спортивная, 15',
      type: 'other',
    },
    {
      id: 2,
      name: 'Концерт рок-группы',
      description: 'Концерт популярной рок-группы в поддержку нового альбома.',
      address: 'Культурный центр, ул. Мира, 12',
      type: 'other',
    },
    {
      id: 3,
      name: 'Выставка искусств',
      description:
        'Выставка современного искусства, посвящённая живописи и скульптуре.',
      address: 'Музей искусства, проспект Победы, 23',
      type: 'other',
    },
    {
      id: 4,
      name: 'Кулинарный мастер-класс',
      description: 'Мастер-класс по приготовлению итальянской кухни.',
      address: 'Кулинарная студия, ул. Вкусная, 7',
      type: 'other',
    },
  ]);

  getEvents(): EventModelType[] {
    return this.eventlist();
  }

  get eventsList(): EventModelType[] {
    return this.eventlist();
  }

  get eventsListSignal(): WritableSignal<EventModelType[]> {
    return this.eventlist;
  }

  addEvent(event: EventModelType) {
    this.eventlist.update((list) => [...list, event]);
  }

  editEventById(eventId: number, updatedEvent: EventModelType) {
    this.eventlist.update((list) =>
      list.map((event) =>
        event.id === eventId ? { ...event, ...updatedEvent } : event
      )
    );
  }

  deleteEventByName(id: number) {
    this.eventlist.update((list) => list.filter((event) => event.id !== id));
  }
}
