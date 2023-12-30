import { EventError } from './event-error';

export interface IEvent {
   event: string[];
   callable: string;
   func?: Function;
}

export type EventCollection = Map<string, IEvent[]>;

export function MpEvent(eventName: string | string[]): MethodDecorator {
   eventName = Array.isArray(eventName) ? eventName : [eventName];
   const events = eventName.filter((item, index) => eventName.indexOf(item) === index);

   const newEvent: IEvent = {
      event: events,
      callable: '',
   };

   const mainEvent = events[0];

   return function (target: Object, callableMethod: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
      if (!(descriptor.value instanceof Function))
         throw new EventError(`Event[${mainEvent}] must be callable`, mainEvent);

      const targetEvents: EventCollection = Reflect.getMetadata('rage-mp-events', target) || new Map<string, IEvent>();

      newEvent.callable = callableMethod.toString();

      const eventObjects = targetEvents.get(mainEvent);
      targetEvents.set(mainEvent, (eventObjects && [...eventObjects, newEvent]) || [newEvent]);

      Reflect.defineMetadata('rage-mp-events', targetEvents, target);

      return descriptor;
   };
}

export function MpProc(procedureName: string) {}
