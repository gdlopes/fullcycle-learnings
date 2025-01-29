import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../event/customer-created.event";

export default class EnviaConsoleLog1Handler implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(_event: CustomerCreatedEvent): void {
    console.log('Esse é o primeiro console.log do evento: CustomerCreated');
  }
}